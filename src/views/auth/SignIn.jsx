import { useState } from 'react';
import { useLogin } from '../auth/hooks/useLogin'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)

  }
  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
      <form className="login " onSubmit={handleSubmit}>
        <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Log In</h3>

        <label>Email address:</label>
        <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input className='w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid border-[#ddd]'
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="mt-4">
        <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
          Not registered yet?
        </span>
        <a
          href="/auth/sign-up "
          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        >
          Create an account
        </a>
      </div>
    </div>
    </div>
  );
}
