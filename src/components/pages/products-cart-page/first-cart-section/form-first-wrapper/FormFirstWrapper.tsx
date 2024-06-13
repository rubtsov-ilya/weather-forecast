import styles from "./FormFirstWrapper.module.sass";
import CartPoint from "../../../../../assets/images/cart-page-icons/point.svg?react";
import { FC } from "react";
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from "../../../../../interfaces/FormValues.interface";

interface FormFirstWrapperProps {
  register: UseFormRegister<IFormValues>;
  errors: any;
}

const FormFirstWrapper: FC<FormFirstWrapperProps> = ({ register, errors }) => {
  return (
    <div className={styles["first-wrapper"]}>
      <div className={styles["first-wrapper__title-wrapper"]}>
        <CartPoint
          width="22"
          height="22"
          className={styles["first-wrapper__point-icon"]}
        />
        <div>
          <h2 className={styles["first-wrapper__title"]}>
            Endereço de Entrega
          </h2>
          <p className={styles["first-wrapper__subtitle"]}>
            Informe o endereço onde deseja receber seu pedido
          </p>
        </div>
      </div>
    
      <div className={styles["first-wrapper__grid"]}>
        { errors.phone && errors.phone.type === "minLength" && <label className={styles["label__phone-error"]} htmlFor="phone">{errors.phone.message}</label>}
        <input
          {...register("phone", {
            required: true,
            minLength: {
              value: 11,
              message: "Сomprimento mínimo 11 caracteres"
            },
          })}
          className={ errors.phone ? `${styles["input__tel"]} ${styles["input__error"]}` : `${styles["input__tel"]}`}
          type="number"
          placeholder="Número de telefone"
        />
        <input
          {...register("rua", {
            required: true,
          })}
          className={ errors.rua ? `${styles["input__rua"]} ${styles["input__error"]}` : `${styles["input__rua"]}`}
          type="text"
          placeholder="Rua"
        />
        <input
          {...register("numero", {
            required: true,
          })}
          className={ errors.numero ? `${styles["input__numero"]} ${styles["input__error"]}` : `${styles["input__numero"]}`}
          type="text"
          placeholder="Número"
        />
        <div className={styles["input__complemento-wrapper"]}>
          <input
            {...register("complemento", {})}
            id="input-complemento"
            className={styles["input__complemento"]}
            type="text"
            placeholder="Complemento"
          />
          <label
            htmlFor="input-complemento"
            className={styles["label__complemento"]}
          >
            Opcional
          </label>
        </div>
        <input
          {...register("bairro", {
            required: true,
          })}
          className={ errors.bairro ? `${styles["input__bairro"]} ${styles["input__error"]}` : `${styles["input__bairro"]}`}
          type="text"
          placeholder="Bairro"
        />
        <input
          {...register("cidade", {
            required: true,
          })}
          className={ errors.cidade ? `${styles["input__cidade"]} ${styles["input__error"]}` : `${styles["input__cidade"]}`}
          type="text"
          placeholder="Cidade"
        />
        <input
          {...register("uf", {
            required: true,
          })}
          className={ errors.uf ? `${styles["input__uf"]} ${styles["input__error"]}` : `${styles["input__uf"]}`}
          type="text"
          placeholder="UF"
        />
      </div>
    </div>
  );
}

export default FormFirstWrapper