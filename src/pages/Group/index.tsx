import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Descriptions, Divider, Input, List, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import GroupService from 'services/groups';
import { GroupType, StudentType } from 'types';
import CreateDrawer from './components/CreateDrawer';
import DeletePopconfirm from './components/DeletePopconfirm';
import EditDrawer from './components/EditDrawer';
import PresetDrawer from './components/PresetDrawer';
import StudentDrawer from './components/StudentDrawer';

export default function Group() {
  const [presetDrawerOpen, setPresetDrawerOpen] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<GroupType[]>([]);
  const { loading: groupLoading, refresh } = useRequest(GroupService.getAll, {
    refreshOnWindowFocus: true,
    onSuccess: async (response) => {
      setGroupList(await response.json());
    },
  });
  const [createDrawerOpen, setCreateDrawerOpen] = useState<boolean>(false);
  const [studentList, setStudentList] = useState<StudentType[]>([]);
  const [studentDrawerOpen, setStudentDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [editId, setEditId] = useState<string>('');

  const handleClose = () => {
    setPresetDrawerOpen(false);
    setCreateDrawerOpen(false);
    setEditDrawerOpen(false);
    refresh();
  };

  const handleStudent = async (item: GroupType) => {
    setStudentList(item.students!);
    setStudentDrawerOpen(true);
  };

  const handleEdit = (item: GroupType) => {
    setTitle(item.title);
    setTargetKeys(item.students!.map((value: StudentType) => value.id!));
    setEditDrawerOpen(true);
    setEditId(item.id!);
  };

  const [filterData, setFilterData] = useState(groupList);

  useEffect(() => {
    setFilterData(groupList);
    setSearchValue('');
  }, [groupList]);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filter = groupList.filter((v) =>
      v.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(filter);
  };

  return (
    <Content style={{ margin: 50 }}>
      <Space>
        <Button
          type="dashed"
          onClick={() => {
            setPresetDrawerOpen(true);
          }}
        >
          生成预设用户组
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            setCreateDrawerOpen(true);
          }}
        >
          创建用户组
        </Button>
      </Space>
      <Divider />
      <Input
        bordered={false}
        size="large"
        placeholder="搜索用户组"
        suffix={<SearchOutlined />}
        onChange={handleSearch}
        value={searchValue}
      />
      <Divider />
      <List
        loading={groupLoading}
        dataSource={filterData}
        renderItem={(item: GroupType) => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                type="link"
                onClick={async () => await handleStudent(item)}
              >
                详细信息
              </Button>,
              <Button
                type="link"
                onClick={() => {
                  handleEdit(item);
                }}
              >
                编辑
              </Button>,
              <DeletePopconfirm id={item.id!} refresh={refresh} />,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={
                <Descriptions>
                  <Descriptions.Item label="人数">
                    {item.students?.length}
                  </Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
      <PresetDrawer open={presetDrawerOpen} onClose={handleClose} />
      <CreateDrawer open={createDrawerOpen} onClose={handleClose} />
      <StudentDrawer
        open={studentDrawerOpen}
        onClose={() => {
          setStudentDrawerOpen(false);
        }}
        studentList={studentList}
      />
      <EditDrawer
        open={editDrawerOpen}
        onClose={handleClose}
        targetKeys={targetKeys}
        title={title}
        id={editId}
      />
    </Content>
  );
}
