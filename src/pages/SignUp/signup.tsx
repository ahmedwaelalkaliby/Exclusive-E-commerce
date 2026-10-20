import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FcGoogle } from 'react-icons/fc';
import { toast } from '../../lib/toast';
import { useSignupMutation } from '../../store/api';
import { getApiErrorMessage } from '../../lib/apiError';
import type { SignupDetails } from '../../types';

const inputClass = 'w-full border-b border-slate-300 bg-transparent py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-red-600';

export default function Signup() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  async function handleSignup(values: SignupDetails) {
    try {
      const data = await signup(values).unwrap();
      if (data.message === 'success') navigate('/');
      else toast.error(data.message || 'An error occurred');
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  }

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      rePassword: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Repeat password is required'),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number').required('Phone number is required'),
    }),
    onSubmit: handleSignup,
  });

  const fields = [
    { name: 'name', type: 'text', placeholder: 'Name' },
    { name: 'email', type: 'email', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
    { name: 'rePassword', type: 'password', placeholder: 'Repeat Password' },
    { name: 'phone', type: 'tel', placeholder: 'Phone' },
  ] as const;

  return (
    <main className="mx-auto grid max-w-5xl items-center gap-10 py-10 md:grid-cols-2">
      <img src="/images/phone1.png" className="mx-auto w-full max-w-md rounded-xl object-cover" alt="Shop from your phone" />
      <section className="mx-auto w-full max-w-md">
        <h1 className="text-3xl font-semibold text-slate-950">Create an account</h1>
        <p className="mt-2 text-slate-600">Enter your details below</p>
        <form className="mt-8 space-y-5" onSubmit={formik.handleSubmit}>
          {fields.map((field) => <div key={field.name}>
            <input className={inputClass} name={field.name} type={field.type} placeholder={field.placeholder} aria-label={field.placeholder} value={formik.values[field.name]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched[field.name] && formik.errors[field.name] && <p className="mt-1 text-sm text-red-600">{formik.errors[field.name]}</p>}
          </div>)}
          <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-60">{isLoading ? 'Creating account…' : 'Create Account'}</button>
          <button type="button" className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 px-5 py-3 text-slate-800 hover:bg-slate-50"><FcGoogle size={20} />Sign up with Google</button>
          <p className="text-center text-sm text-slate-600">Already have an account? <button type="button" onClick={() => navigate('/Login')} className="ml-1 font-medium text-red-600 hover:underline">Log in</button></p>
        </form>
      </section>
    </main>
  );
}
