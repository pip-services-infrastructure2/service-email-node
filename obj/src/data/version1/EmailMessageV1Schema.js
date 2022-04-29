"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessageV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class EmailMessageV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('from', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('cc', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('bcc', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('to', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('reply_to', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('subject', null);
        this.withOptionalProperty('text', null);
        this.withOptionalProperty('html', null);
    }
}
exports.EmailMessageV1Schema = EmailMessageV1Schema;
//# sourceMappingURL=EmailMessageV1Schema.js.map