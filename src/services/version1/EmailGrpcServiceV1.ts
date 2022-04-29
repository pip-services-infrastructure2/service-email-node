const services = require('../../../../src/protos/email_v1_grpc_pb');
const messages = require('../../../../src/protos/email_v1_pb');

import { IReferences, ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { IEmailController } from '../../logic/IEmailController';
import { EmailGrpcConverterV1 } from './EmailGrpcConverterV1';

export class EmailGrpcServiceV1 extends GrpcService {
    private _controller: IEmailController;
	
    public constructor() {
        super(services.EmailService);
        this._dependencyResolver.put('controller', new Descriptor("service-email", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IEmailController>('controller');
    }
    
    private async sendMessage(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());

        let response = new messages.EmailEmptyReply();

        try {
            await this._controller.sendMessage(correlationId, message, parameters);
        } catch (err) {
            let error = EmailGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }

    private async sendMessageToRecipient(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipient = EmailGrpcConverterV1.toRecipient(call.request.getRecipient());

        let response = new messages.EmailEmptyReply();
        try {
            await this._controller.sendMessageToRecipient(correlationId, recipient, message, parameters);
        } catch (err) {
            let error = EmailGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async sendMessageToRecipients(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let message = EmailGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        EmailGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipients = EmailGrpcConverterV1.toRecipients(call.request.getRecipientList());

        let response = new messages.EmailEmptyReply();
        try {
            await this._controller.sendMessageToRecipients(correlationId, recipients, message, parameters);
        } catch (err) {
            let error = EmailGrpcConverterV1.fromError(err);
            response.setError(error);
        }
        
        return response;
    }
        
    public register() {
        this.registerMethod(
            'send_message', 
            null,
            this.sendMessage
        );

        this.registerMethod(
            'send_message_to_recipient', 
            null,
            this.sendMessageToRecipient
        );

        this.registerMethod(
            'send_message_to_recipients', 
            null,
            this.sendMessageToRecipients
        );
    }
}
