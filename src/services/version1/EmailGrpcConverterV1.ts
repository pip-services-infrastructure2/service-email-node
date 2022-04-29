const messages = require('../../../../src/protos/email_v1_pb');

import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { EmailMessageV1 } from '../../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../../data/version1/EmailRecipientV1';

export class EmailGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        EmailGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: EmailGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject == 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        EmailGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromMessage(message: EmailMessageV1): any {
        if (message == null) return null;

        let obj = new messages.EmailMessage();

        obj.setFrom(message.from);
        obj.setCc(message.cc);
        obj.setBcc(message.bcc);
        obj.setTo(message.to);
        obj.setReplyTo(message.reply_to);
        obj.setSubject(message.subject);
        obj.setText(message.text);
        obj.setHtml(message.html);
    
        return obj;
    }

    public static toMessage(obj: any): EmailMessageV1 {
        if (obj == null) return null;

        let message: EmailMessageV1 = {
            from: obj.getFrom(),
            cc: obj.getCc(),
            bcc: obj.getBcc(),
            to: obj.getTo(),
            reply_to: obj.getReplyTo(),
            subject: obj.getSubject(),
            text: obj.getText(),
            html: obj.getHtml()
        };

        return message;
    }

    public static fromRecipient(recipient: EmailRecipientV1): any {
        if (recipient == null) return null;

        let obj = new messages.EmailRecipient();

        obj.setId(recipient.id);
        obj.setName(recipient.name);
        obj.setEmail(recipient.email);
        obj.setLanguage(recipient.language);
    
        return obj;
    }

    public static toRecipient(obj: any): EmailRecipientV1 {
        if (obj == null) return null;

        let recipient: EmailRecipientV1 = {
            id: obj.getId(),
            name: obj.getName(),
            email: obj.getEmail(),
            language: obj.getLanguage()
        };

        return recipient;
    }    
    public static fromRecipients(recipients: EmailRecipientV1[]): any {
        if (recipients == null) return null;

        let data = recipients.map(EmailGrpcConverterV1.fromRecipient);

        return data;
    }

    public static toRecipients(obj: any): EmailRecipientV1[] {
        if (obj == null) return null;

        let data = obj.map(EmailGrpcConverterV1.toRecipient);

        return data;
    }

}