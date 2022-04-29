// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var email_v1_pb = require('./email_v1_pb.js');

function serialize_email_v1_EmailEmptyReply(arg) {
  if (!(arg instanceof email_v1_pb.EmailEmptyReply)) {
    throw new Error('Expected argument of type email_v1.EmailEmptyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_email_v1_EmailEmptyReply(buffer_arg) {
  return email_v1_pb.EmailEmptyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_email_v1_EmailMessageRequest(arg) {
  if (!(arg instanceof email_v1_pb.EmailMessageRequest)) {
    throw new Error('Expected argument of type email_v1.EmailMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_email_v1_EmailMessageRequest(buffer_arg) {
  return email_v1_pb.EmailMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_email_v1_EmailMessageWithRecipientRequest(arg) {
  if (!(arg instanceof email_v1_pb.EmailMessageWithRecipientRequest)) {
    throw new Error('Expected argument of type email_v1.EmailMessageWithRecipientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_email_v1_EmailMessageWithRecipientRequest(buffer_arg) {
  return email_v1_pb.EmailMessageWithRecipientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_email_v1_EmailMessageWithRecipientsRequest(arg) {
  if (!(arg instanceof email_v1_pb.EmailMessageWithRecipientsRequest)) {
    throw new Error('Expected argument of type email_v1.EmailMessageWithRecipientsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_email_v1_EmailMessageWithRecipientsRequest(buffer_arg) {
  return email_v1_pb.EmailMessageWithRecipientsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The email service definition.
var EmailService = exports.EmailService = {
  send_message: {
    path: '/email_v1.Email/send_message',
    requestStream: false,
    responseStream: false,
    requestType: email_v1_pb.EmailMessageRequest,
    responseType: email_v1_pb.EmailEmptyReply,
    requestSerialize: serialize_email_v1_EmailMessageRequest,
    requestDeserialize: deserialize_email_v1_EmailMessageRequest,
    responseSerialize: serialize_email_v1_EmailEmptyReply,
    responseDeserialize: deserialize_email_v1_EmailEmptyReply,
  },
  send_message_to_recipient: {
    path: '/email_v1.Email/send_message_to_recipient',
    requestStream: false,
    responseStream: false,
    requestType: email_v1_pb.EmailMessageWithRecipientRequest,
    responseType: email_v1_pb.EmailEmptyReply,
    requestSerialize: serialize_email_v1_EmailMessageWithRecipientRequest,
    requestDeserialize: deserialize_email_v1_EmailMessageWithRecipientRequest,
    responseSerialize: serialize_email_v1_EmailEmptyReply,
    responseDeserialize: deserialize_email_v1_EmailEmptyReply,
  },
  send_message_to_recipients: {
    path: '/email_v1.Email/send_message_to_recipients',
    requestStream: false,
    responseStream: false,
    requestType: email_v1_pb.EmailMessageWithRecipientsRequest,
    responseType: email_v1_pb.EmailEmptyReply,
    requestSerialize: serialize_email_v1_EmailMessageWithRecipientsRequest,
    requestDeserialize: deserialize_email_v1_EmailMessageWithRecipientsRequest,
    responseSerialize: serialize_email_v1_EmailEmptyReply,
    responseDeserialize: deserialize_email_v1_EmailEmptyReply,
  },
};

exports.EmailClient = grpc.makeGenericClientConstructor(EmailService);
