import { useRequest } from 'ahooks';
import {
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
} from 'antd';
import { useState } from 'react';
import PaperService from 'services/papers';
import QuestionService from 'services/questions';
import { QuestionType } from 'types';
import QuestionDrawer from './QuestionDrawer';

export default function PaperDrawer(props: {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const [secondDrawerOpen, setSecondDrawerOpen] = useState(false);
  const [data, setData] = useState<QuestionType[]>([]);
  const { loading: questionLoading, run: getQuestion } = useRequest(
    QuestionService.getAll,
    {
      manual: true,
      onSuccess: async (response) => {
        if (response.status === 200) {
          setData(await response.json());
          setSecondDrawerOpen(true);
        }
      },
    }
  );
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const { loading: submitLoading, run: createPaper } = useRequest(
    PaperService.create,
    {
      manual: true,
      onSuccess: async (response) => {
        if (response.status === 201) {
          message.success('创建成功');
          setTargetKeys([]);
          props.refresh();
          props.onClose();
        }
      },
    }
  );

  const handleClose = () => {
    setTargetKeys([]);
    props.onClose();
  };

  const handleSecondDrawerClose = () => {
    setSecondDrawerOpen(false);
  };

  const handleSubmit = () => {
    form.validateFields().then((value) => {
      if (targetKeys.length === 0) {
        message.info('请选择题目');
        return;
      }
      const paperExtendRecordList = targetKeys.map((key, index) => ({
        number: index,
        id: key,
      }));
      const paper = { ...value, paperExtendRecordList };
      form.resetFields();
      setTargetKeys([]);
      createPaper(paper);
    });
  };

  return (
    <Drawer
      title="创建试卷"
      open={props.open}
      onClose={handleClose}
      width={640}
      extra={
        <Button type="primary" onClick={handleSubmit} loading={submitLoading}>
          提交
        </Button>
      }
      destroyOnClose
    >
      <Form preserve={false} form={form}>
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入题目' }]}
        >
          <Input placeholder="请输入..." maxLength={255} />
        </Form.Item>
        <Form.Item
          label="状态"
          name="openness"
          initialValue={false}
          valuePropName="checked"
        >
          <Checkbox>公开</Checkbox>
        </Form.Item>
        <Form.Item label="单选题" name="single" initialValue={2}>
          <InputNumber addonAfter="分/题" min={0} precision={0} />
        </Form.Item>
        <Form.Item label="多选题" name="multiple" initialValue={4}>
          <InputNumber addonAfter="分/题" min={0} precision={0} />
        </Form.Item>
        <Form.Item label="判断题" name="judgment" initialValue={1}>
          <InputNumber addonAfter="分/题" min={0} precision={0} />
        </Form.Item>
        <Form.Item>
          <Button onClick={getQuestion} loading={questionLoading}>
            选择题目
          </Button>
        </Form.Item>
      </Form>
      <QuestionDrawer
        open={secondDrawerOpen}
        onClose={handleSecondDrawerClose}
        dataSource={data}
        targetKeys={targetKeys}
        setTargetKeys={setTargetKeys}
      />
    </Drawer>
  );
}
