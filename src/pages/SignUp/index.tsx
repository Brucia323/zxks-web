import { useRequest } from 'ahooks';
import { Button, Form, message } from 'antd';
import EmailFormItem from 'components/EmailFormItem';
import Logo from 'components/Logo';
import PasswordFormItem from 'components/PasswordFormItem';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaptchaService from 'services/captcha';
import TeacherService from 'services/teachers';
import { TeacherType } from 'types';
import CaptchaFormItem from './Components/CaptchaFormItem';
import NameFormItem from './Components/NameFormItem';
import OrganizationFormItems from './Components/OrganizationFormItems';

export default function SignUp() {
  const [form] = Form.useForm();
  const [captcha, setCaptcha] = useState<string>('');
  const navigate = useNavigate();
  const { loading: buttonLoading, run: handleSignUp } = useRequest(
    TeacherService.create,
    {
      manual: true,
      onSuccess: async (response) => {
        if (response.status === 201) {
          navigate('/success');
          return;
        }
        if (
          response.status === 400 &&
          (await response.json()).error === 'captcha invalid'
        ) {
          message.error('验证码错误或失效，请重新发送');
          return;
        }
        if (
          response.status === 400 &&
          (await response.json()).error === 'registered'
        ) {
          message.warning('已注册，请直接登录');
        }
      },
    }
  );

  const getCaptcha = async () => {
    if (
      form.getFieldError('email').length === 0 &&
      form.isFieldTouched('email')
    ) {
      const response = await CaptchaService.get(form.getFieldValue('email'));
      if (response.status === 200) {
        message.info('验证码已发送');
        setCaptcha((await response.json()).captcha);
        return true;
      }
      if (response.status === 400) {
        message.warning('已注册，请直接登录');
        return false;
      }
    }
    message.error('请提供有效的电子邮件地址。');
    return false;
  };

  const handleFinish = async (values: TeacherType & { captcha: string }) => {
    if (values.captcha === captcha) {
      handleSignUp(values);
    }
    message.error('验证码错误');
  };

  return (
    <div
      style={{
        paddingTop: 8,
        margin: 'auto',
        maxWidth: 1280,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          height: 96,
          width: 96,
          margin: '40px auto 12px',
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
        form={form}
        onFinish={handleFinish}
      >
        <OrganizationFormItems />
        <EmailFormItem />
        <NameFormItem />
        <PasswordFormItem />
        <CaptchaFormItem getCaptcha={getCaptcha} />
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: '100%' }}
            loading={buttonLoading}
          >
            注册
          </Button>
        </Form.Item>
        <Form.Item>
          点击注册即代表您同意并接受{' '}
          <a href="#oeslab">OESLab 服务条款和账号规范</a>。
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          已经有登录名和密码？<Link to="/users/sign_in">登录</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
