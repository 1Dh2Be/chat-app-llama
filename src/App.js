import './App.css';
import ChatApp from './components/chat-app/ChatApp.jsx';
import { ModelProvider } from './components/chat-app/components/model-selection/ModelContext.js';

function App() {
  return (
    <ModelProvider>
      <ChatApp />
    </ModelProvider>
  );
}

export default App;
