/** 
 * Very simple wrapper for handling Microphone input through the WebAudio API
 * @author Rikard Lindstrom <hi@rikard.io>
*/

// Polyfill for getUserMedia
const getUserMedia = function(filter){
  return new Promise((resolve,reject)=>{
    let promise;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia(filter, resolve, reject).then(resolve).catch(reject);
    } else if ( navigator.getUserMedia ){
      promise = navigator.getUserMedia(filter, resolve, reject);
    }
  });
}

class MicrophoneInput {

  constructor(audioContext){
    this.audioContext = audioContext;
    this.hasBeenSetup = false;
  }

  /** 
   * Call in response to user interaction
  */
  setup(){
    return new Promise((resolve, reject)=>{

      if ( this.hasBeenSetup ){
        reject(new Error('MicrophoneInput has already been setup'));
        return;
      }
      this.hasBeenSetup = true;

      return getUserMedia({audio: true}).then(stream=>{
        var microphone = this.audioContext.createMediaStreamSource(stream);
        this.input = this.output = microphone;
        resolve();
      }).catch(error=>{
        this.hasBeenSetup = false;
        reject(err);
      });
    });
  }

  get input() {
    throw new Error('MicrophoneInput is not setup yet. Run .setup() and make sure to catch any errors there');
  }

  set input(value){
    Object.defineProperty(this, 'input', {
      value,
      writable: false
    });
  }

  get output() {
    throw new Error('MicrophoneInput is not setup yet. Run .setup() and make sure to catch any errors there');
  }
  
  set output(value){
    Object.defineProperty(this, 'output', {
      value,
      writable: false
    });
  }

  connect(audioNode){
    if(audioNode instanceof AudioNode){
      this.output.connect(audioNode);
    } else {
      if (audioNode.input instanceof AudioNode){
        console.log('hmm')
        this.output.connect(audioNode.input);
      }
    }
    return this;
  }

  disconnect(){
    this.output.disconnect();
    this.input.disconnect();
    return this;
  }
}

export default MicrophoneInput;