import { Drawer, Table } from 'antd';

const columns = [
  {
    title: '题号',
    dataIndex: 'number',
  },
  {
    title: '题目',
    dataIndex: 'question',
  },
  {
    title: '分数',
    dataIndex: 'score',
  },
];

export default function QuestionListDrawer(props: {
  open: boolean;
  item: object[];
  onClose: () => void;
}) {
  if (props.item.length > 0) {
    return (
      <Drawer open={props.open} width={640} onClose={props.onClose}>
        <Table dataSource={props.item} columns={columns} />
      </Drawer>
    );
  }
  return <></>;
}
