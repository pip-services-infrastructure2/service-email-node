import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { EmailController } from '../logic/EmailController';
import { EmailCommandableHttpServiceV1 } from '../services/version1/EmailCommandableHttpServiceV1';
import { EmailCommandableGrpcServiceV1 } from '../services/version1/EmailCommandableGrpcServiceV1';
import { EmailGrpcServiceV1 } from '../services/version1/EmailGrpcServiceV1';

export class EmailServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-email", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("service-email", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("service-email", "service", "commandable-http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("service-email", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("service-email", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EmailServiceFactory.ControllerDescriptor, EmailController);
		this.registerAsType(EmailServiceFactory.HttpServiceDescriptor, EmailCommandableHttpServiceV1);
		this.registerAsType(EmailServiceFactory.CommandableGrpcServiceDescriptor, EmailCommandableGrpcServiceV1);
		this.registerAsType(EmailServiceFactory.GrpcServiceDescriptor, EmailGrpcServiceV1);
	}
	
}
