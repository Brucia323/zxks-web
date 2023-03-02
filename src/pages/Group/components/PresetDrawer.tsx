import { useRequest } from 'ahooks';
import { Button, DatePicker, Drawer, Form, Input, message, Select } from 'antd';
import { useState } from 'react';
import GroupService from 'services/groups';
import MajorService from 'services/majors';
import StudentService from 'services/students';
import { OrganizationType, StudentType } from 'types';

export default function PresetDrawer(props: {
  open: boolean;
  onClose: () => void;
}) {
  const [form] = Form.useForm();
  const { loading: majorLoading } = useRequest(MajorService.getAll, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        const data: OrganizationType[] = await response.json();
        setMajorList(
          data.map((value) => {
            return {
              value: value.id,
              label: value.name,
            };
          })
        );
      }
    },
  });
  const [majorList, setMajorList] = useState<
    { value: string; label: string }[]
  >([]);
  const { loading: submitLoading, run } = useRequest(GroupService.create, {
    manual: true,
    onSuccess: async (response) => {
      if (response.status === 201) {
        message.success('创建成功');
        form.resetFields();
        props.onClose();
      }
    },
  });

  const handleClose = () => {
    form.resetFields();
    props.onClose();
  };

  const handleClick = () => {
    form.validateFields().then(async (value) => {
      const majorId: string = value.major;
      const year = value.year.format('YYYY');
      const student = await (
        await StudentService.getByMajor(majorId, year)
      ).json();
      const studentId = student.map((value: StudentType) => value.id);
      run({ title: value.title, studentIdList: studentId });
    });
  };

  return (
    <Drawer
      open={props.open}
      onClose={handleClose}
      width={640}
      destroyOnClose
      title="从专业中生成预设用户组"
      extra={
        <Button type="primary" onClick={handleClick} loading={submitLoading}>
          提交
        </Button>
      }
    >
      <Form form={form} preserve={false}>
        <Form.Item
          name="title"
          label="名称"
          rules={[{ required: true, message: '请输入用户组名称。' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="major"
          label="专业"
          rules={[{ required: true, message: '请选择专业' }]}
        >
          <Select
            showSearch
            placeholder="请选择..."
            optionFilterProp="label"
            loading={majorLoading}
            options={majorList}
          />
        </Form.Item>
        <Form.Item
          name="year"
          label="入学年份"
          rules={[{ required: true, message: '请选择入学年份' }]}
        >
          <DatePicker picker="year" />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
