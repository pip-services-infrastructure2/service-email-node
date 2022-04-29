const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { EmailController } from '../../../src/logic/EmailController';
import { EmailGrpcServiceV1 } from '../../../src/services/version1/EmailGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('EmailGrpcServiceV1', () => {
    let service: EmailGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let controller = new EmailController();
        controller.configure(ConfigParams.fromTuples(
            'options.disabled', true
        ));

        service = new EmailGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-email', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-email', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../src/protos/email_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).email_v1.Email;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Send message', async () => {
        await new Promise<any>((resolve, reject) => {
            client.send_message(
                {
                    message: {
                        to: 'pipdevs@gmail.com',
                        subject: 'Test message',
                        text: 'This is a test message'
                    }
                },
                (err, response) => {
                    if (err != null || response.error != null) reject(err ?? response.error);
                    else resolve(response);
                }
            );
        });
    });

});
