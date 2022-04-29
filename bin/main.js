let EmailProcess = require('../obj/src/container/EmailProcess').EmailProcess;

try {
    new EmailProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
