import React from "react";
import {useForm, SubmitHandler} from 'react-hook-form';
import styles from './styles/main.module.css';

interface IFormInput {
    email:string,
    password:string
}
const Authentication = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<IFormInput>()
    const onSubmit : SubmitHandler<IFormInput> = (data) => {
        console.log(data)
        reset({email:'', password:''})
    }
    return (
        <div className={styles.backgroundBlur}>
        <div className={styles.popupAuth}>
          <div className={styles.popupConteiner}>
            <div className={styles.close}>
              <img 
                src='./register/Close.svg' 
                className={styles.close_popup}
              />
            </div>
            <div className={styles.content_box}>
              <h3 className={styles.popup_title}>
                Добро пожаловать!
              </h3>
              <div className={styles.auth_w_services}>
                <div className={styles.service_item}>
                  <img 
                    src="/register/socials.svg" 
                    className={styles.social_icon}
                  />
                  <span>Авторизация с помощью Google</span>
                </div>
                <div className={styles.service_item}>
                  <img 
                    src="/register/socials2.svg"
                    className={styles.social_icon}
                  />
                  <span>Авторизация с помощью Facebook</span>
                </div>
              </div>
              <div className={styles.separator_line}>
                <div className={styles.sep_line}></div>
                <span>Или авторизоваться с помощью</span>
                <div className={styles.sep_line}></div>
              </div>
              <div className={styles.register_form}>
                <input 
                  type="text" 
                  name="email" 
                  placeholder="Email"
                />
                <input 
                  type="text" 
                  name="password" 
                  placeholder="Пароль"
                />
                <button className={styles.submit}>Регистрация</button>
              </div>
              <div className={styles.sign_in}>
                <span>Уже есть аккаунт?</span>
                <span>
                  <a href="#">Войти</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
        // <form onSubmit={handleSubmit(onSubmit)}>
        //   <input placeholder="Email"{...register("email", {required: true},)} />
        //     {errors.email && <span>This field is required</span>}
        //   <input placeholder="Пароль" type="password"{...register("password", { required: true })} />
        //   {errors.password && <span>This field is required</span>}
        //   <input type="submit" />
        // </form>
      )
}
export default Authentication