import { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { Box, Paper, TextareaAutosize, Button, Typography, Fade, CircularProgress } from '@mui/material';
import bot from '../assets/bot.svg';
import user from '../assets/user.svg';

const FinancialInsights = () => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const chatContainerRef = useRef(null);
    const formRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const generateUniqueId = () => {
        return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    };

    const chatStripe = (isAi, value, uniqueId) => (
        <Fade in={true} timeout={500} key={uniqueId}>
            <Box sx={{
                width: '100%',
                p: 2,
                backgroundColor: isAi ? 'rgba(42, 184, 230, 0.1)' : 'rgba(0, 255, 255, 0.1)',
                borderRadius: 2,
                mb: 1,
                border: '1px solid rgba(42, 184, 230, 0.2)',
                boxShadow: '0 0 10px rgba(42, 184, 230, 0.1)',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{
                        width: 36,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: isAi ? 'primary.main' : 'secondary.main',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                    }}>
                        <img src={isAi ? bot : user} alt={isAi ? 'bot' : 'user'} style={{ width: '60%', height: '60%' }} />
                    </Box>
                    <Box sx={{
                        flex: 1,
                        color: 'text.primary',
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        p: 1.5,
                        overflowX: 'auto',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.9rem',
                    }}>
                        {value}
                    </Box>
                </Box>
            </Box>
        </Fade>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        const userMessage = chatStripe(false, prompt, generateUniqueId());
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setPrompt('');
        setLoading(true);

        const botMessage = chatStripe(true, <CircularProgress size={20} />, generateUniqueId());
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        try {
            const response = await fetch('https://theta-wallet-app.onrender.com/api/transactions/0xAA32Ed0706d0eDFB73976f7af6B90B99f78FdEF3/qa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: prompt }),
            });

            if (response.ok) {
                const data = await response.json();
                const parsedData = data.response.trim();
                setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1),
                    chatStripe(true, parsedData, generateUniqueId())
                ]);
            } else {
                const err = await response.text();
                setMessages((prevMessages) => [
                    ...prevMessages.slice(0, -1),
                    chatStripe(true, 'Something went wrong', generateUniqueId())
                ]);
                console.error(err);
            }
        } catch (error) {
            console.error(error);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                chatStripe(true, 'Something went wrong', generateUniqueId())
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(10, 25, 41, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(42, 184, 230, 0.2)',
            boxShadow: '0 0 30px rgba(42, 184, 230, 0.1)',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'conic-gradient(from 0deg at 50% 50%, #2ab8e6 0deg, transparent 60deg, transparent 300deg, #00ffff 360deg)',
                animation: 'rotate 20s linear infinite',
                opacity: 0.1,
            },
            '@keyframes rotate': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
            },
        }}>
            <Typography variant="h5" gutterBottom sx={{
                p: 2,
                color: 'primary.main',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(42, 184, 230, 0.5)',
            }}>
                Financial Insights AI
            </Typography>
            <Box ref={chatContainerRef} sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
                {messages}
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderTop: '1px solid rgba(42, 184, 230, 0.2)',
            }}>
                <TextareaAutosize
                    name="prompt"
                    placeholder="Ask about your financial insights..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    style={{
                        width: '100%',
                        color: '#fff',
                        backgroundColor: 'rgba(10, 25, 41, 0.7)',
                        border: '1px solid rgba(42, 184, 230, 0.2)',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '8px',
                        fontSize: '1rem',
                        resize: 'none',
                    }}
                    minRows={1}
                    maxRows={4}
                />
                <Button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    sx={{
                        minWidth: 48,
                        ml: 1,
                        color: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'rgba(42, 184, 230, 0.1)',
                        },
                    }}
                >
                    <IoSend size={24} />
                </Button>
            </Box>
        </Paper>
    );
};

export default FinancialInsights;