import { MailOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export default function EmailFormItem() {
  return (
    <Form.Item
      name="email"
      rules={[
        { type: 'email', message: '请提供有效的电子邮件地址。' },
        { required: true, message: '请提供有效的电子邮件地址。' },
      ]}
      extra="请提供来自组织的电子邮件地址。"
    >
      <Input prefix={<MailOutlined />} placeholder="电子邮件地址" />
    </Form.Item>
  );
}
