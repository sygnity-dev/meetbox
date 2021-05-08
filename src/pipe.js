/*
 * Copyright (c) 2017-2021 Dariusz Depta Engos Software
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const PubNub = require('pubnub');
import {common} from "./common.js"
import {logger} from "./logger.js";
import {gui} from "./gui.js";
import {ice} from "./ice.js";

export const pipe = new Pipe();

const MSG_JOIN = 'JOIN';
const MSG_JOIN_ACK = 'JOIN_ACK';
const MSG_STREAM = 'STREAM';
const MSG_STREAM_ACK = 'STREAM_ACK';
const MSG_OFFER = 'MSG_OFFER';
const MSG_ANSWER = 'MSG_ANSWER';
const MSG_CANDIDATE = 'MSG_CANDIDATE';
const MSG_CLOSE = 'MSG_CLOSE';

function Pipe() {
  this.pubNub = null;
  this.subscribeChannel = null;
  this.publishChannel = null;
  this.localStream = null;
  this.peerConnection = null;
  this.onCloseExternalHandler = null;
}

Pipe.prototype.init = function (configuration) {
  const me = this;
  logger.info('PIPE configuration:', configuration);
  this.pubNub = new PubNub({
    publishKey: configuration.pubNub.publishKey,
    subscribeKey: configuration.pubNub.subscribeKey,
    uuid: common.uuid()
  });
  this.subscribeChannel = null;
  this.publishChannel = null;
  if (this.pubNub) {
    this.pubNub.addListener({
      status: (statusEvent) => {
        logger.info('PUBNUB status:', statusEvent);
      },
      message: (messageEvent) => {
        const message = messageEvent.message;
        if (message) {
          logger.info('RECEIVED[' + message.messageType + ']', message.messagePayload);
          me.processMessage(message)
        }
      },
      presence: (presenceEvent) => {
        logger.info('PUBNUB presence:', presenceEvent);
      }
    })
  } else {
    logger.error('PUBNUB not initialized');
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
  this.send(MSG_JOIN, this.subscribeChannel);
};

Pipe.prototype.send = function (messageType, messagePayload) {
  logger.info('SENDING[' + messageType + ']', messagePayload);
  this.pubNub.publish({
    channel: this.publishChannel,
    message: {
      messageType: messageType,
      messagePayload: messagePayload
    },
  });
};

Pipe.prototype.processMessage = function (message) {
  const me = this;
  if (message.messageType && message.messagePayload) {
    switch (message.messageType) {
      case MSG_JOIN:          // [OWNER]
        // OWNER saves the publishing channel's identifier of the CLIENT
        this.publishChannel = message.messagePayload;
        // OWNER acknowledges joining to CLIENT
        this.send(MSG_JOIN_ACK, true);
        break;
      case MSG_JOIN_ACK:      // [CLIENT]
        // CLIENT starts local streaming and responds to OWNER when ready
        this.startLocalStreaming(MSG_STREAM);
        break;
      case MSG_STREAM:        // [OWNER]
        // OWNER starts local streaming and responds to CLIENT when ready
        this.startLocalStreaming(MSG_STREAM_ACK);
        break;
      case MSG_STREAM_ACK:    // [CLIENT]
        // CLIENT prepares the offer and sends to OWNER
        this.prepareOffer();
        break;
      case MSG_OFFER:         // [OWNER]
        // OWNER accepts the offer and sends the answer to CLIENT
        this.prepareAnswer(message.messagePayload);
        break;
      case MSG_ANSWER:        // [CLIENT]
        if (this.peerConnection) {
          const answer = message.messagePayload;
          this.peerConnection.setRemoteDescription(answer)
            .then(() => {
              logger.info('accepted answer:', answer);
            })
            .catch((reason) => {
              logger.error('failed to accept answer, reason:', reason);
            });
        } else {
          logger.error("answer ignored, peer connection not initialized");
        }
        break;
      case MSG_CANDIDATE:     // [OWNER, CLIENT]
        if (this.peerConnection) {
          const candidate = message.messagePayload;
          this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch((reason) => {
            console.log('failed to add candidate, reason:', reason);
          });
        } else {
          logger.error("candidate ignored, peer connection not initialized");
        }
        break;
      case MSG_CLOSE:         // [OWNER, CLIENT]
        this.close();
        break;
    }
  }
}

/**
 * Starts the local streaming.
 */
Pipe.prototype.startLocalStreaming = function (messageType) {
  logger.info('starting local streaming...');
  const me = this;
  this.localStream = null;
  const constraints = {
    audio: true,
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720,
        maxWidth: 1920,
        maxHeight: 1080
      }
    }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (mediaStream) {
      logger.info('acquired local stream');
      gui.showLocalVideo();
      gui.getLocalVideo().srcObject = mediaStream;
      gui.getLocalVideo().onloadedmetadata = function (_event) {
        gui.getLocalVideo().play();
        gui.getLocalVideo().muted = '';
        logger.info('started to PLAY LOCAL stream');
      };
      me.localStream = mediaStream;
      me.createConnection(messageType);
    })
    .catch((reason) => {
      logger.error('failed to acquire LOCAL stream, reason:', reason);
    });
}

Pipe.prototype.createConnection = function (messageType) {
  logger.info('creating new connection...');
  const me = this;
  ice.getServers().then((data) => {
    const iceServers = {
      iceServers: [data]
    }
    logger.info('ICE servers:', iceServers);
    this.peerConnection = new RTCPeerConnection(iceServers);
    this.peerConnection.onicecandidate = (function (event) {
      me.onIceCandidate(event)
    });
    this.peerConnection.onsignalingstatechange = (function (event) {
      me.onSignalingStateChange(event)
    });
    this.peerConnection.onconnectionstatechange = (function (event) {
      me.onConnectionStateChange(event)
    });
    this.peerConnection.oniceconnectionstatechange = (function (event) {
      me.onIceConnectionStateChange(event)
    });
    this.peerConnection.ontrack = (function (event) {
      me.onTrack(event)
    });
    this.localStream.getTracks().forEach(function (track) {
      me.peerConnection.addTrack(track, me.localStream);
    });
    me.send(messageType, true);
  }).catch((reason) => {
    logger.error('failed to get ICE servers, reason: ', reason);
  })
};

Pipe.prototype.prepareOffer = function () {
  const me = this;
  if (this.peerConnection) {
    this.peerConnection.createOffer()
      .then((offer) => {
        logger.info("created offer:", offer);
        return me.peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        this.send(MSG_OFFER, me.peerConnection.localDescription);
      })
      .catch((reason) => {
        logger.error('failed to create offer, reason:', reason)
      });
  } else {
    logger.error('failed to prepare offer, peer connection not initialized')
  }
}

Pipe.prototype.prepareAnswer = function (offer) {
  const me = this;
  if (me.peerConnection) {
    this.peerConnection.setRemoteDescription(offer)
      .then(() => {
        logger.info('accepted offer:', offer);
        me.peerConnection.createAnswer()
          .then((answer) => {
            logger.info("created answer:", answer);
            return me.peerConnection.setLocalDescription(answer);
          })
          .then(function () {
            me.send(MSG_ANSWER, me.peerConnection.localDescription);
          })
          .catch((reason) => {
            logger.error('failed to create answer, reason:', reason);
          });
      })
      .catch((reason) => {
        logger.error('failed to accept offer, reason:', reason);
      });
  } else {
    logger.error('failed to prepare answer, peer connection not initialized')
  }
}

Pipe.prototype.close = function () {
  if (this.localStream || this.peerConnection) {
    this.send(MSG_CLOSE, true);
  }
  if (this.localStream) {
    logger.info('closing LOCAL stream');
    for (let i = 0; i < this.localStream.getTracks().length; i++) {
      this.localStream.getTracks()[i].stop();
    }
  }
  this.localStream = null;
  if (this.peerConnection) {
    logger.info('closing PEER connection');
    this.peerConnection.close();
  }
  this.peerConnection = null;
  gui.hideLocalVideo();
  gui.hideRemoteVideo();
  if (this.onCloseExternalHandler) {
    this.onCloseExternalHandler();
  }
};

Pipe.prototype.micOn = function () {
  if (this.localStream) {
    for (let i = 0; i < this.localStream.getAudioTracks().length; i++) {
      this.localStream.getAudioTracks()[i].enabled = true;
    }
  }
}

Pipe.prototype.micOff = function () {
  if (this.localStream) {
    for (let i = 0; i < this.localStream.getAudioTracks().length; i++) {
      this.localStream.getAudioTracks()[i].enabled = false;
    }
  }
}

Pipe.prototype.camOn = function () {
  if (this.localStream) {
    for (let i = 0; i < this.localStream.getVideoTracks().length; i++) {
      this.localStream.getVideoTracks()[i].enabled = true;
    }
  }
}

Pipe.prototype.camOff = function () {
  if (this.localStream) {
    for (let i = 0; i < this.localStream.getVideoTracks().length; i++) {
      this.localStream.getVideoTracks()[i].enabled = false;
    }
  }
}

Pipe.prototype.onTrack = function (event) {
  logger.info('PEER acquired REMOTE stream:', event);
  this.remoteStream = event.streams[0];
  gui.showRemoteVideo();
  gui.remoteVideo().srcObject = this.remoteStream;
  gui.remoteVideo().onloadedmetadata = function (_event) {
    gui.remoteVideo().play();
    gui.remoteVideo().muted = '';
    logger.info('started to PLAY REMOTE stream');
  }
}

Pipe.prototype.onIceCandidate = function (event) {
  if (event.candidate) {
    this.send(MSG_CANDIDATE, event.candidate);
  }
}

Pipe.prototype.onSignalingStateChange = function (_event) {
  if (this.peerConnection) {
    logger.info('PEER signaling state changed:', this.peerConnection.signalingState);
  }
}

Pipe.prototype.onConnectionStateChange = function (_event) {
  if (this.peerConnection) {
    logger.info('PEER connection state changed:', this.peerConnection.connectionState);
  }
}

Pipe.prototype.onIceConnectionStateChange = function (_event) {
  if (this.peerConnection) {
    logger.info('ICE connection state changed:', this.peerConnection.iceConnectionState);
    switch (this.peerConnection.iceConnectionState) {
      case 'disconnected':
      case 'failed':
        this.close();
        break;
    }
  }
}

Pipe.prototype.setOnCloseExternal = function (handler) {
  this.onCloseExternalHandler = handler;
}
