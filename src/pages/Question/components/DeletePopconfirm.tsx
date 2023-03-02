import { Button, message, Popconfirm } from 'antd';
import QuestionService from 'services/questions';
import users from 'services/users';
import { QuestionType } from 'types';

export default function DeletePopconfirm(props: {
  item: QuestionType;
  refresh: () => void;
}) {
  const handleDeleteConfirm = async (id: string) => {
    const response = await QuestionService.deleteQuestion(id);
    if (response.status === 204) {
      message.success('删除成功');
    }
    props.refresh();
  };

  if (props.item.teacher?.id === users.getId()) {
    return (
      <Popconfirm
        title="你确定要删除这条题目吗？"
        onConfirm={async () => await handleDeleteConfirm(props.item.id!)}
        okType="danger"
      >
        <Button danger type="link">
          删除
        </Button>
      </Popconfirm>
    );
  }
  return <></>;
}
