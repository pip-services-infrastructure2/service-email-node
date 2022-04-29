import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class EmailMessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('cc', TypeCode.String);
        this.withOptionalProperty('bcc', TypeCode.String);
        this.withOptionalProperty('to', TypeCode.String);
        this.withOptionalProperty('reply_to', TypeCode.String);
        this.withOptionalProperty('subject', null);
        this.withOptionalProperty('text', null);
        this.withOptionalProperty('html', null);
    }
}
