import { useState, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import { Box, Paper, TextareaAutosize, Button } from '@mui/material';
import bot from '../assets/bot.svg';
import user from '../assets/user.svg';

const FinancialInsights = () => {
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
    <Box key={uniqueId} sx={{ width: '100%', p: 2, backgroundColor: isAi ? 'primary.light' : 'secondary.light', borderRadius: 2, mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isAi ? 'primary.dark' : 'secondary.dark', borderRadius: '50%' }}>
          <img src={isAi ? bot : user} alt={isAi ? 'bot' : 'user'} style={{ width: '80%', height: '80%' }} />
        </Box>
        <Box sx={{ flex: 1, color: 'text.primary', backgroundColor: 'background.paper', borderRadius: 1, p: 1.5, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
          <div id={uniqueId}>{value}</div>
        </Box>
      </Box>
    </Box>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100vh', width: '100%', backgroundColor: 'background.default' }}>
      <Box ref={chatContainerRef} sx={{ flex: 1, width: '100%', overflowY: 'scroll', p: 2 }}>
        {messages.map((message) => message)}
      </Box>

      <Paper component="form" ref={formRef} onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: 1280, p: 1, m: 2, backgroundColor: 'background.paper' }}>
        <TextareaAutosize
          name="prompt"
          rowsMin={1}
          placeholder="Ask CryptoWallet AI..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', color: '#fff', backgroundColor: 'transparent', border: 'none', outline: 'none', padding: '8px', fontSize: '1rem' }}
        />
        <Button type="submit" disabled={loading} sx={{ minWidth: 48, color: 'primary.main' }}>
          <IoSend size={24} />
        </Button>
      </Paper>
    </Box>
  );
};

export default FinancialInsights;

