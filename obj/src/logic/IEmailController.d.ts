import { ConfigParams } from 'pip-services3-commons-nodex';
import { EmailMessageV1 } from '../data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../data/version1/EmailRecipientV1';
export interface IEmailController {
    sendMessage(correlationId: string, message: EmailMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipient(correlationId: string, recipient: EmailRecipientV1, message: EmailMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipients(correlationId: string, recipients: EmailRecipientV1[], message: EmailMessageV1, parameters: ConfigParams): Promise<void>;
}
