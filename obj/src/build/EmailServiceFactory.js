"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const EmailController_1 = require("../logic/EmailController");
const EmailCommandableHttpServiceV1_1 = require("../services/version1/EmailCommandableHttpServiceV1");
const EmailCommandableGrpcServiceV1_1 = require("../services/version1/EmailCommandableGrpcServiceV1");
const EmailGrpcServiceV1_1 = require("../services/version1/EmailGrpcServiceV1");
class EmailServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(EmailServiceFactory.ControllerDescriptor, EmailController_1.EmailController);
        this.registerAsType(EmailServiceFactory.HttpServiceDescriptor, EmailCommandableHttpServiceV1_1.EmailCommandableHttpServiceV1);
        this.registerAsType(EmailServiceFactory.CommandableGrpcServiceDescriptor, EmailCommandableGrpcServiceV1_1.EmailCommandableGrpcServiceV1);
        this.registerAsType(EmailServiceFactory.GrpcServiceDescriptor, EmailGrpcServiceV1_1.EmailGrpcServiceV1);
    }
}
exports.EmailServiceFactory = EmailServiceFactory;
EmailServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-email", "factory", "default", "default", "1.0");
EmailServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-email", "controller", "default", "*", "1.0");
EmailServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-email", "service", "commandable-http", "*", "1.0");
EmailServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-email", "service", "commandable-grpc", "*", "1.0");
EmailServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-email", "service", "grpc", "*", "1.0");
//# sourceMappingURL=EmailServiceFactory.js.map