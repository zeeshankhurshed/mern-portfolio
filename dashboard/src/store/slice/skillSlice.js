import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllSkillsRequest(state) {
      state.skills = [];
      state.loading = true;
      state.error = null;
    },
    getAllSkillsSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllSkillsFailed(state, action) {
      state.skills = state.skills;
      state.loading = false;
      state.error = action.payload;
    },
    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },
    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },
    updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateSkillFailed(state, action) {
        state.loading = false;
        state.error = action.payload;
        state.message = null;
    },
    resetSkillSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
      state.skills = state.skills;
    },
    clearAllError(state) {
      state.error = null;
      state.skills = state.skills;
    },
  },
});

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/vi/skill/getAll",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllError());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillsFailed(error.response.data.message));
  }
};

export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/vi/skill/add",
      data,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );
    dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllError());
    } catch (error) {
       // Typo fixed: 'addNewwSkillFailed' to 'addNewSkillFailed'
dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));

    }
};

export const deleteSkill = (id) => async (dispatch) => {
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
      await axios.delete(`http://localhost:4000/api/vi/skill/delete/${id}`, { withCredentials: true });
      dispatch(skillSlice.actions.deleteSkillSuccess("Skills deleted Successfully"));
      dispatch(skillSlice.actions.clearAllError());
    } catch (error) {
      dispatch(skillSlice.actions.deleteSkillFailed(error.response?.data?.message || error.message));
    }
  };
  

  export const updateSkill = (id, proficiency) => async (dispatch) => {
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/vi/skill/update/${id}`, // Corrected API version
        { proficiency },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      dispatch(skillSlice.actions.updateSkillSuccess(data.message));
      dispatch(skillSlice.actions.clearAllError());
    } catch (error) {
      dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
    }
  };
export const clearAllSkillSliceErrors=()=>async(dispatch)=>{
    dispatch(skillSlice.actions.clearAllError())
};
export const resetSkillSlice=()=>async(dispatch)=>{
    dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;