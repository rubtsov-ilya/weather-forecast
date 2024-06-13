import { FC, useRef } from "react";
import styles from "./FirstCartSection.module.scss";
import Form from "./form/Form";
import Cart from "./cart/Cart";
import { useGetUserStateQuery } from "../../../../redux/index";
import useBodyLock from "../../../../hooks/useBodyLock";
import useAuth from "../../../../hooks/useAuth";

const FirstCartSection: FC = () => {
  const { uMockid } = useAuth()
  const btnRef = useRef<HTMLButtonElement>(null)
  const { isBodyLock, lockPaddingValue } = useBodyLock()
  
  const { data: userData = null, isError: isErrorUserData, isLoading: isLoadingUserData } = useGetUserStateQuery({ uMockid: uMockid! }, { skip: uMockid === null })
  const cart = userData ? userData.cart : []
  const orders = userData ? userData.orders : []
  const deliveryPrice = 3.5

  const sumOrder = Number(cart.reduce((acc, item): number => {
    const price = parseFloat(item.price.replace(",", "."))
    const count = item.count
    return acc + (price * count)
  }, 0).toFixed(2))

  const totalSumOrder = sumOrder + deliveryPrice

  const doFormSubmit = (): void => { 
    btnRef.current?.click()
  }

  return (
    <section style={ isBodyLock ? { paddingRight: `${lockPaddingValue}px` } : {}} className={styles["first-section"]}>
      <div className="container">
        <div className={styles["first-section__content"]}>
          <Form orders={orders} totalSumOrder={totalSumOrder} cart={cart} btnRef={btnRef} />
          <Cart totalSumOrder={totalSumOrder} sumOrder={sumOrder} deliveryPrice={deliveryPrice} cart={cart} isLoadingCart={isLoadingUserData} isErrorCart={isErrorUserData} doFormSubmit={doFormSubmit} />
        </div>
      </div>
    </section>
  );
}

export default FirstCartSection