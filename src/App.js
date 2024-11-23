import './App.css';
import ChatApp from './components/chat-app/ChatApp.jsx';
import { ModelProvider } from './components/chat-app/components/model-selection/ModelContext.js';
import { TextAreaProvider } from './components/chat-app/components/text-area/TextAreaContext.js';

function App() {
  return (
    <ModelProvider>
      <TextAreaProvider>
        <ChatApp />
      </TextAreaProvider>
    </ModelProvider>
  );
}

export default App;
