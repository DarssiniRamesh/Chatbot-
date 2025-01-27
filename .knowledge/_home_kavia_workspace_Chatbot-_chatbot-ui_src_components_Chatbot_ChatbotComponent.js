{"is_source_file": true, "format": "JavaScript", "description": "A React component that handles chatbot interactions with a user interface to send and receive messages and clear chat history.", "external_files": ["../../services/chatbotInstance", "../../theme/retro-theme", "@mui/material", "@mui/icons-material/Send", "@mui/icons-material/LocalHospital", "@mui/icons-material/Healing", "@mui/icons-material/Person", "@mui/icons-material/DeleteOutline"], "external_methods": ["chatbotService.loadChatHistory", "chatbotService.clearChatHistory", "chatbotService.saveMessageToHistory", "chatbotService.generateResponse"], "published": ["ChatbotComponent"], "classes": [], "methods": [{"name": "ChatbotComponent", "description": "The main functional component that handles state management and rendering of the chatbot interface."}, {"name": "handleOpenClearDialog", "description": "Opens the confirmation dialog for clearing chat history."}, {"name": "handleCloseDialog", "description": "Closes the confirmation dialog."}, {"name": "handleClearChat", "description": "Clears chat history and updates the state and snackbar message accordingly."}, {"name": "handleCloseSnackbar", "description": "Closes the snackbar notification."}, {"name": "handleSubmit", "description": "Submits the user's message, processes the response, and updates the chat state."}, {"name": "useEffect", "description": "Loads chat history and updates the messages state on component mount."}], "calls": ["setMessages", "setInputText", "setIsLoading", "setError", "chatbotService.loadChatHistory", "chatbotService.clearChatHistory", "chatbotService.generateResponse", "chatbotService.saveMessageToHistory"], "search-terms": ["chatbot", "message", "clear history", "notification", "React component"], "state": 2, "ctags": ["6000: /^          autoHideDuration={6000}$/;\"", "Avatar: /^const Avatar = styled(Box)(({ theme }) => ({$/;\"", "ChatContainer: /^const ChatContainer = styled(Box)(({ theme }) => ({$/;\"", "ChatbotComponent: /^const ChatbotComponent = () => {$/;\"", "MessageBubble: /^const MessageBubble = styled(Box)(({ theme, sender }) => ({$/;\"", "MessageWrapper: /^const MessageWrapper = styled(Box)(({ theme, sender }) => ({$/;\"", "botMessage: /^      const botMessage = {$/;\"", "handleClearChat: /^  const handleClearChat = async () => {$/;\"", "handleCloseDialog: /^          onClose={handleCloseDialog}$/;\"", "handleCloseDialog: /^  const handleCloseDialog = () => {$/;\"", "handleCloseSnackbar: /^            onClose={handleCloseSnackbar}$/;\"", "handleCloseSnackbar: /^          onClose={handleCloseSnackbar}$/;\"", "handleCloseSnackbar: /^  const handleCloseSnackbar = (event, reason) => {$/;\"", "handleOpenClearDialog: /^                onClick={handleOpenClearDialog}$/;\"", "handleOpenClearDialog: /^  const handleOpenClearDialog = () => {$/;\"", "handleSubmit: /^            onSubmit={handleSubmit}$/;\"", "handleSubmit: /^  const handleSubmit = async (e) => {$/;\"", "inputText: /^              value={inputText}$/;\"", "intent: /^        intent: response.intent$/;\"", "isLoading: /^              disabled={isLoading}$/;\"", "isLoading: /^              endIcon={isLoading ? <CircularProgress size={20} color=\"inherit\" \\/> : <SendIcon \\//;\"", "openDialog: /^          open={openDialog}$/;\"", "query: /^    const query = inputText.trim();$/;\"", "response: /^      const response = await chatbotService.generateResponse(query);$/;\"", "retroTheme: /^    <ThemeProvider theme={retroTheme}>$/;\"", "sender: /^        sender: 'bot',$/;\"", "sender: /^        sender: 'user',$/;\"", "setError: /^  const [error, setError] = useState(null);$/;\"", "setInputText: /^  const [inputText, setInputText] = useState('');$/;\"", "setIsLoading: /^  const [isLoading, setIsLoading] = useState(false);$/;\"", "setMessages: /^  const [messages, setMessages] = useState([]);$/;\"", "setOpenDialog: /^  const [openDialog, setOpenDialog] = useState(false);$/;\"", "setSnackbar: /^  const [snackbar, setSnackbar] = useState({$/;\"", "snackbar: /^            severity={snackbar.severity}$/;\"", "snackbar: /^          open={snackbar.open}$/;\"", "text: /^        text: query,$/;\"", "text: /^        text: response.answer,$/;\"", "timestamp: /^        timestamp: new Date().toISOString()$/;\"", "timestamp: /^        timestamp: new Date().toISOString(),$/;\"", "userMessage: /^      const userMessage = {$/;\""], "filename": "/home/kavia/workspace/Chatbot-/chatbot-ui/src/components/Chatbot/ChatbotComponent.js", "hash": "171271deca3f3f59e60d4921e5bc7999", "format-version": 3, "code-base-name": "default"}