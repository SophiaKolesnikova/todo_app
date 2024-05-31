'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { FormEventHandler } from 'react';
import { useState } from 'react';

const SignInForm = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const res = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });

        if (res && !res.error) {
            router.push('/main');
        }
        if (res?.error) {
            setError(res.error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='login-form'>
            {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
            <label htmlFor='email' className='login-label'>
                <span>Login</span>
                <input className='input-form' type='email' name='email' required />
            </label>
            <label htmlFor='password' className='login-label'>
                Password
                <input className='input-form' type='password' name='password' required />
            </label>
            <button type='submit'>Sign In</button>
        </form>
    );
};

export { SignInForm };