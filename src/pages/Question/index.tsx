import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Divider, Input, message, Popover, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import QuestionService from 'services/questions';
import { QuestionType } from 'types';
import CreateModal from './components/CreateModal';
import QuestionList from './components/QuestionList';

export default function Question() {
  const [data, setData] = useState<QuestionType[]>([]);
  const { loading: listLoading, refresh } = useRequest(QuestionService.getAll, {
    refreshOnWindowFocus: true,
    onSuccess: async (response) => {
      if (response.status === 200) {
        setData(await response.json());
      }
    },
  });
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<QuestionType[]>([]);

  useEffect(() => {
    setFilterData(data);
    setSearchValue('');
  }, [data]);

  const handleCreate = () => {
    refresh();
    message.success('创建成功');
    setIsCreateOpen(false);
  };

  const handleCreateCancel = () => {
    setIsCreateOpen(false);
  };

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filter = data.filter(
      (v) =>
        JSON.parse(v.title)
          .title.toLowerCase()
          .indexOf(e.target.value.toLowerCase()) > -1
    );
    setFilterData(filter);
  };

  return (
    <Content style={{ margin: 50 }}>
      <Space>
        <Button type="dashed" onClick={() => setIsCreateOpen(true)}>
          创建题目
        </Button>
        <Popover
          title="原因"
          content={
            <div>
              编辑题目可能会造成试卷中的题目内容变动，
              <br />
              若题目有错，可在创建新题目后，删除错误题目。
            </div>
          }
        >
          <Button type="link">为什么不能编辑题目？</Button>
        </Popover>
      </Space>
      <Divider />
      <Input
        onChange={handleSearch}
        placeholder="搜索题目"
        size="large"
        bordered={false}
        suffix={<SearchOutlined />}
        value={searchValue}
      />
      <Divider />
      <QuestionList refresh={refresh} loading={listLoading} data={filterData} />
      <CreateModal
        open={isCreateOpen}
        onOk={handleCreate}
        onCancel={handleCreateCancel}
      />
    </Content>
  );
}
