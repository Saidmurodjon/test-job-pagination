import { configureStore } from "@reduxjs/toolkit";
import leadSlice from "../features/leads/leadSlice";
const combinedReducer = {
  leads: leadSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
