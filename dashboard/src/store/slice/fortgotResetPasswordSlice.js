import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 

const forgotResetPassSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
    }
  }
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/vi/user/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );
    dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotResetPassSlice.actions.forgotPasswordFailure(error.response.data.message));
  }
};

export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/vi/user/password/reset/${token}`,
      { password, confirmPassword },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );
    dispatch(forgotResetPassSlice.actions.resetPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotResetPassSlice.actions.resetPasswordFailure(error.response.data.message));
  }
};

export const clearAllForgotPasswordErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;
//6:40