export function Components() {
}

const html = `
  <div class="elv-streaming-bg-container">
    <div id="elvRemoteVideoContainer" class="elv-remote-video-container">
       <video id="elvRemoteVideo" class="elv-remote-video" muted></video>
    </div>
  </div>
  <div id="elvStreamingFGContainer" class="elv-streaming-fg-container">
    <div class="elv-local-room-container">
       <div id="elvLocalRoomName" class="elv-local-room-name">-</div>
    </div>
    <div class="elv-remote-room-container">
          <input type="text"
                 id="elvRemoteRoomName"
                 name="room-name"
                 placeholder="type room name"
                 class="elv-remote-room-name"
                 maxlength="26"/>
    </div>
    <div id="elvStreamingPhoneContainer" class="elv-streaming-phone-container">
          <div id="elvBeginCall" class="elv-begin-call">
              <div class="elv-telephone-icon">
                  <div class="ion ion-ios-telephone"></div>
              </div>
          </div>
          <div id="elvEndCall" class="elv-end-call">
              <div class="elv-telephone-icon">
                  <div class="ion ion-ios-telephone"></div>
              </div>
          </div>
          <div id="elvInactiveCall" class="elv-inactive-call">
              <div class="elv-telephone-icon">
                  <div class="ion ion-ios-telephone"></div>
              </div>
          </div>
      </div>
      <div id="elvLocalVideoContainer" class="elv-local-video-container" draggable="true">
          <video id="elvLocalVideo" class="elv-local-video" muted></video>
      </div>
  </div>
`

Components.prototype.initialize = function () {
  const streamingContainer = window.document.createElement('div');
  streamingContainer.className = 'mbx-streaming-container';
  streamingContainer.innerHTML = html;
  return streamingContainer;
}
