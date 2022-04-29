import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { EmailServiceFactory } from '../build/EmailServiceFactory';

export class EmailLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("email", "Email delivery function");
        this._dependencyResolver.put('controller', new Descriptor('service-email', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailServiceFactory());
    }
}

export const handler = new EmailLambdaFunction().getHandler();