"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.EmailLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const EmailServiceFactory_1 = require("../build/EmailServiceFactory");
class EmailLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("email", "Email delivery function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-email', 'controller', 'default', '*', '*'));
        this._factories.add(new EmailServiceFactory_1.EmailServiceFactory());
    }
}
exports.EmailLambdaFunction = EmailLambdaFunction;
exports.handler = new EmailLambdaFunction().getHandler();
//# sourceMappingURL=EmailLambdaFunction.js.map