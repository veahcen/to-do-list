import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

interface IUserState {
  user:  {};
  isAuthChecked: boolean;
  error: boolean;
}

export const initialState: IUserState = {
  user: {},
  isAuthChecked: false,
  error: false
};

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async ({ username }: { username: string}) => {
        const {request} = useHttp();
        
          return await request(`http://localhost:3001/users?name=${username}`);
        
    }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    exit: (state) => {
      state.isAuthChecked = false;
      state.user = {};
      localStorage.removeItem('user');
    },
    setAuth: (state, action) => {
      state.error = false;
      state.user = action.payload;
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, state => {state.error = false; state.isAuthChecked = false;})
      .addCase(fetchUser.fulfilled, (state, action) => {
        if(action.payload !== undefined) {
          state.error = false;
          state.user = action.payload;
          state.isAuthChecked = true;
          localStorage.setItem('user', JSON.stringify(action.payload));}
      })
      .addCase(fetchUser.rejected, state => {
        state.error = true;
        state.isAuthChecked = false;
        state.user = {};
    })
  }
});

export const {
  exit,
  setAuth
} = authSlice.actions;