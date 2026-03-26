import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAIResponse } from "./chatAPI";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (userMessage, { getState, rejectWithValue }) => {
    try {
      const { messages } = getState().chat;

      const updatedMessages = [
        ...messages,
        { role: "user", content: userMessage },
      ];

      const aiResponse = await fetchAIResponse(updatedMessages);

      return {
        user: userMessage,
        ai: aiResponse.content,
      };
    } catch (error) {
      return rejectWithValue("API ERROR");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          role: "user",
          content: action.payload.user,
        });

        state.messages.push({
          role: "assistant",
          content: action.payload.ai,
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chatSlice.reducer;
