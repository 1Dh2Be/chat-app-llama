import OpenAI from "openai";
import { API_KEY } from "./apiKey.js"

const openAiClient = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.llama-api.com",
    dangerouslyAllowBrowser: true
});

async function askMeOpenAi(ask, messageHistory, onUpdate, selectedModel) {
    try {
        const systemPrompt = {
            role: 'system',
            content: `You are Nexus, an advanced AI assistant powered by state-of-the-art language models. Your responses should be:

            1. Accurate and well-researched
            2. Clear and concise, yet comprehensive
            3. Structured with appropriate formatting when needed
            4. Professional but conversational in tone
            5. Helpful in providing practical solutions and examples
            6. Honest about limitations and uncertainties

            When appropriate:
            - Use markdown formatting for better readability
            - Break down complex topics into digestible parts
            - Provide examples to illustrate concepts
            - Include relevant code snippets if technical
            - Ask clarifying questions if the request is ambiguous

            Always prioritize providing accurate, helpful, and actionable information while maintaining a natural conversational flow.`
        };

        const messages = [
            systemPrompt,
            ...messageHistory,
            { role: 'user', content: ask }
        ];

        // Single streaming request
        const stream = await openAiClient.chat.completions.create({
            model: selectedModel,
            messages: messages,
            stream: true,
            temperature: 0.7,
            max_tokens: 2048,
            presence_penalty: 0.3,
            frequency_penalty: 0.3,
            top_p: 0.9,
            stop: null,
        });

        let formattedContent = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            formattedContent += content;
            if (onUpdate) onUpdate(formattedContent);
        }

        return formattedContent;

    } catch (error) {
        console.error('Error in askMeOpenAi:', error);
        if (error.response) {
            throw new Error(`API Error: ${error.response.data.error.message}`);
        } else if (error.request) {
            throw new Error('Network Error: No response received');
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
}

export default askMeOpenAi;