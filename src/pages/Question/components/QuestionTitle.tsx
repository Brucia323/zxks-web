import { Space, Tag } from 'antd';
import { QuestionType } from 'types';
import QuestionAvatar from './QuestionAvatar';

export default function QuestionTitle(props: { item: QuestionType }) {
  return (
    <Space>
      <QuestionAvatar item={props.item} />
      <span>{JSON.parse(props.item.title).title}</span>
      {props.item.questionType === 'Judgment' &&
        (props.item.answer[0] === 1 ? (
          <Tag color="orange">正确</Tag>
        ) : (
          <Tag color="lime">错误</Tag>
        ))}
    </Space>
  );
}
