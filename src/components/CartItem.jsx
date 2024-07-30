import React from "react";
import { FaClock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { itemPlus, itemMinus } from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(itemPlus(item.id));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(itemMinus(item.id));
    } else {
      dispatch(itemMinus(item.id));
    }
  };

  return (
    <li className="flex flex-col items-center shadow-xl p-3 rounded-lg justify-between">
      <img
        className="rounded-full max-w-[300px] max-h-[300px] mb-2"
        src={item.image}
        alt={item.title}
      />
      <div className="flex flex-col gap-7">
        <p className="lg:text-xl text-lg text-center">{item.title}</p>
        <div className="flex items-center gap-5">
          <button className="btn text-2xl" onClick={handleDecrement}>
            -
          </button>
          <span className="btn text-lg font-semibold">{item.quantity}</span>
          <button className="btn text-2xl" onClick={handleIncrement}>
            +
          </button>
        </div>
        <p className="flex items-center justify-center gap-3 text-center">
          <FaClock />
          {item.cookingTime} minutes
        </p>
      </div>
    </li>
  );
};

export default CartItem;