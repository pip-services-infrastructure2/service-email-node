import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class EmailCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new Descriptor('service-email', 'controller', 'default', '*', '1.0'));
    }
}