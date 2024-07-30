import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyDiscount } from "../features/cart/cartSlice";

const CartTotal = () => {
  const { items, orderTotal, discount } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");

  const cartTotal = items.reduce((total, item) => total + item.quantity, 0);
  const discountedTotal = orderTotal - discount;

  const handleApplyPromoCode = () => {
    const discountAmount = promoCode === "BAO" ? orderTotal % 10 : 0;
    dispatch(applyDiscount(discountAmount));
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <div className="flex flex-col items-center text-sm my-4 pb-2">
          <label className="text-xl">Promocode:</label>
          <input
            type="text"
            value={promoCode}
            placeholder="BAO"
            onChange={(e) => setPromoCode(e.target.value)}
            className="outline-none bg-base-300 rounded-md p-3 w-full mb-4"
          />
          <button onClick={handleApplyPromoCode} className="btn w-full btn-primary">
            Apply
          </button>
        </div>
        <div className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span className="text-xl">Total orders:</span>
          <span className="text-xl font-medium">{cartTotal}</span>
        </div>
        <div className="flex justify-between text-sm mt-4 pb-2">
          <span className="text-xl">Order Total:</span>
          <span className="text-xl font-medium">{discountedTotal}.00$</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
