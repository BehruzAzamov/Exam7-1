import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  orderTotal: 0,
  discount: 0,
  totalQuantity: 0,
};

const updateTotals = (items) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const orderTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  return { totalQuantity, orderTotal };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const { id, quantity, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload });
      }

      const { totalQuantity, orderTotal } = updateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.orderTotal = orderTotal;
    },
    itemMinus(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }

      const { totalQuantity, orderTotal } = updateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.orderTotal = orderTotal;
    },
    itemPlus(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        console.warn(`Item with id ${itemId} not found in the cart.`);
      }

      const { totalQuantity, orderTotal } = updateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.orderTotal = orderTotal;
    },
    applyDiscount(state, action) {
      const discount = action.payload;
      state.discount = discount;
      state.orderTotal = Math.max(0, state.orderTotal - discount);
    },
    resetCart(state) {
      return initialState;
    },
  },
});

export const { addItem, itemMinus, itemPlus, applyDiscount, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
