import { createSlice } from '@reduxjs/toolkit';
import { User } from './User.model';

const initialState: User = {
  token: localStorage.getItem("token")
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});