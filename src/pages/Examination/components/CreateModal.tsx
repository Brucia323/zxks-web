import { useRequest } from 'ahooks';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useState } from 'react';
import ExaminationService from 'services/examinations';
import GroupService from 'services/groups';
import PaperService from 'services/papers';
import { GroupType, PaperType } from 'types';

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current < dayjs().endOf('day');

export default function CreateModal(props: {
  open: boolean;
  onCancel: () => void;
}) {
  const handleCancel = () => props.onCancel();

  const handleOk = async () => {
    const value = await form.validateFields();
    const groupId: string = value.group;
    const paperId: string = value.paper;
    const beginTime: string = value.time[0].format('YYYY-MM-DDTHH:mm:ss');
    const endTime: string = value.time[1].format('YYYY-MM-DDTHH:mm:ss');
    const title: string = value.title;
    const uncoiling: boolean = value.uncoiling;
    const visible: boolean = value.visible;
    const duration = Math.round((value.time[1] - value.time[0]) / 60 / 1000);
    const values = {
      groupId,
      paperId,
      beginTime,
      endTime,
      title,
      uncoiling,
      visible,
      duration,
    };
    const response = await runAsync(values);
    if (response.status === 201) {
      message.success('创建成功');
      form.resetFields();
      props.onCancel();
    }
  };

  const { loading: createLoading, runAsync } = useRequest(
    ExaminationService.create,
    {
      manual: true,
    }
  );

  const [form] = Form.useForm();

  const { loading: paperLoading } = useRequest(PaperService.getAll, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        const data: PaperType[] = await response.json();
        setPaper(
          data.map((value) => {
            return {
              value: value.id!,
              label: value.title,
            };
          })
        );
      }
    },
  });

  const [paper, setPaper] = useState<{ label: string; value: string }[]>([]);

  const { loading: groupLoading } = useRequest(GroupService.getAll, {
    onSuccess: async (response) => {
      if (response.status === 200) {
        const data: GroupType[] = await response.json();
        setGroup(
          data.map((value) => {
            return {
              value: value.id!,
              label: value.title,
            };
          })
        );
      }
    },
  });

  const [group, setGroup] = useState<{ label: string; value: string }[]>([]);

  return (
    <Modal
      destroyOnClose
      title="创建考试"
      open={props.open}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={createLoading}
    >
      <Form preserve={false} form={form}>
        <Form.Item
          name="title"
          label="名称"
          rules={[{ required: true, message: '请输入考试名称。' }]}
        >
          <Input placeholder="请输入..." />
        </Form.Item>
        <Form.Item
          name="time"
          label="时间"
          rules={[{ required: true, message: '请选择考试时间。' }]}
        >
          <DatePicker.RangePicker showTime disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          name="paper"
          label="试卷"
          rules={[{ required: true, message: '请选择试卷。' }]}
        >
          <Select
            placeholder="请选择..."
            options={paper}
            loading={paperLoading}
          />
        </Form.Item>
        <Form.Item
          name="group"
          label="用户组"
          rules={[{ required: true, message: '请选择用户组。' }]}
        >
          <Select
            placeholder="请选择..."
            options={group}
            loading={groupLoading}
          />
        </Form.Item>
        <Form.Item
          name="uncoiling"
          label="开卷"
          initialValue={false}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
        <Form.Item
          name="visible"
          label="考试后可查看"
          initialValue={false}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Modal>
  );
}
