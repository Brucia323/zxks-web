import { List } from 'antd';
import { QuestionType } from 'types';
import DeletePopconfirm from './DeletePopconfirm';
import OpennessSwitch from './OpennessSwitch';
import QuestionDescription from './QuestionDescription';
import QuestionTitle from './QuestionTitle';

export default function QuestionList(props: {
  refresh: () => void;
  loading: boolean;
  data: QuestionType[];
}) {
  return (
    <List
      loading={props.loading}
      dataSource={props.data}
      renderItem={(item: QuestionType) => (
        <List.Item
          key={item.id}
          actions={[
            <OpennessSwitch item={item} />,
            <DeletePopconfirm item={item} refresh={props.refresh} />,
          ]}
        >
          <List.Item.Meta
            title={<QuestionTitle item={item} />}
            description={<QuestionDescription item={item} />}
          />
        </List.Item>
      )}
    />
  );
}
