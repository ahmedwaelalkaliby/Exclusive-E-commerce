import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from '../../lib/toast';
import { useAppDispatch } from '../../store/hooks';
import { useLoginMutation } from '../../store/api';
import { setCredentials } from '../../store/authSlice';
import { getApiErrorMessage } from '../../lib/apiError';
import type { AuthCredentials } from '../../types';

const inputClass = 'w-full border-b border-slate-300 bg-transparent py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-red-600';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  async function handleLogin(values: AuthCredentials) {
    try {
      const data = await login(values).unwrap();
      if (data.message === 'success') {
        dispatch(setCredentials({ user: data.user, token: data.token }));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else toast.error(data.message || 'An error occurred');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: handleLogin,
  });

  return (
    <main className="mx-auto grid max-w-5xl items-center gap-10 py-10 md:grid-cols-2">
      <img src="/images/phone1.png" className="mx-auto w-full max-w-md rounded-xl object-cover" alt="Shop from your phone" />
      <section className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-semibold text-slate-950">Log in to Exclusive</h1>
        <p className="mt-2 text-slate-600">Enter your details below</p>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div><input className={inputClass} value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" type="email" placeholder="Email" aria-label="Email" />{formik.touched.email && formik.errors.email && <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>}</div>
          <div><input className={inputClass} value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" type="password" placeholder="Password" aria-label="Password" />{formik.touched.password && formik.errors.password && <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>}</div>
          <div className="flex items-center justify-between gap-4">
            <button type="submit" disabled={isLoading} className="rounded-lg bg-red-600 px-7 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Signing in…' : 'Sign In'}</button>
            <a href="#forgot-password" className="text-sm text-red-600 hover:underline">Forgot password?</a>
          </div>
        </form>
      </section>
    </main>
  );
}
