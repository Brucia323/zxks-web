import { Switch } from 'antd';
import QuestionService from 'services/questions';
import users from 'services/users';
import { QuestionType } from 'types';

export default function OpennessSwitch(props: { item: QuestionType }) {
  const handleOpennessChange = (id: string) => {
    QuestionService.update(id);
  };

  if (props.item.teacher?.id === users.getId()) {
    return (
      <Switch
        checkedChildren="公开"
        unCheckedChildren="私有"
        onChange={() => handleOpennessChange(props.item.id!)}
        defaultChecked={props.item.openness}
      />
    );
  }
  return <></>;
}
