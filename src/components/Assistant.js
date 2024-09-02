import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';

const Assistant = () => {
    useEffect(() => {
        console.log("Page loaded. Initializing TARA...");
        speak("Initializing TARA...");
        wishMe();

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            console.log("Speech Recognition is supported in this browser.");
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => {
                console.log('Voice recognition activated. Try speaking into the microphone.');
            };

            recognition.onspeechend = () => {
                console.log('You were quiet for a while so voice recognition turned itself off.');
                recognition.stop();
            };

            recognition.onerror = (event) => {
                console.log('Error occurred in recognition: ' + event.error);
                if (event.error === 'audio-capture') {
                    console.log('Please check your microphone permissions and functionality.');
                }
                document.querySelector('.content').textContent = "Sorry, I didn't catch that.";
            };

            recognition.onresult = (event) => {
                console.log('Speech recognition result received.');
                const transcript = event.results[event.resultIndex][0].transcript;
                console.log('Transcript: ' + transcript);
                document.querySelector('.content').textContent = transcript;
                takeCommand(transcript.toLowerCase());
            };

            document.querySelector('.talk').addEventListener('click', () => {
                console.log('Talk button clicked. Starting voice recognition...');
                document.querySelector('.content').textContent = "Listening....";
                recognition.start();
            });
        } else {
            console.log('Speech Recognition not supported in this browser.');
            document.querySelector('.content').textContent = "Speech Recognition not supported in this browser.";
        }
    }, []);

    const speak = (text) => {
        console.log("Speaking: " + text);
        const text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.volume = 1;
        text_speak.pitch = 1;
        window.speechSynthesis.speak(text_speak);
    };

    const wishMe = () => {
        console.log("Preparing to wish based on the time of day...");
        const hour = new Date().getHours();

        if (hour >= 0 && hour < 12) {
            speak("Good Morning Nayana...");
        } else if (hour >= 12 && hour < 17) {
            speak("Good Afternoon Nayana...");
        } else {
            speak("Good Evening Nayana...");
        }
    };

    const takeCommand = (message) => {
        console.log('Processing command: ' + message);

        if (message.includes('hey') || message.includes('hello')) {
            speak("Hello Nayana, How May I Help You?");
        } else if (message.includes("open google")) {
            console.log('Opening Google...');
            window.open("https://google.com", "_blank");
            speak("Opening Google...");
        } else if (message.includes("open youtube")) {
            console.log('Opening YouTube...');
            window.open("https://youtube.com", "_blank");
            speak("Opening YouTube...");
        } else if (message.includes("open facebook")) {
            console.log('Opening Facebook...');
            window.open("https://facebook.com", "_blank");
            speak("Opening Facebook...");
        } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
            console.log('Searching Google for: ' + message);
            window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
            speak("This is what I found on the internet regarding " + message);
        } else if (message.includes('wikipedia')) {
            console.log('Searching Wikipedia for: ' + message);
            window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
            speak("This is what I found on Wikipedia regarding " + message);
        } else if (message.includes('time')) {
            const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            console.log('Telling the time: ' + time);
            speak(time);
        } else if (message.includes('date')) {
            const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
            console.log('Telling the date: ' + date);
            speak(date);
        } else if (message.includes('calculator')) {
            console.log('Opening Calculator...');
            window.open('Calculator:///');
            speak("Opening Calculator");
        } else {
            console.log('Performing a Google search for: ' + message);
            window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank");
            speak("I found some information for " + message + " on Google");
        }
    };

    return (
        <div className="input">
            <button className="talk"><FontAwesomeIcon icon={faMicrophoneAlt} /></button>
            <h1 className="content">Click here to speak</h1>
        </div>
    );
};

export default Assistant;
