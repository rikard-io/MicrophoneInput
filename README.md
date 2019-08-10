# MicrophoneInput.js

A simple wrapper for handling Microphone input through the WebAudio API.

Tested in Chrome 75+ and Safari 12.1.1+

**External input only works on secure URLs**

## Install
`$ npm -i -D @rikard.io/microphoneinput`

`$ yarn add -D @rikard.io/microphoneinput`

## Usage
```
import MicrophoneInput from '@rikard.io/MicrophoneInput.js';
...
let audioContext = new AudioContext();
let microphoneInput = new MicrophoneInput(audioContext);

// Request permission
microphoneInput.setup().then(()=>{
  microphoneInput.connect([audioNode for processing]);
});
```
Licence: WTFPL
