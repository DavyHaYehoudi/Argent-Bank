import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, Put } from "../service/httpMethods";

const fetchUserData = createAsyncThunk(
  "user/userData",
  async ({ handleUnauthorized }) => {
    return await Post("user/profile", {}, null, handleUnauthorized);
  }
);
const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ formData, handleUnauthorized }) => {
    return await Put("user/profile", formData, null, handleUnauthorized);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    token: "",
    status: "idle",
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetStore: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.data = action.payload.body;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { firstName, lastName } = action.payload.body;
        state.data = {
          ...state.data,
          firstName,
          lastName,
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStore, setToken } = userSlice.actions;
export { fetchUserData, updateUserProfile };
export default userSlice.reducer;
