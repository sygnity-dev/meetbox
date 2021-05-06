export const gui = new Gui();

function Gui() {
  this.meetboxContainer = null;
}

const HTML_STREAMING_CONTAINER_CONTENT = `
  <div id="mbxRemoteVideoContainer" class="mbx-remote-video-container">
    <video id="mbxRemoteVideo" class="mbx-remote-video" muted></video>
  </div>
  <div id="mbxLocalVideoContainer" class="mbx-local-video-container">
    <video id="mbxLocalVideo" class="mbx-local-video" muted></video>
  </div>
`

Gui.prototype.createStreamingContainer = function () {
  const streamingContainer = window.document.createElement('div');
  streamingContainer.className = 'mbx-streaming-container';
  streamingContainer.innerHTML = HTML_STREAMING_CONTAINER_CONTENT;
  return streamingContainer;
}

Gui.prototype.createMeetboxContainer = function() {
  this.meetBoxContainer = window.document.createElement('div');
  this.meetBoxContainer.className = 'mbx-meet-box-container';
  return this.meetBoxContainer;
}


Gui.prototype.createIdIndicator = function(uuid) {
  const indicator = window.document.createElement('div');
  indicator.className = 'mbx-indicator';
  indicator.innerText = uuid;
  return indicator;
}

Gui.prototype.localVideo = function() {
  return window.document.getElementById('mbxLocalVideo');
}

Gui.prototype.remoteVideo = function() {
  return window.document.getElementById('mbxRemoteVideo');
}

Gui.prototype.deleteAllChildren = function(element) {
  if (element) {
    let child = element.firstChild;
    while (child) {
      element.removeChild(child);
      child = element.firstChild;
    }
  } else {
    console.log('Invalid element passed to `deleteChildren function: ', element);
  }
}
