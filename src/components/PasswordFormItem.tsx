import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export default function PasswordFormItem() {
  return (
    <Form.Item
      name="password"
      rules={[
        { min: 6, message: '密码最少6个字符。' },
        { max: 18, message: '密码最多18个字符。' },
        { required: true, message: '请输入密码。' },
      ]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder="密码" />
    </Form.Item>
  );
}
