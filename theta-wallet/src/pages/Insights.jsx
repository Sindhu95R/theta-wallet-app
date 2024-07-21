import React, { useState, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import bot from '../assets/bot.svg';
import user from '../assets/user.svg';

const Insights = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  let loadInterval;

  const loader = (element) => {
    element.textContent = '';

    loadInterval = setInterval(() => {
      element.textContent += '.';

      if (element.textContent === '....') {
        element.textContent = '';
      }
    }, 300);
  };

  const typeText = (element, text) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
  };

  const chatStripe = (isAi, value, uniqueId) => (
    <div key={uniqueId} className={`w-full p-4 ${isAi ? 'bg-gray-700' : 'bg-gray-800'}`}>
      <div className="max-w-5xl mx-auto flex flex-row items-start gap-2">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isAi ? 'bg-green-600' : 'bg-purple-600'}`}>
          <img src={isAi ? bot : user} alt={isAi ? 'bot' : 'user'} className="w-4/5 h-4/5 object-contain" />
        </div>
        <div className="flex-1 text-white text-lg bg-gray-800 rounded-lg p-2.5 overflow-x-auto whitespace-pre-wrap">
          <div id={uniqueId}>{value}</div>
        </div>
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userPrompt = prompt;
    const userUniqueId = generateUniqueId();
    const botUniqueId = generateUniqueId();

    const userMessage = chatStripe(false, userPrompt, userUniqueId);
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setPrompt('');
    setLoading(true);

    const botMessage = chatStripe(true, ' ', botUniqueId);
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // Wait for the DOM to update
    setTimeout(() => {
      const messageDiv = document.getElementById(botUniqueId);
      loader(messageDiv);

      handleFetch(userPrompt, messageDiv);
    }, 0);
  };

  const handleFetch = async (userPrompt, messageDiv) => {
    try {
      const response = await fetch('https://theta-wallet-app.onrender.com/api/transactions/0xAA32Ed0706d0eDFB73976f7af6B90B99f78FdEF3/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userPrompt }),
      });

      clearInterval(loadInterval);
      messageDiv.innerHTML = ' ';

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.response.trim();
        typeText(messageDiv, parsedData);
      } else {
        const err = await response.text();
        messageDiv.innerHTML = 'Something went wrong';
        alert(err);
      }
    } catch (error) {
      clearInterval(loadInterval);
      messageDiv.innerHTML = 'Something went wrong';
      console.error(error);
    } finally {
      setLoading(false);
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="bg-gray-800 flex flex-col items-center justify-between h-screen w-full">
      <div id="chat_container" ref={chatContainerRef} className="flex-1 w-full overflow-y-scroll flex flex-col gap-2.5 pb-5">
        {messages.map((message) => message)}
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-2.5 bg-gray-700 flex flex-row gap-2.5">
        <textarea
          name="prompt"
          rows="1"
          cols="1"
          placeholder="Ask CryptoWallet AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full text-white text-lg p-2.5 bg-transparent border-none outline-none resize-none"
        />
        <button type="submit" className="outline-none border-none cursor-pointer bg-transparent" disabled={loading}>
          <IoSend className="w-7.5 h-7.5 text-white" />
        </button>
      </form>
    </div>
  );
};

export default Insights;
