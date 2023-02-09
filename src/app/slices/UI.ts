import { createSlice } from '@reduxjs/toolkit'

const initialState: {} = {}

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export const UIAction = UISlice.actions

export const UIReducer = UISlice.reducer
