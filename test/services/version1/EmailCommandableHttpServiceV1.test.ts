const restify = require('restify');

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { EmailController } from '../../../src/logic/EmailController';
import { EmailCommandableHttpServiceV1 } from '../../../src/services/version1/EmailCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailCommandableHttpServiceV1', ()=> {
    let service: EmailCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let controller = new EmailController();
        controller.configure(ConfigParams.fromTuples(
            'options.disabled', true
        ));

        service = new EmailCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-email', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-email', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

    test('Send message', async () => {
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/email/send_message',
                {
                    message: {
                        to: 'pipdevs@gmail.com',
                        subject: 'Test message',
                        text: 'This is a test message'
                    }
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });
    });
    
});