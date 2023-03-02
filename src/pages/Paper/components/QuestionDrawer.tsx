import { Drawer, Transfer } from 'antd';
import { QuestionType } from 'types';

export default function QuestionDrawer(props: {
  open: boolean;
  onClose: () => void;
  dataSource: QuestionType[];
  targetKeys: string[];
  setTargetKeys: (args: string[]) => void;
}) {
  const handleChange = (newTargetKeys: string[]) => {
    props.setTargetKeys(newTargetKeys);
  };

  return (
    <Drawer
      title="选择题目"
      open={props.open}
      onClose={props.onClose}
      width={640}
    >
      <Transfer
        rowKey={(record) => record.id!}
        dataSource={props.dataSource}
        showSearch
        filterOption={(inputValue, item) =>
          JSON.parse(item.title!)
            .title.toLowerCase()
            .indexOf(inputValue.toLowerCase()) > -1
        }
        targetKeys={props.targetKeys}
        onChange={handleChange}
        render={(record) => JSON.parse(record.title!).title}
        listStyle={{ height: '80vh', width: 300 }}
        titles={['题库', '已选题目']}
      />
    </Drawer>
  );
}
