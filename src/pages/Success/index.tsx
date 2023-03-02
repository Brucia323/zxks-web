import { Result } from 'antd';

export default function Success() {
  return (
    <Result
      status="success"
      title="注册成功"
      subTitle="您的帐号正在审核中，在您收到审核通过的邮件后，即可登录。"
    />
  );
}
