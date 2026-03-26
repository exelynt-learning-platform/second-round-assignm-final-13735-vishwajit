import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const fetchAIResponse = async (messages) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message;
  } catch (error) {
    console.error("API ERROR:", error.response?.data);
    throw error;
  }
};