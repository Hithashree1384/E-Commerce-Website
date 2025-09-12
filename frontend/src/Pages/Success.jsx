import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext"; // adjust path

const Success = () => {
  const { clearCart } = useContext(ShopContext);

  useEffect(() => {
    clearCart(); // ✅ clear immediately after success
  }, [clearCart]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your order. Your payment has been processed.</p>
      <hr style={{ marginTop: "40px", marginBottom: "20px" }} />
    </div>
  );
};

export default Success;
