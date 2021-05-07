![MeetBox](doc/meetbox.png)

# MeetBox

The WebRTC library.

## Status

Currently, this library is in testing phase.
Please come back soon, to check again the status.

## Overview

**MeetBox** is a JavaScript library, that provides audio and video communication
functionality, supported by WebRTC technology available in all modern browsers.

**MeetBox** helps to integrate simple audio and video functionality with your web page,
with minimum effort and cost, just to verify whether this technology will be adopted
by your customers. In case the prototyping phase using **MeetBox** was a success,
more matured solutions may be adopted to your needs.

**MeetBox** does not aim to be a replacement for such products like:
- Microsoft Teams,
- Google Meet,
- Zoom,
- ...and many others.

## Introduction

Current version of **MeetBox** allows establishing audio and video communication channel
in peer-to-peer mode, between two participants (no group meetings).
One participant (called meeting's owner) opens a new meeting,
and the other one (called meeting's client) just joins it. As simply as that.

The basic scenario looks like this:
1. Meeting's owner opens a new meeting.
2. Meeting's owner sends the meeting's identifier to meeting's client.
3. Meeting's client, having a meeting's identifier, joins the meeting.
4. Both parties communicate using audio and/or video channel. 
5. When the meeting is over, each participant may close it.
6. After closing, the meeting's identifier is invalidated and useless. 

**MeetBox** supports all steps in this scenario, **EXCEPT STEP 2**.
Sending meeting's identifier from meeting's owner to meeting's client is out of scope of this library.
Sending meeting's identifier must be implemented in secured way by your application.

## Installation

Using npm:

```
$ npm i --save meetbox
```

## Dependencies

**MeetBox** requires the following external services to operate:
- [PubNub](https://www.pubnub.com),
- [XirSys](https://xirsys.com).

Accounts in these services are required to use **MeetBox**.
There are free and commercial plans available, details may be found here:
- [PubNub pricing](https://www.pubnub.com/pricing),
- [XirSys pricing](https://xirsys.com/pricing).

For prototyping purposes, free plans are sufficient.

## Usage

### MeetBox initialization in web page

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>MeetBox</title>
    <script src="https://unpkg.com/meetbox@0.0.22"></script>
  </head>
  <body>
    <!-- prepare a container to inject MeetBox -->
    <div id="my-meetbox-container-identifier"></div>
    <script>
      // prepare configuration
      let configuration = {
        trace: false, // log tracing messages?
        pubNub: {
          publishKey: 'your-publish-key-acquired-from-PubNub',
          subscribeKey: 'your-subscribe-key-acquired-from-PubNub',
        },
        xirSys: {
          apiPath: 'https://global.xirsys.net',
          channel: 'your-channel-name-acquired-from-XirSys',
          ident: 'your-identifier-acquired-from-XirSys',
          secret: 'your-secret-key-acquired-from-XirSys',
        }
      };
      // initialize MeetBox
      window.meetbox.init('my-meetbox-container-identifier', configuration);
    </script>
  </body>
</html>
```

### Opening a meeting by meeting's owner

To immediately open a new meeting, the meeting's owner calls `openMeeting` function,
and acquires the meeting's identifier.

```js
// open a new meeting, somwhere in your application
const meetingId = window.meetbox.openMeeting();
```

### Sending a meeting's identifier between owner and client

Meeting's owner has to send the meeting's identifier to meeting's client, somehow.
It is up to you (or your application) how it is done.
Sending identifiers between participants **is out of scope of this library**.

### Joining a meeting by meeting's client

Meeting's client, having the meeting's identifier, may join an opened meeting,
just by passing the meeting's identifier to `joinMeeting` function:  

```js
// join an opened meeting, somewhere in your application
window.meetbox.joinMeeting(meetingId);
```

## Documentation

- [Changelog](CHANGELOG.md)

## Milestones

1. Codebase refactoring, stabilisation and intensive testing (approx. end of June 2021).
2. Custom implementation of signalling as an alternative for PubNub (approx. end of May 2021).
3. Integration with [coturn](https://github.com/coturn/coturn) as an alternative for XirSys (approx. end of July 2021).
4. Any requirements from community and users... 

## License

[MIT](LICENSE) [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
