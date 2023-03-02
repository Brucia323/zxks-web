import { Switch } from 'antd';
import PaperService from 'services/papers';
import users from 'services/users';
import { PaperType } from 'types';

export default function OpennessSwitch(props: { item: PaperType }) {
  const handleOpennessChange = (id: string) => {
    PaperService.update(id);
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
  return null;
}
