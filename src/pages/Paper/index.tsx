import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Descriptions, Divider, Input, List, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import PaperService from 'services/papers';
import { PaperExtendType, PaperType } from 'types';
import DeletePopconfirm from './components/DeletePopconfirm';
import OpennessSwitch from './components/OpennessSwitch';
import PaperDrawer from './components/PaperDrawer';
import QuestionListDrawer from './components/QuestionListDrawer';

export default function Paper() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [data, setData] = useState<PaperType[]>([]);
  const { loading: listLoading, refresh: reGetPaper } = useRequest(
    PaperService.getAll,
    {
      refreshOnWindowFocus: true,
      onSuccess: async (response) => {
        if (response.status === 200) {
          setData(await response.json());
        }
      },
    }
  );
  const [filterData, setFilterData] = useState<PaperType[]>(data);
  const [listDrawerOpen, setListDrawerOpen] = useState<boolean>(false);
  const [moreItem, setMoreItem] = useState<object[]>([]);

  useEffect(() => {
    setFilterData(data);
    setSearchValue('');
  }, [data]);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filter = data.filter((v) =>
      v.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(filter);
  };

  const handleMore = (item: PaperType) => {
    const extend: PaperExtendType[] = item.extend!;
    const newItem = extend.map((e) => {
      return {
        key: e.id,
        number: e.number + 1,
        score: e.score,
        question: JSON.parse(e.question.title).title,
      };
    });
    setMoreItem(newItem);
    setListDrawerOpen(true);
  };

  const handleMoreClose = () => {
    setListDrawerOpen(false);
  };

  return (
    <Content style={{ margin: 50 }}>
      <Space>
        <Button
          type="dashed"
          onClick={() => {
            setDrawerOpen(true);
          }}
        >
          创建试卷
        </Button>
      </Space>
      <Divider />
      <Input
        placeholder="搜索试卷"
        onChange={handleSearch}
        bordered={false}
        size="large"
        suffix={<SearchOutlined />}
        value={searchValue}
      />
      <Divider />
      <List
        style={{ width: '100%' }}
        loading={listLoading}
        dataSource={filterData}
        renderItem={(item: PaperType) => (
          <List.Item
            key={item.id}
            actions={[
              <Button type="link" onClick={() => handleMore(item)}>
                更多
              </Button>,
              <OpennessSwitch item={item} />,
              <DeletePopconfirm item={item} refresh={reGetPaper} />,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={
                <Descriptions>
                  <Descriptions.Item label="题目数量">
                    {item.extend?.length}
                  </Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
      <PaperDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        refresh={reGetPaper}
      />
      <QuestionListDrawer
        open={listDrawerOpen}
        item={moreItem}
        onClose={handleMoreClose}
      />
    </Content>
  );
}
