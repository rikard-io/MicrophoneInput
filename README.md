# MicrophoneInput.js

A simple wrapper for handling Microphone input through the WebAudio API.

Tested in Chrome 75+ and Safari 12.1.1+

## Install
`$ npm -i -D @rikardio/microphoneinput`
`$ yarn add -D @rikardio/microphoneinput`

## Usage
```
import MicrophoneInput from '@rikardio/MicrophoneInput.js';
...
let audioContext = new AudioContext();
let microphoneInput = new MicrophoneInput(audioContext);
microphoneInput.connect([audioNode for processing]);
```
Licence: WTFPL
