// This file contains the main application code 

import React, { useState, useEffect, useRef, useMemo } from 'react';
import send_svg from './assets/send.svg';
import mic_svg from './assets/mic.svg';
import speaker_svg from './assets/speaker.svg';
import file_svg from './assets/file.svg'; 
import backgroundPhoto from './assets/bg.jpeg';
import gif from './assets/farm.gif';
import { TransformedItems } from './dropdown';
import { io } from 'socket.io-client';

// Establishing a connection to the server using Socket.IO
const socket = io('http://127.0.0.1:5000');

const App = () => {
  const [text, setText] = useState('');
  const [chatMessage, setChatMessage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef(null);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  // Generating transformed dropdown items using useMemo
  const dropdownItems = useMemo(() => TransformedItems(), []);

  // Language options for radio buttons
  const languageOptions = [
    { label: 'ENGLISH', value: 'en' },
    { label: 'HINDI', value: 'hi' },

  ];

  // Emitting a message to the server
  const socketEmit = () => {
    let temp = {
      message: text,
      self: true
    };
    setChatMessage((prev) => [...prev, temp]);
    socket.emit('message', {
      message: text,
      language: selectedLanguage
    });
    setText('');
  };

  // Setting up event listeners for receiving messages from the server
  useEffect(() => {
    socket.on('recv_message', (data) => {
      let temp = {
        message: data,
        self: false
      };
      setChatMessage((prev) => [...prev, temp]);
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off('recv_message');
    };
  }, []);

  // Automatically scrolling to the bottom of the chat window when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessage]);

  // Handling the click event for the microphone button
  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    // Setting up SpeechRecognition
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };
  
    // Handling the result event
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setChatMessage((prev) => [...prev, { message: transcript, self: true }]);
      socket.emit('message', {
        message: transcript,
        language: selectedLanguage
      });
      setIsListening(false); 
    };

    // Handling the end event
    recognition.onend = () => {
      setIsListening(false);
    };

    // Handling the error event
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  // Function to speak the last message using text-to-speech
  const speakMessage = () => {
    const lastMessage = chatMessage.length > 0 ? chatMessage[chatMessage.length - 1].message : '';
  
    if (!lastMessage) {
      console.warn('Last message is empty.');
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(lastMessage);
  
    utterance.lang = selectedLanguage;
    
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error during speech synthesis:', error);
    } finally {
      setText('');
    }
  };

  // Rendering the main application
  return (
    <div className="App flex flex-col w-full h-screen items-center text-grey" style={{ backgroundImage: `url(${backgroundPhoto})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <nav className='w-full py-5 flex flex-col items-center z-20'>
        <div className="flex items-center">
          <img className='h-16' src={gif} style={{ width: '340px', height: '150px' }} />
        </div>

        <div className="flex flex-col items-center font-bebas mt-3 text-4xl lg:text-4xl text-grey">
          <h1>Agricultural AI Chatbot</h1>
        </div>
        <center>
        <div className="flex items-center justify-end  w-full px-2 mt-5">
          <div className="language-selection flex items-center align-left w-full px-3 mt-4s ">
            {languageOptions.map((option) => (
              <label key={option.value} className="mx-2">
                <input
                  type="radio"
                  value={option.value}
                  checked={selectedLanguage === option.value}
                  onChange={() => setSelectedLanguage(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
        </center>
      </nav>

      <div id='back-ball' className='absolute rounded-full bg-pink-500/40'></div>
      <div id='back-ball-2' className='absolute rounded-full bg-red-400/50'></div>
      <div id='backdrop' className='w-screen h-screen fixed z-10'></div>

      <div className="flex flex-col h-3/4 w-4/5 xl:w-2/4 bg-black/40 backdrop-blur-md z-20 rounded-3x2 border-2 border-zinc-900/50">
        <div className="heading py-2 px-8 flex items-center border-b-2 border-zinc-500/30">
          <p className='ml-4 text-4x1 font-anton'>Farm Help</p>
        </div>

        <div id='chatscreen' className="flex flex-col w-full h-full overflow-auto px-8 py-5">
          <div className="max-w-3/4 py-1 px-3 font-poppins text-lg rounded-3x2 bg-slate-600 text-white mr-auto my-2">
            How may I help you?
          </div>
          {chatMessage.map((item, key) => (
            <div key={key} id='chatContainer' dangerouslySetInnerHTML={{ __html: item.message }} className={`max-w-full py-4 px-6 font-poppins text-xl rounded-2x1 ${item.self ? 'bg-emerald-700' : 'bg-slate-600'} text-white ${item.self ? 'ml-auto' : 'mr-auto'} my-3`}></div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="flex relative w-full justify-center items-center px-6 py-3 border-t-5 border-zinc-500/30">
          <div className={`absolute bottom-20 w-full px-5 ${text ? 'block' : 'hidden'}`}>
            <div className='bg-green-900 max-h-36 overflow-auto px-3 py-2'>
              {dropdownItems.filter(item => item.label.includes(text)).map((itm, key) => (
                <p onClick={() => setText(itm.value)} key={key} className='py-2 border-b-2 border-slate-700/60 cursor-pointer'>{itm.label}</p>
              ))}
            </div>
          
</div>



          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                socketEmit();
              }
            }}
            placeholder='Input Your Query'
            className='rounded-3x2 w-full bg-blue-900 py-2 px-4 border-2 border-slate-700/50'
            onChange={(e) => setText(e.target.value)}
            type='text'
            value={text}
          />

          <div className="flex ml-2">
            <button
              className='text-2xl bg-yellow-400 py-2 px-2 flex justify-center items-center rounded-full font-bebas ml-2'
              onClick={socketEmit}
            >
              <img className='w-7' src={send_svg} alt='Send' />
            </button>

            

            <button
              className='text-2xl bg-red-400 py-2 px-2 flex justify-center items-center rounded-full font-bebas ml-2'
              onClick={handleMicClick}
            >
              <img className='w-7' src={isListening ? send_svg : mic_svg} alt='Mic' />
            </button>
          </div>

          <button
            className='text-2xl bg-orange-400 py-2 px-2 flex justify-center items-center rounded-full font-bebas ml-2'
            onClick={speakMessage}
          >
            <img className='w-7' src={speaker_svg} alt='Speaker' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
