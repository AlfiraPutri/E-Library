import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FiUser, FiLock } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const TextInput = forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, icon = null, placeholder = '', ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="relative">
          {icon && <span className="absolute inset-y-0 left-0 pl-3 flex items-center">{icon}</span>}
          <input
            {...props}
            type={type}
            placeholder={placeholder}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm pl-10 ${className}`}
            ref={input}
          />
        </div>
      );
    });

const Login = ({ status, canResetPassword }) => {
    const navigate = useNavigate();
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => {
                reset("password");
                navigate("/dashboard");
            },
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

{/* Login title */}
<h2 className="text-4xl font-bold text-center text-white mb-6">Login</h2>
<div>
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            icon={<FiUser className="text-gray-400" />}
                            placeholder="Username"
                        />
                        {errors.username && <p className="text-red-500 mt-2">{errors.username}</p>}
                        </div>
                        <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            icon={<FiLock className="text-gray-400" />}
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



                    <div className="block mt-4">
                        {/* <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">Remember me</span>
                        </label> */}
                    </div>
                    <button
  type="submit"
  disabled={processing}
  className="w-full bg-[#f9a01b] text-white py-2 rounded-md hover:bg-[#f9a01b]"
>
  Login
</button>
                    {/* <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <a
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        )}
                    </div> */}
                    <p className="mt-6 text-center text-gray-500">
                    Don’t have an account?{' '}
                        <a href="/register" className="text-[#f9a01b] hover:underline">Signup Here</a>
                    </p>
                    </form>
        </div>

    );
};

export default Login;
