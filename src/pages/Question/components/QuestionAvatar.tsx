import { Tag } from 'antd';
import { QuestionType } from 'types';

export default function QuestionAvatar(props: { item: QuestionType }) {
  if (props.item.questionType === 'Single') {
    return <Tag color="magenta">单选题</Tag>;
  }
  if (props.item.questionType === 'Multiple') {
    return <Tag color="red">多选题</Tag>;
  }
  if (props.item.questionType === 'Judgment') {
    return <Tag color="volcano">判断题</Tag>;
  }
  return null;
}
