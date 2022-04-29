import { ConfigParams } from 'pip-services3-commons-nodex';

import { EmailMessageV1 } from '../../src/data/version1/EmailMessageV1';
import { EmailRecipientV1 } from '../../src/data/version1/EmailRecipientV1';
import { EmailController } from '../../src/logic/EmailController';

suite('EmailController', ()=> {
    let controller: EmailController;

    let emailHost = process.env['EMAIL_HOST'] || "smtp@gmail.com";
    let emailPort = process.env['EMAIL_PORT'] || 465;
    let emailSsl = process.env['EMAIL_SSL'] || true;
    let emailUser = process.env['EMAIL_USER'];
    let emailPassword = process.env['EMAIL_PASS'];

    let messageFrom = process.env['MESSAGE_FROM'] || "somebody@somewhere.com";
    let messageTo = process.env['MESSAGE_TO'];

    // if (emailUser == null) return;

    suiteSetup(async () => {
        controller = new EmailController();

        let config = ConfigParams.fromTuples(
            "message.from", messageFrom,

            "connection.host", emailHost,
            "connection.port", emailPort,
            "connection.ssl", emailSsl,

            "credential.username", emailUser,
            "credential.password", emailPassword,

            "options.disabled", emailUser == null || messageTo == null
        );
        controller.configure(config);

        await controller.open(null);
    });

    suiteTeardown(async () => {
        await controller.close(null);
    });

    test('Send Message to Address', async () => {
        let message =  <EmailMessageV1> {
            to: messageTo,
            subject: '{{subject}}',
            text: '{{text}}',
            html: '<p>{{text}}</p>'
        };

        let parameters = ConfigParams.fromTuples(
            'subject', 'Test Email To Address',
            'text', 'This is just a test'
        );

        await controller.sendMessage(
            null, message, parameters,
        );
    });

    test('Send Message to Recipient', async () => {
        let message =  <EmailMessageV1> {
            subject: 'Test Email To Recipient',
            text: 'This is just a test'
        };

        let recipient = <EmailRecipientV1> {
            id: '1',
            email: messageTo,
            name: 'Test Recipient'
        };

        await controller.sendMessageToRecipient(
            null, recipient, message, null
        );
    });
    
});