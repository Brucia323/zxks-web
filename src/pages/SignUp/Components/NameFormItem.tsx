import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

export default function NameFormItem() {
  return (
    <Form.Item
      name="name"
      rules={[{ required: true, message: '请输入姓名。' }]}
    >
      <Input prefix={<UserOutlined />} placeholder="姓名" />
    </Form.Item>
  );
}
