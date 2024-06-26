import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "application",
  initialState: {
    softwareApplications: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    getAllSoftwareApplicationsRequest(state) {
      state.softwareApplications = [];
      state.loading = true;
      state.error = null;
    },
    getAllSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSoftwareApplicationsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addNewSoftwareRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/vi/softwareApplication/getAll", { withCredentials: true });
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(data.application));
    dispatch(softwareApplicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(error.response.data.message));
  }
};

export const addNewSoftwareApplication = (data) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.addNewSoftwareRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/vi/softwareApplication/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(softwareApplicationSlice.actions.addNewSoftwareSuccess(response.data.message));
    dispatch(softwareApplicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(softwareApplicationSlice.actions.addNewSoftwareFailed(error.response.data.message));
  }
};

export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.deleteApplicationRequest());
  try {
    await axios.delete(`http://localhost:4000/api/vi/softwareApplication/delete/${id}`, { withCredentials: true });
    dispatch(softwareApplicationSlice.actions.deleteApplicationSuccess('Sofware Deleted Successfully'));
    dispatch(softwareApplicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(softwareApplicationSlice.actions.deleteApplicationFailed(error.response?.data?.message || error.message));
  }
};

export const clearAllApplicationSliceErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllError());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetApplicationSlice());
};

export default softwareApplicationSlice.reducer;
