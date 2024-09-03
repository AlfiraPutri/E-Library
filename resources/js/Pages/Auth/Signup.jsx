import React, { forwardRef, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';

const TextInput = forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});

const Signup = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>

                <form onSubmit={submit}>
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                        />
                        {errors.username && <p className="text-red-500 mt-2">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 mt-2">{errors.password_confirmation}</p>
                        )}
                    </div>

                    <button className="w-full bg-yellow-500 text-white p-2 rounded mt-4" disabled={processing}>
                        Sign up
                    </button>

                    <p className="text-center text-gray-500 mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-yellow-500">
                            Login Here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
