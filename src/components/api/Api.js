import LlamaAI from 'llamaai';
// import dotenv from 'dotenv';

// dotenv.config();

// const apiToken = process.env.REACT_APP_LLAMA_API_KEY;

const apiToken = 'LA-16f849de004346bcaa13b1738aca6e9d4ebec823f5104ab890420f4757fa17e8'

async function askMe(ask) {
  try {
    const llama = new LlamaAI(apiToken);

    const response = await llama.run({
      messages: [
        {
          role: 'user',
          content: ask
        }
      ],
      model: 'llama3.2-1b',
      max_tokens: 1000,
      temperature: 0.7
    });

    const message = response.choices[0].message.content;
    return message;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default askMe

// Call the function to get a response
// askMe('How you doing ?')
//   .then((joke) => {
//     console.log('Response:', joke);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });