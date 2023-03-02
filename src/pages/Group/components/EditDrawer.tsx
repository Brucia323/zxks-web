import { useRequest } from 'ahooks';
import { Button, Drawer, Form, Input, message, Transfer } from 'antd';
import { useEffect, useState } from 'react';
import GroupService from 'services/groups';
import StudentService from 'services/students';

export default function EditDrawer(props: {
  open: boolean;
  onClose: () => void;
  targetKeys: string[];
  title: string;
  id: string;
}) {
  const [targetKeys, setTargetKeys] = useState(props.targetKeys);
  const [data, setData] = useState<Array<{ id: string; name: string }>>([]);
  const [form] = Form.useForm();
  useRequest(StudentService.getAll, {
    onSuccess: async (response) => {
      setData(await response.json());
    },
  });
  const { loading: submitLoading, run } = useRequest(GroupService.update, {
    manual: true,
    onSuccess: async (response) => {
      if (response.status === 200) {
        message.success('编辑成功');
        form.resetFields();
        setTargetKeys([]);
        props.onClose();
      }
    },
  });

  useEffect(() => {
    setTargetKeys(props.targetKeys);
  }, [props.targetKeys]);

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      const title = value.title;
      if (targetKeys.length === 0) {
        message.info('请选择学生');
        return;
      }
      const studentIdList = targetKeys;
      run({ title, studentIdList }, props.id);
    });
  };

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  return (
    <Drawer
      open={props.open}
      onClose={handleClose}
      extra={
        <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
          提交
        </Button>
      }
      destroyOnClose
      width={640}
    >
      <Form form={form} preserve={false}>
        <Form.Item
          name="title"
          label="名称"
          rules={[{ required: true, message: '请输入用户组名称' }]}
          initialValue={props.title}
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
