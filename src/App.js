import { BrowserRouter, Route, Routes, Router, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import Form from './pages/form';
import Login from './pages/login';
import Results from './pages/results';
import { useSelector } from 'react-redux';
import { store } from './store';
import { getAccessToken } from './store/actionCreators';

const router = (isLoggedIn) => createBrowserRouter([
  {
    path: "/",
    element: <Form />
  },
  {
    path: "login",
    element: !isLoggedIn ? <Login /> : <Navigate to={'/results'} />,
  },
  {
    path: "results",
    element: <Results />,
  },
]);

function App() {
  const isLoggedIn = useSelector(
    (state) => !!state.login.authData.accessToken
  );

  return (
    <RouterProvider router={router(isLoggedIn)} />
  );
}

export default App;
