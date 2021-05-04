# MeetBox

The WebRTC library.

## Installation

Using npm:

```
$ npm i --save meetbox
```

## Current project status

This library is under migration process from private repository to GitHub,
with intensive refactoring, so please come back soon to check the status again.

Currently, this library does nothing but displays the rectangle of size 300x300 pixels,
filled with chocolate background.

## Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>MeetBox</title>
</head>
<body>
  <!-- place here any identifier you want -->
  <div id="7436f2a1-7810-4b3f-8234-d1ae0e0e3b1c"></div>
  <script src="https://unpkg.com/meetbox"></script>
  <script>
    <!-- use here your previously defined identifier -->
    window.meetbox.initialize('7436f2a1-7810-4b3f-8234-d1ae0e0e3b1c');
  </script>
</body>
</html>
```

### Creating a meeting

To create a new meeting, just call the function `createMeeting`, and send the meeting identifier to
other party that should join the same meeting:

```js
const uuid = window.meetbox.createMeeting();
```

### Join a meeting

To join a meeting, pass the meeting identifier to the function `joinMeeting`:  

```js
window.meetbox.joinMeeting(uuid);
```

## Documentation

- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE) [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
