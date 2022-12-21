"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class EmailCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-email', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailCommandableHttpServiceV1 = EmailCommandableHttpServiceV1;
//# sourceMappingURL=EmailCommandableHttpServiceV1.js.map