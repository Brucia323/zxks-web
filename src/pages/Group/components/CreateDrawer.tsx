import { useRequest } from 'ahooks';
import { Button, Drawer, Form, Input, message, Transfer } from 'antd';
import { useState } from 'react';
import GroupService from 'services/groups';
import StudentService from 'services/students';

export default function CreateDrawer(props: {
  open: boolean;
  onClose: () => void;
}) {
  const [form] = Form.useForm();
  const [data, setData] = useState<Array<{ id: string; name: string }>>([]);
  useRequest(StudentService.getAll, {
    onSuccess: async (response) => {
      setData(await response.json());
    },
  });
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const { loading: submitLoading, run } = useRequest(GroupService.create, {
    manual: true,
    onSuccess: async (response) => {
      if (response.status === 201) {
        message.success('创建成功');
        form.resetFields();
        setTargetKeys([]);
        props.onClose();
      }
    },
  });

  const handleClose = () => {
    form.resetFields();
    setTargetKeys([]);
    props.onClose();
  };

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      if (targetKeys.length === 0) {
        message.info('请选择学生');
        return;
      }
      const studentIdList: string[] = targetKeys;
      const title: string = value.title;
      run({ title, studentIdList });
    });
  };

  return (
    <Drawer
      title="创建用户组"
      destroyOnClose
      extra={
        <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
          提交
        </Button>
      }
      open={props.open}
      onClose={handleClose}
      width={640}
    >
      <Form form={form} preserve={false}>
        <Form.Item
          name="title"
          label="名称"
          rules={[{ required: true, message: '请输入用户组名称。' }]}
        >
          <Input placeholder="请输入..." />
        </Form.Item>
      </Form>
      <Transfer
        listStyle={{ width: 300, height: '80vh' }}
        dataSource={data}
        rowKey={(record) => record.id}
        showSearch
        filterOption={(inputValue, item) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        }
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(record) => record.name}
        titles={['学生', '已选学生']}
      />
    </Drawer>
  );
}
