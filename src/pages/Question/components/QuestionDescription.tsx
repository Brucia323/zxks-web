import { Descriptions, Tag } from 'antd';
import { QuestionType } from 'types';

export default function QuestionDescription(props: { item: QuestionType }) {
  if (
    props.item.questionType === 'Single' ||
    props.item.questionType === 'Multiple'
  ) {
    return (
      <Descriptions title="选项">
        {JSON.parse(props.item.title).options.map(
          (value: { id: number; option: string }) => (
            <Descriptions.Item key={value.id} label={value.option}>
              {props.item.answer.includes(value.id) ? (
                <Tag color="orange">正确</Tag>
              ) : (
                <Tag color="lime">错误</Tag>
              )}
            </Descriptions.Item>
          )
        )}
      </Descriptions>
    );
  }
  return <></>;
}
