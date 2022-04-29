"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const EmailServiceFactory_1 = require("../build/EmailServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class EmailProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("email", "Email delivery microservice");
        this._factories.add(new EmailServiceFactory_1.EmailServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.EmailProcess = EmailProcess;
//# sourceMappingURL=EmailProcess.js.map