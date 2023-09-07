import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useSelector } from "react-redux";
export const getLeadsContent = createAsyncThunk(
  "/leads/content",
  async ({ next, filter }) => {
    try {
      const fetchProducts = async (url) => {
        const response = await axios.get(url);
        return response?.data?.products;
      };

      if (filter.search) {
        const searchUrl = `${process.env.REACT_APP_API}products/search?q=${filter?.search}`;
        return fetchProducts(searchUrl);
      }

      if (filter.category) {
        const categoryUrl = `${process.env.REACT_APP_API}products/category/${filter.category}`;
        return fetchProducts(categoryUrl);
      }

      const regularUrl = `${process.env.REACT_APP_API}products?skip=${
        next.skip * next.limit
      }&limit=${next.limit}`;
      return fetchProducts(regularUrl);
    } catch (error) {
      console.error("Error fetching leads content:", error);
      throw error;
    }
  }
);

export const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    isLoading: false,
    leads: [],
    orders: [],
    filter: "",
  },
  reducers: {
    filter: (state, action) => {
      let { leadObj } = action.payload;
      state.filter = leadObj;
    },
    addNewBasket: (state, action) => {
      let { order } = action.payload;
      state.orders = order;
    },
    deleteLead: (state, action) => {
      let { index } = action.payload;
      state.leads.splice(index, 1);
    },
  },

  extraReducers: {
    [getLeadsContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getLeadsContent.fulfilled]: (state, action) => {
      state.leads = action.payload;
      state.isLoading = false;
    },
    [getLeadsContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { filter, deleteLead, addNewBasket } = leadsSlice.actions;

export default leadsSlice.reducer;
