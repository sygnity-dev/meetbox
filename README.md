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

## Documentation

- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE) [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
