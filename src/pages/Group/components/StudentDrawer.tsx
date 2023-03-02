import { Drawer, Table } from 'antd';
import { StudentType } from 'types';

const columns = [
  { dataIndex: 'name', title: '姓名' },
  { dataIndex: 'enrollYear', title: '入学年份' },
  { dataIndex: 'number', title: '学号' },
];

export default function StudentDrawer(props: {
  open: boolean;
  onClose: () => void;
  studentList: StudentType[];
}) {
  return (
    <Drawer
      title="详细信息"
      open={props.open}
      onClose={props.onClose}
      width={640}
    >
      <Table rowKey="id" dataSource={props.studentList} columns={columns} />
    </Drawer>
  );
}
