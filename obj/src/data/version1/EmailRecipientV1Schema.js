"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailRecipientV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class EmailRecipientV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('email', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.EmailRecipientV1Schema = EmailRecipientV1Schema;
//# sourceMappingURL=EmailRecipientV1Schema.js.map