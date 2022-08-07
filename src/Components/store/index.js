import { configureStore } from "@reduxjs/toolkit";
import ToursSlice from "./Tours/Tours";

const store = configureStore({reducer: {
    Tours: ToursSlice
}})
export default store;