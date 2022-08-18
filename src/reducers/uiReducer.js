import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  modal: {
    open: false,
    id: null,
    title: "",
    type: null,
    item: null,
    section: null,
  },
  notification: {
    open: false,
    title: "",
    message: "",
    type: null,
  },
  request: false,
};

const uiSlice = createSlice({
  name: "[UI]",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    setRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export { uiSlice };

// Actions
export const { setLoading, setModal, setNotification, setRequest } =
  uiSlice.actions;

// Selector to access to the store
export const selectLoading = (state) => state.ui.loading;

export default uiSlice.reducer;
