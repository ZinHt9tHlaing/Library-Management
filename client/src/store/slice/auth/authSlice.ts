import { IUser, LoginUserPayload } from "@/types/UserType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthSliceState {
  loggedInUser: IUser | undefined;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
}

const initialState: AuthSliceState = {
  loggedInUser: undefined,
  registerSuccess: false,
  loading: false,
  error: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        user
      );
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Pending logic
    builder.addCase(loginUser.pending, (state, action) => {
      state = {
        ...state,
        loading: true,
        error: false,
      };
      return state;
    });

    // Fulfilled logic
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = {
        ...state,
        loading: false,
        loggedInUser: action.payload,
      };
      return state;
    });

    // Rejected logic
    builder.addCase(loginUser.rejected, (state, action) => {
      state = {
        ...state,
        loading: false,
        error: true,
      };
      return state;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
