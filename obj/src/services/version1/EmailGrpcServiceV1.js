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
exports.EmailGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/email_v1_grpc_pb');
const messages = require('../../../../src/protos/email_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const EmailGrpcConverterV1_1 = require("./EmailGrpcConverterV1");
class EmailGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.EmailService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_2.Descriptor("service-email", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    sendMessage(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let message = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toMessage(call.request.getMessage());
            let parameters = new pip_services3_commons_nodex_1.ConfigParams();
            EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
            let response = new messages.EmailEmptyReply();
            try {
                yield this._controller.sendMessage(correlationId, message, parameters);
            }
            catch (err) {
                let error = EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    sendMessageToRecipient(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let message = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toMessage(call.request.getMessage());
            let parameters = new pip_services3_commons_nodex_1.ConfigParams();
            EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
            let recipient = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toRecipient(call.request.getRecipient());
            let response = new messages.EmailEmptyReply();
            try {
                yield this._controller.sendMessageToRecipient(correlationId, recipient, message, parameters);
            }
            catch (err) {
                let error = EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    sendMessageToRecipients(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let message = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toMessage(call.request.getMessage());
            let parameters = new pip_services3_commons_nodex_1.ConfigParams();
            EmailGrpcConverterV1_1.EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
            let recipients = EmailGrpcConverterV1_1.EmailGrpcConverterV1.toRecipients(call.request.getRecipientList());
            let response = new messages.EmailEmptyReply();
            try {
                yield this._controller.sendMessageToRecipients(correlationId, recipients, message, parameters);
            }
            catch (err) {
                let error = EmailGrpcConverterV1_1.EmailGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('send_message', null, this.sendMessage);
        this.registerMethod('send_message_to_recipient', null, this.sendMessageToRecipient);
        this.registerMethod('send_message_to_recipients', null, this.sendMessageToRecipients);
    }
}
exports.EmailGrpcServiceV1 = EmailGrpcServiceV1;
//# sourceMappingURL=EmailGrpcServiceV1.js.map