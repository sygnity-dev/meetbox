const PubNub = require('pubnub');
import {trace, generateUUID} from "./common"

const MSG_JOIN = 'JOIN';
const MSG_HANDSHAKE = 'HANDSHAKE';
const MSG_READY = 'READY';
const MSG_OFFER = 'OFFER';
const MSG_ANSWER = 'ANSWER';
const MSG_CANDIDATE = 'CANDIDATE';

export function Pipe() {
}

Pipe.prototype.initialize = function (configuration) {
  const me = this;
  me.trace('configuration:', configuration);
  this.pubNub = new PubNub({
    publishKey: configuration.pubNub.publishKey,
    subscribeKey: configuration.pubNub.subscribeKey,
    uuid: generateUUID()
  });
  this.subscribeChannel = null;
  this.publishChannel = null;
  if (this.pubNub) {
    this.pubNub.addListener({
      status: function (statusEvent) {
        if (trace) {
          console.log('[PIPE] PubNub status event:', statusEvent);
        }
      },
      message: function (messageEvent) {
        if (trace) {
          console.log('[PIPE] PubNub message event:', messageEvent);
        }
        if (messageEvent && messageEvent.message) {
          me.processMessage(messageEvent.message)
        }
      },
      presence: function (presenceEvent) {
        if (trace) {
          console.log('[PIPE] PubNub presence event:', presenceEvent);
        }
      }
    })
  } else {
    if (trace) {
      console.log('[PIPE][ERROR]: PubNub not initialized');
    }
  }
}

Pipe.prototype.open = function (localChannelId) {
  this.subscribeChannel = localChannelId;
  this.pubNub.subscribe({
    channels: [this.subscribeChannel]
  });
};

Pipe.prototype.join = function (remoteChannelId, localChannelId) {
  this.subscribeChannel = localChannelId;
  this.publishChannel = remoteChannelId;
  this.pubNub.subscribe({
    channels: [this.subscribeChannel]
  });
  this.pubNub.publish({
    channel: this.publishChannel,
    message: {
      messageType: MSG_JOIN,
      messagePayload: localChannelId
    },
  });
};

Pipe.prototype.send = function (msgType, msgPayload) {
  this.pubNub.publish({
    channel: this.publishChannel,
    message: {
      messageType: msgType,
      messagePayload: msgPayload
    },
  });
};

Pipe.prototype.processMessage = function (message) {
  const me = this;
  if (message.messageType && message.messagePayload) {
    switch (message.messageType) {
      case MSG_JOIN:
        me.trace('received JOIN, sending HANDSHAKE');
        this.publishChannel = message.messagePayload;
        this.send(MSG_HANDSHAKE, this.subscribeChannel);
        break;
      case MSG_HANDSHAKE:
        if (message.messagePayload === this.publishChannel) {
          me.trace('received HANDSHAKE, sending READY');
          this.send(MSG_READY, MSG_READY);
        }
        break;
      case MSG_READY:
        me.trace('received READY, sending OFFER');
        this.send(MSG_OFFER, '(offer)');
        break;
      case MSG_OFFER:
        me.trace('received OFFER, sending ANSWER');
        this.send(MSG_ANSWER, '(answer)');
        break;
      case MSG_ANSWER:
        me.trace('received ANSWER');
        break;
      case MSG_CANDIDATE:
        me.trace('received CANDIDATE');
        break;
    }
  }
}

Pipe.prototype.trace = function (msg, ...args) {
  if (trace) {
    console.log('[PIPE]: ' + msg, args);
  }
}

Pipe.prototype.traceError = function (msg, ...args) {
  if (trace) {
    console.log('[PIPE][ERROR]: ' + msg, args);
  }
}
