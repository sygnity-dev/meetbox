# Current status

|  Feature               |  Status   |  Remarks  |
| ---------------------- | --------- | --------- |
| Video streaming        | Done      |           |
| Audio streaming        | Done      |           |
| Video on/off           | Done      |           |
| Audio on/off           | Done      |           |
| Open meeting           | Done      |           |
| Join meeting           | Done      |           |
| Close meeting          | Done      |           |
| One-to-one meeting     | Done      |           |
| Group meeting          | Planned   |           |
| One-to-one chat        | Planned   |           |
| Group chat             | Planned   |           |
| Screen sharing         | Planned   |           |
| File transfer          | Planned   |           |

# Changelog history

### 0.1.0 (May 8, 2021)

- Improved UI styling.
- Added PubNub unsubscribe.
- Improved sequential connecting with the same meeting identifier.

### 0.0.24 (May 8, 2021)

- Added **closeMeeting** function to API.
- Added **setOnClose** function to API.

### 0.0.20 (May 6, 2021)

- MeetBox dynamically created inside parent component.
- Parent component must have some width and height, for example fixed.
- Connection to PubNub for messaging.
- Connection to XirSys for relay.
- Display local stream.
- Display remote stream.
- Microphone on/off.
- Camera on/off.
- Close connection button.
- Automatic connection close when other party closed his/her connection.
- Automatic close when Internet connection fails.
- Tested to be included in Angular application.

### 0.0.1 (May 4, 2021)

Created initial public repository on GitHub.
Migrated from private repository of **Engos Software** to public domain.

### 0.0.0 (October 10, 2017)

Original WebRTC library was developed in Autumn 2017, originally as the project called **kiko.live**.
It was a proof of concept of using [WebRTC](https://webrtc.org/) technology in day to day communication.
Because of relatively low demand for such solutions at that time, this project was frozen.
This project is the continuation of the work done in **kiko.live** by **Engos Software**.
