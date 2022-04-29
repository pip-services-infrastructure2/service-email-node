import { EmailMessageV1 } from '../../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../../data/version1/EmailRecipientV1';
export declare class EmailGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromMessage(message: EmailMessageV1): any;
    static toMessage(obj: any): EmailMessageV1;
    static fromRecipient(recipient: EmailRecipientV1): any;
    static toRecipient(obj: any): EmailRecipientV1;
    static fromRecipients(recipients: EmailRecipientV1[]): any;
    static toRecipients(obj: any): EmailRecipientV1[];
}
