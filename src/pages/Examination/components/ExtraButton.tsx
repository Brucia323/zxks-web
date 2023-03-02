import { Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { GradeType } from 'types';

export default function ExtraButton(props: {
  endTime: dayjs.Dayjs;
  grades: GradeType[];
  onCalculate: () => void;
  onOpenGradeDrawer: () => void;
  id: string;
  onCancel: () => void;
}) {
  if (dayjs().isAfter(props.endTime)) {
    if (props.grades.length === 0) {
      return (
        <Button onClick={props.onCalculate} type="link">
          计算成绩
        </Button>
      );
    }
    if (props.grades.length > 0) {
      return (
        <Button onClick={props.onOpenGradeDrawer} type="link">
          查看成绩
        </Button>
      );
    }
  }
  if (dayjs().isBefore(props.endTime)) {
    return (
      <Popconfirm
        title="你确定要删除这场考试吗？"
        onConfirm={props.onCancel}
        okType="danger"
      >
        <Button type="link" danger>
          取消
        </Button>
      </Popconfirm>
    );
  }
  return null;
}
