import styles from './Form.module.sass'
import FormFirstWrapper from '../form-first-wrapper/FormFirstWrapper'
import FormSecondWrapper from '../form-second-wrapper/FormSecondWrapper'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { FC, RefObject, useEffect } from 'react'
import { IFormValues } from '../../../../../interfaces/FormValues.interface'
import useServerError from '../../../../../hooks/useServerError'
import useAuth from '../../../../../hooks/useAuth'
import { usePutCartMutation, usePutOrdersMutation } from '../../../../../redux'
import { IValueServerError } from '../../../../../interfaces/ServerErrorValue.interface'

interface FormProps {
  cart: IShopApiDataItem[];
  btnRef: RefObject<HTMLButtonElement>;
  totalSumOrder: number;
  orders: IOrder[]
}

const Form: FC<FormProps> = ({ cart, btnRef, totalSumOrder, orders }) => {
const {uMockid} = useAuth()
const [putCart, {isLoading: isPutCartLoading, isError: isPutCartError}] = usePutCartMutation()
const [putOrders, {isError: isPutOrdersError}] = usePutOrdersMutation()
const {isTooManyRequestsError, setServerError}: IValueServerError = useServerError()
  const navigate = useNavigate();

  useEffect(() => {
    if (isPutCartError || isPutOrdersError) {
      setServerError();
    }
  }, [isPutCartError, isPutOrdersError])

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
    setValue,
    reset,
  } = useForm<IFormValues>({
    mode: "onSubmit"
  })

  const handleFormSubmit: SubmitHandler<IFormValues> = async (data): Promise<void> => {  
    const fullOrderData = {formInfo: data, order: cart}

    if (uMockid && !isPutCartLoading) {
      if (isTooManyRequestsError) {
        console.log('error from server to clearing cart')
        return
      }
      const NewOrder: IOrder = {
        fullСreationDate: new Date().toLocaleString(),
        order: cart,
        orderPrice: totalSumOrder
      }
      const newOrdersArray = [...orders, NewOrder]
      await putOrders({newOrdersArray: newOrdersArray, uMockid: uMockid}).unwrap()
      const newCartArray: [] = [];
      await putCart({newCartArray: newCartArray, uMockid: uMockid}).unwrap()
    }
    reset()
    navigate('/delivery', { state: fullOrderData });
   }

  return (
    <div className={styles["form-wrapper"]}>
      <h1 className={styles["form-wrapper__title"]}>Complete seu pedido</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles["form"]}>
        <FormFirstWrapper register={register} errors={errors}/>
        <FormSecondWrapper setValue={setValue} register={register} errors={errors}/>
        <button ref={btnRef} className={styles["form__sub-btn"]} type="submit"></button>
      </form>
    </div>
  )
}

export default Form