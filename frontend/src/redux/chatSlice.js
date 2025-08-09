import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosConfig';

// Async thunks
export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/v1/chat/chats');
      return response.data.chats;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chats');
    }
  }
);

export const createChat = createAsyncThunk(
  'chat/createChat',
  async (applicationId, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/chat/chats', { applicationId });
      return response.data.chat;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create chat');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/v1/chat/chats/message', {
        chatId,
        content
      });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    currentChat: null,
    messages: [],
    loading: false,
    error: null,
    unreadCounts: {}
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    updateUnreadCount: (state, action) => {
      const { chatId, count } = action.payload;
      state.unreadCounts[chatId] = count;
    },
    markChatAsRead: (state, action) => {
      const chatId = action.payload;
      state.unreadCounts[chatId] = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create chat
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = action.payload;
        // Add to chats list if not already present
        const existingChat = state.chats.find(chat => chat._id === action.payload._id);
        if (!existingChat) {
          state.chats.unshift(action.payload);
        }
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { 
  setCurrentChat, 
  addMessage, 
  clearMessages, 
  updateUnreadCount, 
  markChatAsRead 
} = chatSlice.actions;

export default chatSlice.reducer;
