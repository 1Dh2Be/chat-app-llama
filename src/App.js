import './App.css';
import ChatApp from './components/chat-app/ChatApp.jsx';
import { ModelProvider } from './components/chat-app/context/ModelContext.js';
import { TextAreaProvider } from './components/chat-app/context/TextAreaContext.js';
import { ThemeProvider } from './components/chat-app/context/ThemeContext.js';

function App() {
  return (
    <ThemeProvider>
      <ModelProvider>
        <TextAreaProvider>
          <ChatApp />
        </TextAreaProvider>
      </ModelProvider>
    </ThemeProvider>
  );
}

export default App;
