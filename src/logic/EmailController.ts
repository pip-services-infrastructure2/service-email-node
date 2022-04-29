import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { ConnectionParams } from 'pip-services3-components-nodex';
import { ConnectionResolver } from 'pip-services3-components-nodex';
import { CredentialParams } from 'pip-services3-components-nodex';
import { CredentialResolver } from 'pip-services3-components-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { BadRequestException } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';

import { EmailMessageV1 } from '../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../data/version1/EmailRecipientV1';
import { IEmailController } from './IEmailController';
import { EmailCommandSet } from './EmailCommandSet';
import { MustacheTemplate } from 'pip-services3-expressions-nodex';

export class EmailController implements IConfigurable, IReferenceable, ICommandable, IOpenable, IEmailController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'message.from', null,
        'message.cc', null,
        'message.bcc', null,
        'message.reply_to', null
    );

    private _config: ConfigParams;

    private _messageFrom: string;
    private _messageCc: string;
    private _messageBcc: string;
    private _messageReplyTo: string;
    private _parameters: ConfigParams = new ConfigParams();

    private _connection: ConnectionParams;
    private _connectionResolver: ConnectionResolver = new ConnectionResolver();
    private _credential: CredentialParams;
    private _credentialResolver: CredentialResolver = new CredentialResolver();
    private _transport: any;
    private _commandSet: EmailCommandSet;
    private _disabled: boolean = false;

    public configure(config: ConfigParams): void {
        this._config = config.setDefaults(EmailController._defaultConfig);

        this._messageFrom = config.getAsStringWithDefault("message.from", this._messageFrom);
        this._messageCc = config.getAsStringWithDefault("message.cc", this._messageCc);
        this._messageBcc = config.getAsStringWithDefault("message.bcc", this._messageBcc);
        this._messageReplyTo = config.getAsStringWithDefault("message.reply_to", this._messageReplyTo);
        this._parameters = config.getSection("parameters");
        this._disabled = config.getAsBooleanWithDefault("options.disabled", this._disabled);

        this._connectionResolver.configure(config);
        this._credentialResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._connectionResolver.setReferences(references);
        this._credentialResolver.setReferences(references);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new EmailCommandSet(this);
        return this._commandSet;
    }

    public isOpen(): boolean {
        return this._transport != null;
    }

    public async open(correlationId: string): Promise<void> {
        if (this._transport) {
            return null;
        }

        this._connection = await this._connectionResolver.resolve(correlationId);
        this._credential = await this._credentialResolver.lookup(correlationId);

        if (this._connection != null) {
            let nodemailer = require('nodemailer');

            let params: any = {
                host: this._connection.getHost(),
                secure: this._connection.getAsBoolean('ssl')
                    || this._connection.getAsBoolean('secure')
                    || this._connection.getAsBoolean('secure_connection'),
                port: this._connection.getPort(),
            };

            if (this._credential != null) {
                params.auth = {
                    type: this._credential.getAsString("type"),
                    user: this._credential.getUsername(),
                    pass: this._credential.getPassword()
                }
            }

            this._transport = nodemailer.createTransport(params);
        }
    }

    public async close(correlationId: string): Promise<void> {
        this._transport = null;
    }

    private getLanguageTemplate(value: any, language: string = 'en') {
        if (value == null) return value;
        if (typeof value != 'object') return value;

        // Set default language
        language = language || "en";

        // Get template for specified language
        let template = value[language];

        // Get template for default language
        if (template == null)
            template = value["en"];

        return "" + template;
    }

    private renderTemplate(value: any, parameters: ConfigParams, language: string = 'en'): string {
        let template = this.getLanguageTemplate(value, language);
        let mustache = new MustacheTemplate(template);
        return template ? mustache.evaluateWithVariables(parameters) : null;
    }

    public async sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams): Promise<void> {

        // Silentry skip if disabled
        if (this._disabled) {
            return null;
        }

        // Skip processing if email is disabled or message has no destination
        if (this._transport == null || message.to == null) {
            throw new BadRequestException(
                correlationId,
                'EMAIL_DISABLED',
                'emails disabled, or email recipient not set'
            );
        }

        parameters = this._parameters.override(parameters);

        let subject = this.renderTemplate(message.subject, parameters);
        let text = this.renderTemplate(message.text, parameters);
        let html = this.renderTemplate(message.html, parameters);

        let envelop: any = {
            from: message.from || this._messageFrom,
            cc: message.cc || this._messageCc,
            bcc: message.bcc || this._messageBcc,
            replyTo: message.reply_to || this._messageReplyTo,

            to: message.to,

            subject: subject,
            text: text,
            html: html
        };

        await new Promise((resolve, reject) => {
            this._transport.sendMail(envelop, (err, info) => {
                if (err != null) reject(err)
                else resolve(info);
            });
        });
    }

    private makeRecipientParameters(recipient: EmailRecipientV1, parameters: any): ConfigParams {
        parameters = this._parameters.override(parameters);
        parameters.append(recipient);
        return parameters;
    }

    public async sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1,
        message: EmailMessageV1, parameters: ConfigParams): Promise<void> {

        // Silentry skip if disabled
        if (this._disabled) {
            return null;
        }

        // Skip processing if email is disabled
        if (this._transport == null || recipient == null || recipient.email == null) {
            throw new BadRequestException(
                correlationId,
                'EMAIL_DISABLED',
                'emails disabled, or recipients email not set'
            );
        }

        let recParams = this.makeRecipientParameters(recipient, parameters);
        let recLanguage = recipient.language;

        let subject = this.renderTemplate(message.subject, recParams, recLanguage);
        let text = this.renderTemplate(message.text, recParams, recLanguage);
        let html = this.renderTemplate(message.html, recParams, recLanguage);

        let envelop: any = {
            from: message.from || this._messageFrom,
            cc: message.cc || this._messageCc,
            bcc: message.bcc || this._messageBcc,
            replyTo: message.reply_to || this._messageReplyTo,

            to: recipient.email,

            subject: subject,
            text: text,
            html: html
        };

        await new Promise((resolve, reject) => {
            this._transport.sendMail(envelop, (err, info) => {
                if (err != null) reject(err)
                else resolve(info);
            });
        });
    }

    public async sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[],
        message: EmailMessageV1, parameters: ConfigParams): Promise<void> {

        // Silentry skip if disabled
        if (this._disabled) {
            return null;
        }

        // Skip processing if email is disabled
        if (this._transport == null || recipients == null || recipients.length == 0) {
            throw new BadRequestException(
                correlationId,
                'EMAIL_DISABLED',
                'emails disabled, or no recipients sent'
            );
        }

        // Send email separately to each user
        let tasks = [];
        
        for (let recipient of recipients) {
            tasks.push(
                this.sendMessageToRecipient(correlationId, recipient, message, parameters)
            );
        }
        
        await Promise.all(tasks);
    }
}
