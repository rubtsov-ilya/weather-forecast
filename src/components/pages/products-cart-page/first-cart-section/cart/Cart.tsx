import { FC, useState } from 'react'
import ConfirmationBtn from '../../../../ui/confirmation-btn/ConfirmationBtn'
import EmptyCartBtn from '../../../../ui/empty-cart-btn/EmptyCartBtn'
import CartCard from '../../../../ui/cart-card/CartCard'
import CartPrices from '../cart-prices/CartPrices'
import styles from './Cart.module.sass'
import PolicyModal from '../../../../ui/policy-modal/PolicyModal';
import useBodyLock from '../../../../../hooks/useBodyLock'

interface CartProps {
  cart: IShopApiDataItem[];
  doFormSubmit: () => void
  isErrorCart: boolean
  isLoadingCart: boolean
  deliveryPrice: number
  sumOrder: number;
  totalSumOrder: number;
}

const Cart: FC<CartProps> = ({ cart, doFormSubmit, isErrorCart, isLoadingCart, deliveryPrice, sumOrder, totalSumOrder }) => {

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState<boolean>(false)
  const { toggleBodyLock } = useBodyLock()
  const handleModalLinkClick = (): void => { 
    setIsPolicyModalOpen((prev) => !prev)
    toggleBodyLock()
  }


  return (
    <div className={styles["cart"]}>
      <h4 className={styles["cart__title"]}>Cafés selecionados</h4>
      <div className={styles["cart__wrapper"]}>
        {/* loading states */}
        {isErrorCart && cart.length === 0 && (<p className={styles["cart__loading-state"]}>Error</p>)}
        {isLoadingCart && (<p className={styles["cart__loading-state"]}>Loading</p>)}
        {!isLoadingCart && !isErrorCart && cart.length === 0 && (<p className={styles["cart__loading-state"]}>Nenhum produto</p>)}
        
        {/* cart items */}
        {cart.map((cartItem) => {
            return (<CartCard cart={cart} key={cartItem.id} cartItem={cartItem} />)
        })}

        {/* delivery and order price */}
        {!isLoadingCart && cart.length !== 0 && (<CartPrices currency={cart[0].currency} totalSumOrder={totalSumOrder} sumOrder={sumOrder} deliveryPrice={deliveryPrice} />)}

        {/* buttons */}
        {cart.length === 0 && (<EmptyCartBtn />)}
        {cart.length !== 0 && (<ConfirmationBtn doFormSubmit={doFormSubmit} />)}

        <p className={styles["cart__policy-text"]} onClick={handleModalLinkClick}>Política de Privacidade para Pedido</p>

        <PolicyModal isOpen={isPolicyModalOpen} setIsOpen={setIsPolicyModalOpen}/>
        
      </div>
    </div>
  )
}

export default Cart