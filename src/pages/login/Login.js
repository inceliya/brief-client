import {
  Button, TextField
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { loginUser } from '../../store/actionCreators';
import { useAppDispatch } from '../../store';

function Login() {
  const dispatch = useAppDispatch();

  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser({login, password}));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          required
          label="Login"
          inputRef={loginRef}
          onChange={() => setLogin(loginRef.current.value)}
        />
        <TextField
          fullWidth
          required
          type="password"
          label="Password"
          inputRef={passwordRef}
          onChange={() => setPassword(passwordRef.current.value)}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
