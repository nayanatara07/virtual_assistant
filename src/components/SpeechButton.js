import React from 'react';

class SpeechButton extends React.Component {
    constructor(props) {
        super(props);
        this.recognition = null;
    }

    componentDidMount() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'en-US';
            this.recognition.interimResults = false;

            this.recognition.onstart = () => {
                console.log('Voice recognition activated. Try speaking into the microphone.');
            };

            this.recognition.onspeechend = () => {
                console.log('You were quiet for a while so voice recognition turned itself off.');
                this.recognition.stop();
            };

            this.recognition.onerror = (event) => {
                console.log('Error occurred in recognition: ' + event.error);
                if (event.error === 'audio-capture') {
                    console.log('Please check your microphone permissions and functionality.');
                }
                this.props.onSpeech("Sorry, I didn't catch that.");
            };

            this.recognition.onresult = (event) => {
                const currentIndex = event.resultIndex;
                const transcript = event.results[currentIndex][0].transcript;
                console.log('Transcript: ' + transcript);
                this.props.onSpeech(transcript);
            };
        } else {
            console.log('Speech Recognition not supported in this browser.');
            this.props.onSpeech("Speech Recognition not supported in this browser.");
        }
    }

    startRecognition = () => {
        if (this.recognition) {
            console.log('Talk button clicked. Starting voice recognition...');
            this.props.onSpeech("Listening....");
            this.recognition.start();
        }
    };

    render() {
        return (
            <button className="talk" onClick={this.startRecognition}>
                <i className="fas fa-microphone-alt"></i>
            </button>
        );
    }
}

export default SpeechButton;
