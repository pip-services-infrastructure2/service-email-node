# Seneca Protocol (version 1) <br/> Email Delivery Microservice

Email delivery microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        host: 'localhost', // Microservice localhost
        port: 8805, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'email',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```
* [EmailMessageV1 class](#class1)
* [EmailRecipientV1 class](#class2)
* [cmd: 'send_message'](#operation1)
* [cmd: 'send_message_to_recipient'](#operation2)
* [cmd: 'send_message_to_recipients'](#operation3)

## Data types

### <a name="class1"></a> EmailMessageV1 class

Message object with sender and recipient addresses, subject and content

**Properties:**
    - to: string or [string] - one or several addresses of message recipient
    - from: string - (optional) sender address
    - cc: string or [string] - (optional) one or several addresses of CC: recipients
    - bcc: string or [string] - (optional) one or several addresses of BCC: recipients
    - reply_to: string - (optional) response email address
    - subject: string - (optional) message subject
    - text: string - (optional) message plain text body 
    - html: string - (optional) message html body

### <a name="class2"></a> EmailRecipientV1 class

Recipient properties. If some properties are not set, the service
tries to restore them from email settings.

**Properties:**
- id: string - unique user id
- name: string - (optional) user full name
- email: string - (optional) primary user email
- language: string - (optional) user preferred language

## Operations

### <a name="operation1"></a> Cmd: 'send_message'

Sends email message to specified address or addresses

**Arguments:** 
- message: EmailMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

**Returns:**
- err: Error - occured error or null for success

### <a name="operation2"></a> Cmd: 'send\_message\_to_recipient'

Sends email message to specified recipient

**Arguments:** 
- recipient: EmailRecipientV1 - recipient properties, including id
- message: EmailMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

**Returns:**
- err: Error - occured error or null for success

### <a name="operation3"></a> Cmd: 'send\_messages\_to_recipients'

Sends email message to multiple recipients

**Arguments:** 
- recipients: EmailRecipientV1[] - array of recipient properties, including id
- message: EmailMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

**Returns:**
- err: Error - occured error or null for success

