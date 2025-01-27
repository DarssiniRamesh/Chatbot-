import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  ThemeProvider,
  Container,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  styled
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import PersonIcon from '@mui/icons-material/Person';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import chatbotService from '../../services/chatbotInstance';
import retroTheme from '../../theme/retro-theme';

// Styled components
const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
  padding: theme.spacing(2.5),
  maxHeight: 500,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

const MessageWrapper = styled(Box)(({ theme, sender }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  margin: theme.spacing(0.625, 0),
  maxWidth: '80%',
  marginLeft: sender === 'user' ? 'auto' : 0,
  flexDirection: sender === 'user' ? 'row-reverse' : 'row',
}));

const MessageBubble = styled(Box)(({ theme, sender }) => ({
  padding: theme.spacing(1.25, 1.875),
  borderRadius: theme.spacing(1.875),
  position: 'relative',
  color: theme.palette.background.paper,
  wordWrap: 'break-word',
  backgroundColor: sender === 'user' ? theme.palette.primary.main : theme.palette.secondary.main,
  borderTopRightRadius: sender === 'user' ? 0 : theme.spacing(1.875),
  borderTopLeftRadius: sender === 'user' ? theme.spacing(1.875) : 0,
  marginRight: sender === 'user' ? theme.spacing(1.25) : 0,
  marginLeft: sender === 'user' ? 0 : theme.spacing(1.25),
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    ...(sender === 'user' ? {
      right: -10,
      borderLeft: `10px solid ${theme.palette.primary.main}`,
      borderRight: '0 solid transparent',
    } : {
      left: -10,
      borderRight: `10px solid ${theme.palette.secondary.main}`,
      borderLeft: '0 solid transparent',
    }),
    borderBottom: '10px solid transparent',
  },
  textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
}));

const Avatar = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
}));

// PUBLIC_INTERFACE
const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const history = chatbotService.loadChatHistory();
      // Deduplicate messages based on timestamp and content
      const uniqueMessages = history.reduce((acc, message) => {
        const isDuplicate = acc.some(
          m => m.timestamp === message.timestamp && 
               m.text === message.text && 
               m.sender === message.sender
        );
        if (!isDuplicate) {
          acc.push(message);
        }
        return acc;
      }, []);
      setMessages(uniqueMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
      setMessages([]);
    }
  }, []);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle opening confirmation dialog
  const handleOpenClearDialog = () => {
    setOpenDialog(true);
  };

  // Handle closing confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle clearing chat history
  const handleClearChat = async () => {
    handleCloseDialog();
    try {
      await chatbotService.clearChatHistory();
      setMessages([]);
      setSnackbar({
        open: true,
        message: 'Chat history cleared successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error clearing chat history:', error);
      setSnackbar({
        open: true,
        message: 'Failed to clear chat history. Please try again.',
        severity: 'error'
      });
    }
  };

  // Handle closing snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Handle user input submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query) return;

    setError(null);
    setIsLoading(true);

    try {
      // Add user message to chat
      const userMessage = {
        text: query,
        sender: 'user',
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => {
        const newMessages = [...prevMessages, userMessage];
        try {
          chatbotService.saveMessageToHistory(userMessage);
        } catch (error) {
          console.error('Error saving user message to history:', error);
        }
        return newMessages;
      });
      setInputText('');

      // Get response from chatbot service
      const response = await chatbotService.generateResponse(query);

      // Add bot response to chat
      const botMessage = {
        text: response.answer,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        intent: response.intent
      };

      setMessages(prevMessages => {
        const newMessages = [...prevMessages, botMessage];
        try {
          chatbotService.saveMessageToHistory(botMessage);
        } catch (error) {
          console.error('Error saving bot message to history:', error);
        }
        return newMessages;
      });
    } catch (err) {
      setError('Failed to process your message. Please try again.');
      setMessages(prevMessages => [...prevMessages, {
        text: 'Failed to process your message. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        intent: null
      }]);
      console.error('Error processing message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={retroTheme}>
      <Container maxWidth="md">
        <Box 
          sx={{ 
            height: '600px', 
            display: 'flex', 
            flexDirection: 'column',
            p: 2,
            mt: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              mb: 2,
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              pb: 1
            }}
          >
            <LocalHospitalIcon color="primary" />
            <Typography variant="h6" color="primary" sx={{ letterSpacing: '0.05em' }}>
              Medical Assistant
            </Typography>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button
                onClick={handleOpenClearDialog}
                color="primary"
                startIcon={<DeleteOutlineIcon />}
                variant="outlined"
                sx={{
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  }
                }}
              >
                Clear Chat
              </Button>
            </Box>
          </Box>
          <ChatContainer>
            {messages.map((message, index) => (
              <MessageWrapper
                key={index}
                sender={message.sender}
              >
                <Avatar>
                  {message.sender === 'bot' ? (
                    <HealingIcon sx={{ color: 'secondary.main' }} />
                  ) : (
                    <PersonIcon sx={{ color: 'primary.main' }} />
                  )}
                </Avatar>
                <MessageBubble sender={message.sender}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'background.paper',
                      fontWeight: 500,
                    }}
                  >
                    {message.text}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block',
                      mt: 0.5,
                      opacity: 0.9,
                      color: 'background.paper',
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </Typography>
                </MessageBubble>
              </MessageWrapper>
            ))}
            {isLoading && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  my: 2,
                  gap: 1
                }}
              >
                <CircularProgress 
                  size={24} 
                  color="secondary" 
                  thickness={4}
                  sx={{
                    animation: 'pulse 1.5s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%': {
                        transform: 'scale(0.95)',
                        opacity: 0.5,
                      },
                      '50%': {
                        transform: 'scale(1)',
                        opacity: 1,
                      },
                      '100%': {
                        transform: 'scale(0.95)',
                        opacity: 0.5,
                      },
                    },
                  }}
                />
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    animation: 'fadeInOut 1.5s ease-in-out infinite',
                    '@keyframes fadeInOut': {
                      '0%': { opacity: 0.5 },
                      '50%': { opacity: 1 },
                      '100%': { opacity: 0.5 },
                    }
                  }}
                >
                  Processing...
                </Typography>
              </Box>
            )}
          </ChatContainer>
          
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2
            }}
          >
            <TextField
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              size="medium"
              disabled={isLoading}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              endIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{ minWidth: '120px' }}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Box>
        </Box>

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="clear-chat-dialog-title"
          aria-describedby="clear-chat-dialog-description"
        >
          <DialogTitle id="clear-chat-dialog-title">
            Clear Chat History
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="clear-chat-dialog-description">
              Are you sure you want to clear all chat messages? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClearChat} color="error" variant="contained">
              Clear
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default ChatbotComponent;
