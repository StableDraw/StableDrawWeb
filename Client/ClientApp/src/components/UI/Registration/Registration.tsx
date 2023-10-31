import React from "react"
import {useForm, SubmitHandler} from 'react-hook-form'

interface IFormInput {
    email:string,
    password:string
}
const Registration = () => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Email"{...register("email", {required: true},)} />
            {errors.email && <span>This field is required</span>}
          <input placeholder="Пароль" type="password"{...register("password", { required: true })} />
          {errors.password && <span>This field is required</span>}
          <input type="submit" />
        </form>
      )
}
export default Registration