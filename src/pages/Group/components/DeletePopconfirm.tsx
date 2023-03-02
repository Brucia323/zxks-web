import { Button, message, Popconfirm } from 'antd';
import GroupService from 'services/groups';

export default function DeletePopconfirm(props: {
  id: string;
  refresh: () => void;
}) {
  const handleDeleteConfirm = async (id: string) => {
    const response = await GroupService.deleteGroup(id);
    if (response.status === 204) {
      message.success('删除成功');
    }
    if (response.status === 400) {
      if ((await response.json()).error === 'have examination') {
        message.error('存在与用户组有关的考试，无法删除');
      }
    }
    props.refresh();
  };

  return (
    <Popconfirm
      title="你确定要删除这个用户组吗？"
      onConfirm={() => handleDeleteConfirm(props.id)}
      okType="danger"
    >
      <Button danger type="link">
        删除
      </Button>
    </Popconfirm>
  );
}
