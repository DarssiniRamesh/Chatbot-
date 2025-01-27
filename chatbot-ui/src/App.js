import ChatbotComponent from './components/Chatbot/ChatbotComponent';
import { ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import retroTheme from './theme/retro-theme';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AppContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

const AppHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

const AppMain = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function App() {
  return (
    <ThemeProvider theme={retroTheme}>
      <AppContainer>
        <AppHeader component="header">
          <Typography variant="h1" sx={{ margin: 0, fontSize: 'calc(16px + 1.5vmin)' }}>
            Medical Assistant Chatbot
          </Typography>
        </AppHeader>
        <AppMain component="main">
          <ChatbotComponent />
        </AppMain>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
