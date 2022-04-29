import { ConfigParams } from 'pip-services3-commons-nodex';
import { EmailLambdaFunction } from '../../src/container/EmailLambdaFunction';

suite('EmailLambdaFunction', async ()=> {
    let lambda: EmailLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'controller.descriptor', 'service-email:controller:default:default:1.0',
            'controller.options.disabled', true
        );

        lambda = new EmailLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('Send message', async () => {
        await lambda.act(
            {
                role: 'email',
                cmd: 'send_message',
                message: {
                    to: 'pipdevs@gmail.com',
                    subject: 'Test message',
                    text: 'This is a test message'
                }
            }
        );
    });

});