import React, { forwardRef, useEffect, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import {
  Container,
  LeftSide,
  RightSide,
  Form,
  Input,
  Button,
  Image,
} from './Login.styles';

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

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <Container>
            <LeftSide>
                <Image src="/images/login.png" alt="Login Illustration" />
            </LeftSide>
            <RightSide>
                <h2>Login</h2>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <Form onSubmit={submit}>
                    <label>
                        Username
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
                    </label>
                    <label>
                        Password
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
                    </label>
                    <div className="block mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>
                    <Button type="submit" disabled={processing}>Login</Button>
                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <a
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        )}
                    </div>
                    <p>
                        I don't have any account? <a href="/register" className="text-yellow-500">Signup Here</a>
                    </p>
                </Form>
            </RightSide>
        </Container>
    );
};

export default Login;
