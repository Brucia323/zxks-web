import { useRequest } from 'ahooks';
import { Button, Form, Input, Space } from 'antd';
import { useState } from 'react';

export default function CaptchaFormItem(props: {
  getCaptcha: () => Promise<boolean>;
}) {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(60);
  const { loading: buttonLoading, run: handleClick } = useRequest(
    props.getCaptcha,
    {
      manual: true,
      onSuccess: (status) => {
        if (status) {
          setButtonDisabled(true);
          const interval = setInterval(() => {
            setCountdown((countdown) => countdown - 1);
          }, 1000);
          setTimeout(() => {
            clearInterval(interval);
            setButtonDisabled(false);
            setCountdown(60);
          }, 1 * 1000 * 60);
        }
      },
    }
  );

  return (
    <Form.Item
      name="captcha"
      rules={[{ required: true, message: '请输入验证码。' }]}
    >
      <Space.Compact block size="large">
        <Input placeholder="验证码" />
        <Button
          onClick={handleClick}
          loading={buttonLoading}
          disabled={buttonDisabled}
        >
          {countdown > 0 && countdown < 60
            ? `已发送(${countdown}s)`
            : '发送验证码'}
        </Button>
      </Space.Compact>
    </Form.Item>
  );
}
