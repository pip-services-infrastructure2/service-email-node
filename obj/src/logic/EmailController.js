"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_components_nodex_2 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const EmailCommandSet_1 = require("./EmailCommandSet");
const pip_services3_expressions_nodex_1 = require("pip-services3-expressions-nodex");
class EmailController {
    constructor() {
        this._parameters = new pip_services3_commons_nodex_1.ConfigParams();
        this._connectionResolver = new pip_services3_components_nodex_1.ConnectionResolver();
        this._credentialResolver = new pip_services3_components_nodex_2.CredentialResolver();
        this._disabled = false;
    }
    configure(config) {
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
    setReferences(references) {
        this._connectionResolver.setReferences(references);
        this._credentialResolver.setReferences(references);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new EmailCommandSet_1.EmailCommandSet(this);
        return this._commandSet;
    }
    isOpen() {
        return this._transport != null;
    }
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._transport) {
                return null;
            }
            this._connection = yield this._connectionResolver.resolve(correlationId);
            this._credential = yield this._credentialResolver.lookup(correlationId);
            if (this._connection != null) {
                let nodemailer = require('nodemailer');
                let params = {
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
                    };
                }
                this._transport = nodemailer.createTransport(params);
            }
        });
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            this._transport = null;
        });
    }
    getLanguageTemplate(value, language = 'en') {
        if (value == null)
            return value;
        if (typeof value != 'object')
            return value;
        // Set default language
        language = language || "en";
        // Get template for specified language
        let template = value[language];
        // Get template for default language
        if (template == null)
            template = value["en"];
        return "" + template;
    }
    renderTemplate(value, parameters, language = 'en') {
        let template = this.getLanguageTemplate(value, language);
        let mustache = new pip_services3_expressions_nodex_1.MustacheTemplate(template);
        return template ? mustache.evaluateWithVariables(parameters) : null;
    }
    sendMessage(correlationId, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Silentry skip if disabled
            if (this._disabled) {
                return null;
            }
            // Skip processing if email is disabled or message has no destination
            if (this._transport == null || message.to == null) {
                throw new pip_services3_commons_nodex_2.BadRequestException(correlationId, 'EMAIL_DISABLED', 'emails disabled, or email recipient not set');
            }
            parameters = this._parameters.override(parameters);
            let subject = this.renderTemplate(message.subject, parameters);
            let text = this.renderTemplate(message.text, parameters);
            let html = this.renderTemplate(message.html, parameters);
            let envelop = {
                from: message.from || this._messageFrom,
                cc: message.cc || this._messageCc,
                bcc: message.bcc || this._messageBcc,
                replyTo: message.reply_to || this._messageReplyTo,
                to: message.to,
                subject: subject,
                text: text,
                html: html
            };
            yield new Promise((resolve, reject) => {
                this._transport.sendMail(envelop, (err, info) => {
                    if (err != null)
                        reject(err);
                    else
                        resolve(info);
                });
            });
        });
    }
    makeRecipientParameters(recipient, parameters) {
        parameters = this._parameters.override(parameters);
        parameters.append(recipient);
        return parameters;
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Silentry skip if disabled
            if (this._disabled) {
                return null;
            }
            // Skip processing if email is disabled
            if (this._transport == null || recipient == null || recipient.email == null) {
                throw new pip_services3_commons_nodex_2.BadRequestException(correlationId, 'EMAIL_DISABLED', 'emails disabled, or recipients email not set');
            }
            let recParams = this.makeRecipientParameters(recipient, parameters);
            let recLanguage = recipient.language;
            let subject = this.renderTemplate(message.subject, recParams, recLanguage);
            let text = this.renderTemplate(message.text, recParams, recLanguage);
            let html = this.renderTemplate(message.html, recParams, recLanguage);
            let envelop = {
                from: message.from || this._messageFrom,
                cc: message.cc || this._messageCc,
                bcc: message.bcc || this._messageBcc,
                replyTo: message.reply_to || this._messageReplyTo,
                to: recipient.email,
                subject: subject,
                text: text,
                html: html
            };
            yield new Promise((resolve, reject) => {
                this._transport.sendMail(envelop, (err, info) => {
                    if (err != null)
                        reject(err);
                    else
                        resolve(info);
                });
            });
        });
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Silentry skip if disabled
            if (this._disabled) {
                return null;
            }
            // Skip processing if email is disabled
            if (this._transport == null || recipients == null || recipients.length == 0) {
                throw new pip_services3_commons_nodex_2.BadRequestException(correlationId, 'EMAIL_DISABLED', 'emails disabled, or no recipients sent');
            }
            // Send email separately to each user
            let tasks = [];
            for (let recipient of recipients) {
                tasks.push(this.sendMessageToRecipient(correlationId, recipient, message, parameters));
            }
            yield Promise.all(tasks);
        });
    }
}
exports.EmailController = EmailController;
EmailController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('message.from', null, 'message.cc', null, 'message.bcc', null, 'message.reply_to', null);
//# sourceMappingURL=EmailController.js.map