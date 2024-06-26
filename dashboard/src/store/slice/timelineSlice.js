import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null, // Added to store success messages
  },
  reducers: {
    getAllTimelineRequest(state) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    deleteTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    addTimelineRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    addTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetTimelineSlice(state) {
      state.error = null;
      state.timeline = state.timeline;
      state.loading = false;
      state.message = null; // Reset message on slice reset
    },
    clearAllErrors(state) {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

export const {
  getAllTimelineRequest,
  getAllTimelineSuccess,
  getAllTimelineFailed,
  deleteTimelineRequest,
  deleteTimelineSuccess,
  deleteTimelineFailed,
  addTimelineRequest,
  addTimelineSuccess,
  addTimelineFailed,
  resetTimelineSlice,
  clearAllErrors
} = timelineSlice.actions;

export const getAllTimeline = () => async (dispatch) => {
  dispatch(getAllTimelineRequest());
  try {
    const response = await axios.get("http://localhost:4000/api/vi/timeline/getAll", { withCredentials: true });
    dispatch(getAllTimelineSuccess(response.data.timeline));
  } catch (error) {
    dispatch(getAllTimelineFailed(error.response?.data?.message || error.message));
  }
};

export const addTimeline = (timelineData) => async (dispatch) => {
  dispatch(addTimelineRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/vi/timeline/add",
      timelineData,
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );
    dispatch(addTimelineSuccess(data.message));
  } catch (error) {
    dispatch(addTimelineFailed(error.response?.data?.message || error.message));
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(deleteTimelineRequest());
  try {
    await axios.delete(`http://localhost:4000/api/vi/timeline/delete/${id}`, { withCredentials: true });
    dispatch(deleteTimelineSuccess('Timeline deleted successfully'));
    dispatch(clearAllErrors());
  } catch (error) {
    dispatch(deleteTimelineFailed(error.response?.data?.message || error.message));
  }
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export const resettimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export default timelineSlice.reducer;
