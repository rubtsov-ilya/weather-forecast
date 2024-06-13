import { FC } from "react";
import FirstCartSection from "./first-cart-section/FirstCartSection.tsx";
import useAuth from "../../../hooks/useAuth.ts";
import { Navigate } from "react-router-dom";

const ProductsCartPage: FC = () => {
  const { isAuth } = useAuth()
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return (
    <main>
      <FirstCartSection />
    </main>
  )
}

export default ProductsCartPage