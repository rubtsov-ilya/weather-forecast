/// <reference types="vite-plugin-svgr/client" />

import styles from './FormSecondWrapper.module.sass';
import CartDollar from '../../../../../assets/images/cart-page-icons/dollar.svg?react';
import PaymentBtn from '../../../../ui/payment-btn/PaymentBtn';
import CreditSvg from '../../../../../assets/images/cart-page-icons/credit-card.svg?react';
import DebitSvg from '../../../../../assets/images/cart-page-icons/debit-card.svg?react';
import CashSvg from '../../../../../assets/images/cart-page-icons/cash.svg?react';
import { UseFormRegister } from 'react-hook-form';
import { FC, useRef, useState } from 'react';
import { IFormValues } from '../../../../../interfaces/FormValues.interface';
import { UseFormSetValue } from 'react-hook-form';

type ActiveStatusType = 'credit' | 'debit' | 'cash'

interface FormSecondWrapperProps {
  register: UseFormRegister<IFormValues>;
  errors: any;
  setValue:  UseFormSetValue<IFormValues>;
}

const FormSecondWrapper: FC<FormSecondWrapperProps> = ({ register, errors, setValue }) => {
  const [activeStatus, setActiveStatus] = useState<ActiveStatusType | null>(null)
  const paymentCreditRef = useRef<HTMLInputElement>(null)
  const paymentDebitRef = useRef<HTMLInputElement>(null)
  const paymentCashRef = useRef<HTMLInputElement>(null)

  const doRadioChecked = (option: ActiveStatusType): void => { 
    setActiveStatus(option)
    if (option === 'credit') {
      if (paymentCreditRef.current) {
        paymentCreditRef.current.checked = true
        setValue('payment', 'Cartão de crédito');
      }
    } else if (option === 'debit') {
      if (paymentDebitRef.current) {
        paymentDebitRef.current.checked = true
        setValue('payment', 'Cartão de débito');
      }
    } else if (option === 'cash') {
      if (paymentCashRef.current) {
        paymentCashRef.current.checked = true
        setValue('payment', 'Dinheiro');
      }
    }
  }
  return (
    <div className={styles["second-wrapper"]}>
      <div className={styles["second-wrapper__title-wrapper"]}>
        <CartDollar
          width="22"
          height="22"
          className={styles["second-wrapper__dollar-icon"]}
        />
        <div>
          <h3 className={styles["second-wrapper__title"]}>Pagamento</h3>
          <p className={styles["second-wrapper__subtitle"]}>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
        </div>
      </div>
      <div className={styles["second-wrapper__payment-wrapper"]}>
        <PaymentBtn  isActive={activeStatus === 'credit'} onClick={() => doRadioChecked('credit')} Logo={CreditSvg}>Cartão de crédito</PaymentBtn>
        <PaymentBtn  isActive={activeStatus === 'debit'} onClick={() => doRadioChecked('debit')} Logo={DebitSvg}>Cartão de débito</PaymentBtn>
        <PaymentBtn  isActive={activeStatus === 'cash'} onClick={() => doRadioChecked('cash')} Logo={CashSvg}>dinheiro</PaymentBtn>
        <input {...register("payment", {required: true})} className={styles["second-wrapper__input-radio"]} type="radio" ref={paymentCreditRef} name='payment' value="Cartão de crédito"/>
        <input {...register("payment", {})} className={styles["second-wrapper__input-radio"]} type="radio" ref={paymentDebitRef} name='payment' value="Cartão de débito"/>
        <input {...register("payment", {})} className={styles["second-wrapper__input-radio"]} type="radio" ref={paymentCashRef} name='payment' value="Dinheiro"/>
        { errors.payment && <label className={styles["second-wrapper__label-radio"]} htmlFor="payment">Campo obrigatório</label>}
      </div>
    </div>
  )
}

export default FormSecondWrapper