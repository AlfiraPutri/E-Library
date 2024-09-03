import React from 'react';
// import { Link } from 'react-router-dom';
import {
  Container,
  LeftSide,
  RightSide,
  Form,
  Input,
  Button,
  Image,
} from './Login.styles';


const Login = () => {
  return (
    <Container>
      <LeftSide>
        <Image src="/images/login.png" alt="Login Illustration" />
      </LeftSide>
      <RightSide>
        <h2>Login</h2>
        <Form>
          <label>
            Username
            <Input type="text" placeholder="enter your e-mail" />
          </label>
          <label>
            Password
            <Input type="password" placeholder="enter your password" />
          </label>
          <Button type="submit">Sign in</Button>
          <p>
            i don't have any account? <a href="/signup" className="text-yellow-500">Signup Here</a>
          </p>
        </Form>
      </RightSide>
    </Container>
  );
};

export default Login;
