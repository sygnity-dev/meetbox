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

## License

MIT License

Copyright (c) 2017-2021 Dariusz Depta Engos Software

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
