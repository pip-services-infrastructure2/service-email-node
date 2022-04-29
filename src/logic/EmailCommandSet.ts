import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';

import { Parameters } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

import { EmailMessageV1Schema } from '../data/version1/EmailMessageV1Schema';
import { EmailRecipientV1Schema } from '../data/version1/EmailRecipientV1Schema';
import { EmailMessageV1 } from '../data/version1/EmailMessageV1';
import { IEmailController } from './IEmailController';

export class EmailCommandSet extends CommandSet {
    private _logic: IEmailController;

    constructor(logic: IEmailController) {
        super();

        this._logic = logic;

		this.addCommand(this.makeSendMessageCommand());
		this.addCommand(this.makeSendMessageToRecipientCommand());
		this.addCommand(this.makeSendMessageToRecipientsCommand());
    }

	private makeSendMessageCommand(): ICommand {
		return new Command(
			"send_message",
			new ObjectSchema(true)
				.withRequiredProperty('message', new EmailMessageV1Schema())
				.withOptionalProperty('parameters', TypeCode.Map),
            async (correlationId: string, args: Parameters) => {
                let message = args.get("message");
                let parameters = args.get("parameters");
                await this._logic.sendMessage(correlationId, message, parameters);
            }
		);
	}

	private makeSendMessageToRecipientCommand(): ICommand {
		return new Command(
			"send_message_to_recipient",
			new ObjectSchema(true)
				.withRequiredProperty('message', new EmailMessageV1Schema())
				.withRequiredProperty('recipient', new EmailRecipientV1Schema())
				.withOptionalProperty('parameters', TypeCode.Map),
			async (correlationId: string, args: Parameters) => {
                let message = args.get("message");
                let recipient = args.get("recipient");
                let parameters = args.get("parameters");
                await this._logic.sendMessageToRecipient(correlationId, recipient, message, parameters);
            }
		);
	}

	private makeSendMessageToRecipientsCommand(): ICommand {
		return new Command(
			"send_message_to_recipients",
			new ObjectSchema(true)
				.withRequiredProperty('message', new EmailMessageV1Schema())
				.withRequiredProperty('recipients', new ArraySchema(new EmailRecipientV1Schema()))
				.withOptionalProperty('parameters', TypeCode.Map),
			async (correlationId: string, args: Parameters) => {
                let message = args.get("message");
                let recipients = args.get("recipients");
                let parameters = args.get("parameters");
                await this._logic.sendMessageToRecipients(correlationId, recipients, message, parameters);
            }
		);
	}

}