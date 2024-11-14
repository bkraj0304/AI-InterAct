const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const api_key = process.env.REACT_APP_GEMINI_API_KEY;
const apikey ="AIzaSyA7_meqqj7kc2Si0DDDo-X4q3xOd0xKM8A";

const genAI = new GoogleGenerativeAI(apikey);
console.log(genAI);
async function gemini_model_call(user_message) {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello, I have 2 dogs in my house." }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

//   const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(user_message);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}


module.exports = {gemini_model_call};
