export const gui = new Gui();

function Gui() {
}

const HTML_STREAMING_CONTAINER = `
  <div id="mbxStreamingContainer" class="mbx-streaming-container">
    <div id="mbxRemoteVideoContainer" class="mbx-remote-video-container">
      <video id="mbxRemoteVideo" class="mbx-remote-video" muted></video>
    </div>
    <div id="mbxLocalVideoContainer" class="mbx-local-video-container">
      <video id="mbxLocalVideo" class="mbx-local-video" muted></video>
    </div>
  </div>
`

Gui.prototype.createMeetboxContainer = function() {
  const meetBoxContainer = window.document.createElement('div');
  meetBoxContainer.id = 'mbxMeetboxContainer';
  meetBoxContainer.className = 'mbx-meetbox-container';
  meetBoxContainer.innerHTML = HTML_STREAMING_CONTAINER;
  return meetBoxContainer;
}

Gui.prototype.init = function() {
  this.hideLocalVideo();
  this.hideRemoteVideo();
}

Gui.prototype.showLocalVideo = function() {
  this.localVideoContainer().style.display = 'block';
}

Gui.prototype.hideLocalVideo = function() {
  this.localVideoContainer().style.display = 'none';
}

Gui.prototype.showRemoteVideo = function() {
  this.remoteVideoContainer().style.display = 'block';
}

Gui.prototype.hideRemoteVideo = function() {
  this.remoteVideoContainer().style.display = 'none';
}

Gui.prototype.meetBoxContainer = function() {
  return window.document.getElementById('mbxMeetboxContainer');
}

Gui.prototype.localVideo = function() {
  return window.document.getElementById('mbxLocalVideo');
}

Gui.prototype.localVideoContainer = function() {
  return window.document.getElementById('mbxLocalVideoContainer');
}

Gui.prototype.remoteVideo = function() {
  return window.document.getElementById('mbxRemoteVideo');
}

Gui.prototype.remoteVideoContainer = function() {
  return window.document.getElementById('mbxRemoteVideoContainer');
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
