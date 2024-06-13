import { FC } from "react";
import styles from "./CartPrices.module.sass";

interface CartPricesProps {
  sumOrder: number
  deliveryPrice: number
  totalSumOrder: number
  currency: string
}

const OrderPrices: FC<CartPricesProps> = ({ currency, sumOrder, deliveryPrice, totalSumOrder }) => {
  return (
    <div className={styles["cart-prices"]}>
      {/* total cart products */}
      <div className={styles["cart-prices__wrapper"]}>
        <p className={styles["cart-prices__text"]}>Total de itens</p>
        <p className={styles["cart-prices__price"]}>{currency} {sumOrder.toFixed(2).replace(/\./, ',')}</p>
      </div>
      {/* delivery */}
      <div className={styles["cart-prices__wrapper"]}>
        <p className={styles["cart-prices__text"]}>Entrega</p>
        <p className={styles["cart-prices__price"]}>{currency} {deliveryPrice.toFixed(2).replace(/\./, ',')}</p>
      </div>
      {/* total order */}
      <div className={styles["cart-prices__wrapper"]}>
        <h5 className={styles["cart-prices__total-text"]}>Total</h5>
        <p className={styles["cart-prices__total-price"]}>{currency} {totalSumOrder.toFixed(2).replace(/\./, ',')}</p>
      </div>
    </div>
  );
}
export default OrderPrices