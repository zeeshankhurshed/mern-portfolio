import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
    message: null,
    // singleProject: {}
  },
  reducers: {
    getAllProjectsRequest(state) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    addNewProjectFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteProjectFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.message = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProjectFailed(state, action) {
      state.message = null;
      state.loading = false;
      state.error = action.payload;
    },
    resetProjectSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  }
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/vi/project/getAll", { withCredentials: true });
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.getAllProjectsFailed(error.response.data.message));
  }
};

export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const response = await axios.post("http://localhost:4000/api/vi/project/add", data, {
      withCredentials: true,
      headers: { "Content-Type": "application/form-data" },
    });
    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.addNewProjectFailed(error.response.data.message));
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/vi/project/delete/${id}`, { withCredentials: true });
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.deleteProjectFailed(error.response.data.message));
  }
};

export const updateProject = (id, newData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(`http://localhost:4000/api/vi/project/update/${id}`, newData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(projectSlice.actions.updateProjectFailed(error.response.data.message));
  }
};

export const clearAllProjectSliceErrors=()=>(dispatch)=>{
    dispatch(projectSlice.actions.clearAllErrors());
}

export const resetProjectSlice=()=>(dispatch)=>{
dispatch(projectSlice.actions.resetProjectSlice());
}
export default projectSlice.reducer;
