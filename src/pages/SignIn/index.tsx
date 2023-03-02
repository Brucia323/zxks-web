import { useRequest } from 'ahooks';
import { Button, Checkbox, Form, message } from 'antd';
import EmailFormItem from 'components/EmailFormItem';
import Logo from 'components/Logo';
import PasswordFormItem from 'components/PasswordFormItem';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInService from 'services/signIn';
import users from 'services/users';
import { CredentialsType } from 'types';

export default function SignIn() {
  const [remember, setRemember] = useState<boolean>();
  const navigate = useNavigate();
  const { loading: buttonLoading, run: handleSignIn } = useRequest(
    SignInService.signIn,
    {
      manual: true,
      onSuccess: async (response, params) => {
        if (response.status === 200) {
          if (remember) {
            localStorage.setItem(
              'teacher',
              JSON.stringify({ ...params, remember })
            );
          }
          users.setUser(await response.json());
          navigate('/examination');
          return;
        }
        if (response.status === 401) {
          message.error('用户名或密码错误');
          return;
        }
        if (response.status === 403) {
          message.warning('未审核或未通过审核，请稍后再试');
        }
      },
    }
  );

  const handleFiish = async (values: {
    email: string;
    password: string;
    remember: boolean;
  }) => {
    const teacher: CredentialsType = {
      email: values.email,
      password: values.password,
    };
    setRemember(values.remember);
    handleSignIn(teacher);
  };

  return (
    <div
      style={{
        paddingTop: 8,
        margin: 'auto',
        maxWidth: 1280,
      }}
    >
      <div
        style={{
          height: 96,
          width: 96,
          margin: '150px auto 12px',
        }}
      >
        <Logo />
      </div>
      <div style={{ fontSize: 24, textAlign: 'center' }}>
        <b>OESLab.com</b>
      </div>
      <Form
        size="large"
        wrapperCol={{
          lg: { offset: 8, span: 8 },
          sm: { offset: 6, span: 12 },
        }}
        style={{ margin: 24 }}
        onFinish={handleFiish}
        initialValues={
          localStorage.getItem('teacher')
            ? JSON.parse(localStorage.getItem('teacher')!)
            : null
        }
      >
        <EmailFormItem />
        <PasswordFormItem />
        <Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{ float: 'left' }}
            noStyle
          >
            <Checkbox>记住账号</Checkbox>
          </Form.Item>
          <a href="#forget-password" style={{ float: 'right' }}>
            忘记密码
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={buttonLoading}
          >
            登录
          </Button>
        </Form.Item>
        <Form.Item>
          登入即代表您同意并接受 <a href="#oeslab">OESLab 服务条款和账号规范</a>
          。
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          还没有账户？<Link to="/users/sign_up">立即注册</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
