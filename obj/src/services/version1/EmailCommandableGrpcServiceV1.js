"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class EmailCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-email', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailCommandableGrpcServiceV1 = EmailCommandableGrpcServiceV1;
//# sourceMappingURL=EmailCommandableGrpcServiceV1.js.map