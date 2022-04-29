"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class EmailHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/email');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-email', 'controller', 'default', '*', '1.0'));
    }
}
exports.EmailHttpServiceV1 = EmailHttpServiceV1;
//# sourceMappingURL=EmailHttpServiceV1.js.map