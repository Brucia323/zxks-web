import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Me from 'pages/Me';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App, { loader } from './App';
import './index.css';
import Examination from './pages/Examination';
import Group from './pages/Group';
import Paper from './pages/Paper';
import Question from './pages/Question';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Success from './pages/Success';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader,
    children: [
      {
        path: '/examination',
        element: <Examination />,
        index: true,
      },
      {
        path: '/paper',
        element: <Paper />,
      },
      {
        path: '/question',
        element: <Question />,
      },
      {
        path: '/group',
        element: <Group />,
      },
      {
        path: '/me',
        element: <Me />,
      },
    ],
  },
  {
    path: '/users/sign_in',
    element: <SignIn />,
  },
  {
    path: '/users/sign_up',
    element: <SignUp />,
  },
  {
    path: '/success',
    element: <Success />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: { Layout: { colorBgBody: '#fff', colorBgHeader: '#fff' } },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
