# MeetBox

The WebRTC library.

## Status

Currently, this library is in testing phase.
Please come back soon to check the status again.

## Installation

Using npm:

```
$ npm i --save meetbox
```

## Dependencies

**MeetBox** requires two services to operate:
- [PubNub](https://www.pubnub.com)
- [XirSys](https://xirsys.com)

To properly configure **MeetBox**, accounts in both services are needed.

There are free and commercial plans available in both of them:
- PubNub: https://www.pubnub.com/pricing
- XirSys: https://xirsys.com/pricing

For development and testing purposes, free plans are sufficient.

## Configuration

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>MeetBox</title>
</head>
<body>
  <div id="any-element-identifier"></div>
  <script src="https://unpkg.com/meetbox@0.0.20"></script>
  <script>
    let configuration = {
      trace: true, // flag indicating whether tracing messages will be displayed in the console
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
    window.meetbox.init('any-element-identifier-but-the-same-as', configuration);
  </script>
</body>
</html>
```

### Opening a meeting

To immediately open a new meeting, just call the function `openMeeting`,
and send the meeting identifier to other party that should join the same meeting:

```js
const meetingId = window.meetbox.openMeeting();
```

### Join a meeting

To join an opened meeting, pass the meeting identifier acquired from other party to `joinMeeting` function:  

```js
window.meetbox.joinMeeting(meetingId);
```

## Documentation

- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE) [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
