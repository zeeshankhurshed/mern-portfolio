import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null, // Added to store success messages
  },
  reducers: {
    getAllMessagesRequest(state) {
      state.messages = [];
      state.error = null;
      state.loading = true;
      state.message = null;
    },
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllMessagesFailed(state, action) {
      state.messages = [];
      state.error = action.payload;
      state.loading = false;
    },
    deleteMessageRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteMessageSuccess(state, action) {
      state.messages = state.messages.filter((msg) => msg._id !== action.payload); // Corrected to filter by _id
      state.error = null;
      state.loading = false;
      state.message = "Message deleted successfully"; // Set a success message
    },
    deleteMessageFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetMessageSlice(state) {
      state.error = null;
      state.messages = [];
      state.loading = false;
      state.message = null; // Reset message on slice reset
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const response = await axios.get(
      "http://localhost:4000/api/vi/message/getAll",
      { withCredentials: true }
    );
    // console.log("API Response:", response.data);
    dispatch(messageSlice.actions.getAllMessagesSuccess(response.data.message));
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    dispatch(messageSlice.actions.getAllMessagesFailed(error.response?.data?.message || error.message));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    await axios.delete(`http://localhost:4000/api/vi/message/delete/${id}`, { withCredentials: true });
    dispatch(messageSlice.actions.deleteMessageSuccess(id));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(messageSlice.actions.deleteMessageFailed(error.response?.data?.message || error.message));
  }
};

export const clearAllMessagesErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
