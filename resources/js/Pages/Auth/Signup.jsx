import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const TextInput = forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, placeholder = '', ...props }, ref) {
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
            placeholder={placeholder}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm bg-transparent text-white placeholder-gray-400 ' +
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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100"
        style={{
            backgroundImage: `url('/images/background.jpg')`, // Ganti dengan URL gambar Anda
            backgroundSize: 'cover',  // Agar gambar menutupi seluruh area
            backgroundPosition: 'center', // Agar gambar berada di tengah
            backgroundRepeat: 'no-repeat', // Mencegah pengulangan gambar
        }}
        >
                <form
                onSubmit={submit}
                className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-md"
                style={{
                    borderRadius: '12px', // Softer border radius
                    border: '1px solid rgba(255, 255, 255, 0.3)', // Light border to blend with the background
                }}
                >
                     {/* Logo section */}
            <div className="flex justify-center mb-6">
                <img src="/images/logo.png" alt="Logo" className="h-20 w-20" /> {/* Update the src to your logo */}
            </div>

                    <h2 className="text-4xl font-bold text-center text-white mb-6">Sign Up</h2>
                    <div>
                        {/* <label className="block text-gray-700 font-bold">Username</label> */}
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            placeholder="Username"
                        />
                        {errors.username && <p className="text-red-500 mt-2">{errors.username}</p>}
                    </div>

                    <div>
                        {/* <label className="block text-gray-700 font-bold">Email</label> */}
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                    </div>

                    <div className="relative">
                        {/* <label className="block text-gray-700 font-bold">Password</label> */}
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Password"
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showPassword ? <AiOutlineEyeInvisible className="text-gray-400" /> : <AiOutlineEye className="text-gray-400" />}
                    </button>
                    {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
                </div>

                    <div className="relative">
                        {/* <label className="block text-gray-700 font-bold">Confirm Password</label> */}
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            placeholder="Confirm Password"
                        />
                        <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showConfirmPassword ? <AiOutlineEyeInvisible className="text-gray-400" /> : <AiOutlineEye className="text-gray-400" />}
                    </button>
                    {errors.password_confirmation && (
                        <p className="text-red-500 mt-2">{errors.password_confirmation}</p>
                    )}
                </div>

                    <button className="w-full bg-[#f9a01b] text-white p-2 rounded mt-4" disabled={processing}>
                        Sign up
                    </button>

                    <p className="text-center text-gray-500 mt-4">
                        Already have an account?{' '}
                        <a href="/login" className="text-[#f9a01b]">
                            Login Here
                        </a>
                    </p>
                </form>
            </div>

    );
};

export default Signup;
