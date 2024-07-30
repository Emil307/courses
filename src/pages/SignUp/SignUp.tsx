import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore, reg } from '@/modules/user';
import { setCookie } from '@/shared';

interface IFormFileds {
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFileds>();
  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<IFormFileds> = (data) => {
    setIsloading(true);

    reg(data.email, data.password)
      .then((res) => {
        toast.success('Регистрация прошла успешно!');
        setUser(res.data.user);
        setCookie('access', res.data.access_token, {
          secure: 'secure',
        });
        setCookie('refresh', res.data.refresh_token, {
          secure: 'secure',
        });
        navigate('/home');
      })
      .catch((e) => {
        toast.error(e.response.data.detail.msg || 'Ошибка при регистрации');
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <>
      <h5>
        Sign up
      </h5>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          required
          id="email"
          autoComplete="email"
          autoFocus
          type="E-mail"
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <input
          required
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Обязательное поле',
            minLength: {
              value: 8,
              message: 'min length is 8',
            },
          })}
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <button
          disabled={isLoading}
          type="submit"
        >
          Sign up
        </button>
            <Link to="/">
              Do have an account? Sign In
            </Link>
      </form>
    </>
  );
};
