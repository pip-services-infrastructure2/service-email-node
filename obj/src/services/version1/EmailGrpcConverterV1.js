"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailGrpcConverterV1 = void 0;
const messages = require('../../../../src/protos/email_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class EmailGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_1.ErrorDescriptionFactory.create(err);
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
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: EmailGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_2.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        EmailGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromMessage(message) {
        if (message == null)
            return null;
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
    static toMessage(obj) {
        if (obj == null)
            return null;
        let message = {
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
    static fromRecipient(recipient) {
        if (recipient == null)
            return null;
        let obj = new messages.EmailRecipient();
        obj.setId(recipient.id);
        obj.setName(recipient.name);
        obj.setEmail(recipient.email);
        obj.setLanguage(recipient.language);
        return obj;
    }
    static toRecipient(obj) {
        if (obj == null)
            return null;
        let recipient = {
            id: obj.getId(),
            name: obj.getName(),
            email: obj.getEmail(),
            language: obj.getLanguage()
        };
        return recipient;
    }
    static fromRecipients(recipients) {
        if (recipients == null)
            return null;
        let data = recipients.map(EmailGrpcConverterV1.fromRecipient);
        return data;
    }
    static toRecipients(obj) {
        if (obj == null)
            return null;
        let data = obj.map(EmailGrpcConverterV1.toRecipient);
        return data;
    }
}
exports.EmailGrpcConverterV1 = EmailGrpcConverterV1;
//# sourceMappingURL=EmailGrpcConverterV1.js.map