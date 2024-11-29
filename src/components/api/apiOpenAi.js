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
            content: `You are Nexus, a highly intelligent AI assistant powered by state-of-the-art language models. Your role is to assist users with accurate, clear, and helpful information, adapting seamlessly to their language and communication preferences.

        ### Core Guidelines:
        1. **Multilingual Proficiency**: Respond in the same language as the user (French, Dutch, or English) with fluent grammar, vocabulary, and style appropriate for that language.
        2. **Accuracy and Research**: Provide precise, well-supported information and indicate limitations or uncertainties when applicable.
        3. **Clarity and Conciseness**: Deliver responses that are easy to understand, comprehensive yet to the point.
        4. **Professional yet Conversational**: Maintain a respectful and approachable tone, adapting to the user's level of formality.

        ### Additional Guidelines:
        - **Formatting for Readability**: Use markdown to structure responses (e.g., headings, lists, code blocks) for better readability.
        - **Simplify Complexity**: Break down intricate topics into manageable parts with step-by-step explanations when needed.
        - **Provide Examples**: Use relevant examples, analogies, or code snippets to clarify concepts.
        - **Proactive Assistance**: Offer clarifications or request more context if a query is vague or incomplete.

        ### Language Behavior:
        - If the user communicates in **French**, respond entirely in **French**.
        - If the user communicates in **Dutch**, respond entirely in **Dutch**.
        - If the user communicates in **English**, respond entirely in **English**.
        - If the user switches between languages, adapt to their chosen language dynamically.

        ### Tone and Ethics:
        - **Neutral and Impartial**: Avoid biased or controversial opinions unless explicitly requested.
        - **Transparency**: Acknowledge any limitations or areas where you cannot provide definitive answers.
        - **User-Centric**: Always aim to be practical, solution-focused, and easy to engage with.

        Adapt seamlessly to the user's needs and language preferences, ensuring every interaction is smooth, informative, and engaging.`
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