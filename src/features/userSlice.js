import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../service/httpMethods";

const fetchUserData = createAsyncThunk(
  "user/userData",
  async ({ handleUnauthorized }) => {
    return await Post("user/profile", {}, null, handleUnauthorized);
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
    editInfo: (state, action) => {
      const { firstName, lastName } = action.payload ||{};
      state.data = {
        ...state.data,
        firstName,
        lastName,
      };
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetStore: (state) => {
      state.token="";
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
      });
  },
});

export const { resetStore, setToken, editInfo } = userSlice.actions;
export { fetchUserData };
export default userSlice.reducer;
