import LlamaAI from 'llamaai';

const apiToken = 'LA-16f849de004346bcaa13b1738aca6e9d4ebec823f5104ab890420f4757fa17e8'

let conversationHistory = [];

async function askMe(ask) {
  try {
    const llama = new LlamaAI(apiToken);

    // Add the user's message to the conversation history
    conversationHistory.push({
      role: 'user',
      content: ask
    });

    const response = await llama.run({
      messages: conversationHistory,
      model: 'llama3.2-11b-vision',
      max_tokens: 1000,
      temperature: 0.7,
    });

    const message = response.choices[0].message.content;

    // Add the assistant's response to the conversation history
    conversationHistory.push({
      role: 'assistant',
      content: message
    });

    return message;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default askMe;