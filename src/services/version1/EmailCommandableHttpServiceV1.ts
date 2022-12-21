import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class EmailCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new Descriptor('service-email', 'controller', 'default', '*', '1.0'));
    }
}