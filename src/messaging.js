const PubNub = require('pubnub');
import {trace, generateUUID} from "./common"

const MSG_JOIN = 'JOIN';
const MSG_HANDSHAKE = 'HANDSHAKE';

export function Messaging() {
}

Messaging.prototype.initialize = function (configuration) {
  const me = this;
  if (trace) {
    console.log('Initializing messaging...')
    console.log('Configuration:', configuration)
  }
  this.pubNub = new PubNub({
    publishKey: configuration.pubNub.publishKey,
    subscribeKey: configuration.pubNub.subscribeKey,
    uuid: generateUUID()
  });
  this.subscribeChannel = null;
  this.publishChannel = null;
  if (trace) {
    console.log('PUBNUB:', this.pubNub);
  }
  if (this.pubNub) {
    this.pubNub.addListener({
      status: function (statusEvent) {
        if (trace) {
          console.log('PUBNUB: status event:', statusEvent);
        }
      },
      message: function (messageEvent) {
        if (trace) {
          console.log('PUBNUB: message event:', messageEvent);
        }
        if (messageEvent && messageEvent.message) {
          me.processMessage(messageEvent.message)
        }
      },
      presence: function (presenceEvent) {
        if (trace) {
          console.log('PUBNUB: presence event:', presenceEvent);
        }
      }
    })
  }
}

Messaging.prototype.open = function (ownerChannelId) {
  this.subscribeChannel = ownerChannelId;
  this.pubNub.subscribe({
    channels: [this.subscribeChannel]
  });
};

Messaging.prototype.join = function (ownerChannelId, clientChannelId) {
  this.subscribeChannel = clientChannelId;
  this.publishChannel = ownerChannelId;
  this.pubNub.subscribe({
    channels: [this.subscribeChannel]
  });
  this.pubNub.publish({
    channel: this.publishChannel,
    message: {
      title: MSG_JOIN,
      description: clientChannelId
    },
  });
};

Messaging.prototype.send = function (msgTitle, msgDescription) {
  this.pubNub.publish({
    channel: this.publishChannel,
    message: {
      title: msgTitle,
      description: msgDescription
    },
  });
};

Messaging.prototype.processMessage = function (message) {
  if (message.title && message.description) {
    switch (message.title) {
      case MSG_JOIN:
        this.publishChannel = message.description;
        this.send(MSG_HANDSHAKE, this.subscribeChannel);
        break;
      case MSG_HANDSHAKE: {
        if (trace) {
          if (message.description === this.publishChannel) {
            console.log('PUBNUB: handshake successful');
          } else {
            console.log('PUBNUB: handshake failed');
          }
        }
      }
    }
  }
}
