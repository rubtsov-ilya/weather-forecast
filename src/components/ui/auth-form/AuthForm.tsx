import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from "react";
import styles from "./AuthForm.module.sass";
import VisibilitySvg from "../../../assets/images/auth-icons/visibility_24dp_FILL0_wght400_GRAD0_opsz24.svg?react";
import VisibilityOffSvg from "../../../assets/images/auth-icons/visibility_off_24dp_FILL0_wght400_GRAD0_opsz24.svg?react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthValues } from "../../../interfaces/AuthValues.interface";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, User } from "firebase/auth";
import { useAddUserToDataBaseMutation } from "../../../redux";

interface AuthFormProps {
  btnText: string;
  titleText: string;
  isRegister?: boolean;
  isLogin?: boolean;
  isResetPassword?: boolean;
  setIsMessageSended?: Dispatch<SetStateAction<boolean>>;
}

const AuthForm: FC<AuthFormProps> = ({ btnText, titleText, isRegister, isLogin, isResetPassword, setIsMessageSended}) => {
  const [addUserToDataBase] = useAddUserToDataBaseMutation()
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [mailValue, setMailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IAuthValues>({
    mode: "all",
  });
  const { ref } = register('password')
  const handlePasswordInputClick = () => { 
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
   }
 
  const formReset = (): void => { 
    setPasswordValue('')
    setMailValue('')
    setConfirmPasswordValue('')
   }

  async function addUserDuringRegister(user: User) {
    await addUserToDataBase({uid: user.uid})
  }

  const handleFormSubmit: SubmitHandler<IAuthValues> = (data) => {
    const auth = getAuth();
    if (isRegister) {
      /* start firebase register */
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(({user}) => {
          if (user) {
            addUserDuringRegister(user);
            navigate( '/' )
          }
          // Signed up 
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          if (errorCode === 'auth/email-already-in-use') {
            setError('email', { type: 'manual', message: 'this email is already registered' });
          }
        });
      /* end firebase register */
    } else if (isLogin) {
      /* start firebase login */
      signInWithEmailAndPassword(auth, data.email, data.password)
      .then(({ user }) => {
        // Signed in
        if (user) {
          navigate( '/' )
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          setError('password', { type: 'manual', message: 'Wrong password' });
          console.log(errorMessage)
        }
      });
      /* end firebase login */
    } else if (isResetPassword) {
      sendPasswordResetEmail(auth, data.email)
      .then(() => {
      // Password reset email sent!
      if (setIsMessageSended) {
        setIsMessageSended(true)
      }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode) {
          setError('email', { type: 'manual', message: `this account doesn't exist` });
          console.log(errorMessage)
        }
      });
    }
    formReset();
    /* navigate('/', { state: data }); */
   }

  return (
    <div className={styles["form-wrapper"]}>
      <h1 className={styles["form-wrapper__title"]}>{titleText}</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles["form"]}>
        <label className={errors.email ? `${styles["form__label"]} ${styles["form__label-error"]}` : styles["form__label"]} htmlFor="login">
          {errors.email ? errors.email.message : 'Enter your email'}
        </label>
        <input
          style={isResetPassword ? {marginBottom: 0} : {}}
          value={mailValue}
          {...register("email", {
            required: {
              value: true,
              message: "This field is required"
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address"
            },
          })}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setMailValue(e.target.value)
          }
          className={errors.email ? `${styles["form__input-bg"]} ${styles["form__input-error"]}` : `${styles["form__input-bg"]}`}
          type="text"
          placeholder="example@email.com"
        />

        {isRegister && 
          <label className={errors.password ? `${styles["form__label"]} ${styles["form__label-error"]}` : styles["form__label"]} htmlFor="password">
          {errors.password ? errors.password.message : 'Сreate your password'}
          </label>
        }

        {isLogin &&
          <label className={errors.password ? `${styles["form__label"]} ${styles["form__label-error"]}` : styles["form__label"]} htmlFor="password">
          {errors.password && !isRegister ? errors.password.message : 'Enter your password'}
          </label>
        }
        {!isResetPassword &&
          <div 
            style={isRegister ? {marginBottom: 16} : {}}
            className={errors.password ? `${styles["form__input-bg"]} ${styles["form__input-wrapper"]} ${styles["form__input-error"]}` : `${styles["form__input-bg"]} ${styles["form__input-wrapper"]}`}
            onClick={handlePasswordInputClick}
          >
            <input 
              {...register("password", {
                required: {
                  value: true,
                  message: "This field is required"
                },
                minLength: {
                  value: 8,
                  message: "Minimum length is 8 characters"
                },
              })}
              ref={(e) => {
                ref(e)
                passwordInputRef.current = e // you can still assign to ref
              }}
              className={styles["form__input"]}
              value={passwordValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordValue(e.target.value)
              }
              type={isPasswordHidden ? "password" : "text"}
              placeholder="password"
            />

            {isPasswordHidden && passwordValue.length > 0 && (
              <div onClick={() => setIsPasswordHidden((prev) => !prev)} className={styles["form__hide-btn"]}>
                <VisibilitySvg className={styles["form__svg"]} />
              </div>
            )}
            {!isPasswordHidden && passwordValue.length > 0 && (
              <div onClick={() => setIsPasswordHidden((prev) => !prev)} className={styles["form__hide-btn"]}>
                <VisibilityOffSvg className={styles["form__svg"]} />
              </div>
            )}
          </div>
        }
        {isRegister && 
          <label className={errors.confirmPassword ? `${styles["form__label"]} ${styles["form__label-error"]}` : styles["form__label"]} htmlFor="confirmPassword">
          {errors.confirmPassword ? errors.confirmPassword.message : 'Confirm your password'}
          </label>
        }
        {isRegister &&
        <input 
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "This field is required"
              },
              minLength: {
                value: 8,
                message: "Minimum length is 8 characters"
              },
              validate: {
                matchesPassword: (value) => {
                  if (value !== passwordValue) {
                    return "Passwords do not match";
                  }
                }
              }
            })}
            className={errors.confirmPassword ? `${styles["form__input-bg"]} ${styles["form__input-error"]}` : `${styles["form__input-bg"]}`}
            value={confirmPasswordValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPasswordValue(e.target.value)
            }
            type={"password"}
            placeholder="password"
          />
          }
        <button className={styles["form__btn"]}>{btnText}</button>
        {isLogin && <Link to={'/register'} className={styles["form__link"]}>Create an account</Link>}
        {isLogin && <Link to={'/reset-password'} className={styles["form__link"]}>Reset password</Link>}
        {isRegister && <Link to={'/login'} className={styles["form__link"]}>Return to sign in</Link>}
        {isResetPassword && <Link to={'/login'} className={styles["form__link"]}>Return to sign in</Link>}
        
      </form>
    </div>
  );
};

export default AuthForm;
