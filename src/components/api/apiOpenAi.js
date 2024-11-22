import OpenAI from "openai";
import { API_KEY } from "./apiKey.js"

const openAiClient = new OpenAI({
    apiKey: API_KEY,
    baseURL: "https://api.llama-api.com",
    dangerouslyAllowBrowser: true
})

async function askMeOpenAi(ask, messageHistory, onUpdate, selectedModel) {

    let fullResponse = '';

    const systemPrompt = {
        role: 'system',
        content: `You are a helpful AI assistant. Present your responses in a clear, readable format using markdown with proper spacing and structure.

Format your responses following these guidelines:

1. Main Title
   - Use a single # for the main title
   - Add a brief introduction paragraph below the title
   - Leave a blank line after the introduction

2. Section Headers
   - Use ## for main sections
   - Use ### for subsections
   - Always add a blank line before and after headers

3. Lists and Content
   - Use bullet points (•) for general lists
   - Use numbered lists (1.) for sequential steps
   - Add proper indentation for nested lists
   - Leave a blank line between list items for better readability
   - Limit line length to improve readability

4. Code Blocks
   \`\`\`language
   // Always include language identifier
   // Use proper indentation
   // Add descriptive comments
   \`\`\`

5. Emphasis and Formatting
   - Use **bold** for important terms
   - Use *italics* for emphasis
   - Use > for important notes or callouts
   - Add blank lines around callouts and emphasized content

6. Structure Example:

Brief introduction paragraph explaining the topic.

## First Section

Main section content with proper spacing.

### Subsection

- First item with detailed explanation
  - Sub-item with additional details
  - Another sub-item

- Second item with detailed explanation

> Important Note: Key information that needs attention

## Next Section

Continue with consistent formatting...

Remember to:
- Maintain consistent spacing throughout
- Use clear hierarchical structure
- Keep paragraphs concise
- Add visual breaks between sections
- Ensure proper markdown syntax`
    }

    const messages = [
        systemPrompt,
        ...messageHistory,
        { role: 'user', content: ask }
    ]

    const stream = await openAiClient.chat.completions.create({
        model: selectedModel,
        messages: messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
        presence_penalty: 0.6,
        frequency_penalty: 0.5,
    });

    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        if (onUpdate) onUpdate(fullResponse);
    }

    return fullResponse;
}

export default askMeOpenAi