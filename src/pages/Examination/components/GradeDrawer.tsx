import { Col, Drawer, Row, Statistic, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ExaminationType, GradeType, StudentType } from 'types';

const columns: ColumnsType<GradeType> = [
  {
    title: '姓名',
    dataIndex: 'student',
    render: (value: StudentType) => value.name,
  },
  {
    title: '学号',
    dataIndex: 'student',
    render: (value: StudentType) => value.number,
  },
  {
    title: '成绩',
    dataIndex: 'score',
  },
];

export default function GradeDrawer(props: {
  examination: ExaminationType;
  open: boolean;
  onClose: () => void;
}) {
  if (props.examination && props.examination.grades) {
    return (
      <Drawer
        title="查看成绩"
        width={720}
        open={props.open}
        onClose={props.onClose}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="平均成绩"
              value={
                props.examination.grades
                  ?.map((value) => value.score)
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  ) / props.examination.grades?.length
              }
              suffix={`/ ${props.examination.paper?.extend
                ?.map((value) => value.score)
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue
                )}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="考试人数"
              value={props.examination.grades?.length}
              suffix={`/ ${props.examination.group?.students?.length}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="最高分"
              value={props.examination.grades
                ?.map((value) => value.score)
                .reduce((previousValue, currentValue) =>
                  Math.max(previousValue, currentValue)
                )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="最低分"
              value={props.examination.grades
                ?.map((value) => value.score)
                .reduce((previousValue, currentValue) =>
                  Math.min(previousValue, currentValue)
                )}
            />
          </Col>
        </Row>
        <Table
          dataSource={props.examination.grades}
          rowKey="id"
          columns={columns}
        />
      </Drawer>
    );
  }
  return null;
}
