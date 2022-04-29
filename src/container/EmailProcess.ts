import { ProcessContainer } from 'pip-services3-container-nodex';

import { EmailServiceFactory } from '../build/EmailServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class EmailProcess extends ProcessContainer {

    public constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultGrpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
