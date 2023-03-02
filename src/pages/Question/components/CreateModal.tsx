import { useRequest } from 'ahooks';
import {
  Button,
  Checkbox,
  Form,
  message,
  Modal,
  Radio,
  Space,
  Tooltip,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import QuestionService from 'services/questions';
import Options from './Options';

export function Title() {
  return (
    <Space>
      <span>创建题目</span>
      <Tooltip title="点击选项输入框右侧的多选框以选择正确答案">
        <Button type="link">如何选择正确答案？</Button>
      </Tooltip>
    </Space>
  );
}

export default function CreateModal(props: {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}) {
  const [form] = Form.useForm();
  const type = Form.useWatch('type', form);
  const { loading: confirmLoading, run } = useRequest(QuestionService.create, {
    manual: true,
    onSuccess: async () => {
      form.resetFields();
      props.onOk();
    },
  });

  const handleOk = async () => {
    const values = await form.validateFields();
    let validated = false;
    if (type === 'Single' || type === 'Multiple') {
      values.options.forEach((option: { option: string; answer: boolean }) => {
        if (option.answer) {
          validated = true;
        }
      });
    }
    if (type === 'Judgment') {
      validated = true;
    }
    if (validated) {
      let options = [];
      let answer: number[] = [];
      if (type === 'Single' || type === 'Multiple') {
        options = values.options.map(
          (option: { option: string; answer: boolean }, index: number) => {
            if (values.answer) {
              answer = answer.concat(index);
            }
            return {
              id: index,
              option: option.option,
            };
          }
        );
      }
      if (type === 'Judgment') {
        answer = answer.concat(values.answer ? 1 : 0);
      }
      const title = { title: values.title, options };
      const question = {
        title: JSON.stringify(title),
        type: values.type,
        answer: JSON.stringify(answer),
        openness: values.openness,
      };
      run(question);
      return;
    }
    message.error('请选择至少一个正确选项');
  };

  const handleCancel = () => {
    form.resetFields();
    props.onCancel();
  };

  return (
    <Modal
      forceRender
      open={props.open}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<Title />}
      destroyOnClose
      getContainer={false}
      width={720}
      confirmLoading={confirmLoading}
    >
      <Form preserve={false} form={form}>
        <Form.Item name="type" label="题目类型" initialValue="Single">
          <Radio.Group>
            <Radio value="Single">单选题</Radio>
            <Radio value="Multiple">多选题</Radio>
            <Radio value="Judgment">判断题</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="title"
          label="题目"
          rules={[{ required: true, message: '请输入题目' }]}
          validateTrigger={['onChange', 'onBlur']}
        >
          <TextArea
            autoSize
            maxLength={150}
            showCount
            placeholder="请输入..."
          />
        </Form.Item>
        {(type === 'Single' || type === 'Multiple') && <Options />}
        {type === 'Judgment' && (
          <Form.Item
            name="answer"
            label="答案"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>正确</Checkbox>
          </Form.Item>
        )}
        <Form.Item
          name="openness"
          label="状态"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox>公开</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
