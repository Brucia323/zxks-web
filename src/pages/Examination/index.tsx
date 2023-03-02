import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Button,
  Descriptions,
  Divider,
  Input,
  List,
  message,
  Modal,
  Space,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ExaminationService from 'services/examinations';
import GradeService from 'services/grades';
import { ExaminationType } from 'types';
import CreateModal from './components/CreateModal';
import ExtraButton from './components/ExtraButton';
import GradeDrawer from './components/GradeDrawer';
import arraySupport from 'dayjs/plugin/arraySupport';

dayjs.extend(arraySupport);

export default function Examination() {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

  const handleCreateModalCancel = () => {
    setCreateModalOpen(false);
    refresh();
  };

  const { loading, refresh } = useRequest(ExaminationService.getAll, {
    refreshOnWindowFocus: true,
    onSuccess: async (response) => {
      if (response.status === 200) {
        const d: ExaminationType[] = await response.json();
        setData(
          d.map((v) => ({
            ...v,
            beginTime: dayjs(v.beginTime).subtract(1, 'M'),
            endTime: dayjs(v.endTime).subtract(1, 'M'),
          }))
        );
      }
    },
  });

  const [data, setData] = useState<
    (ExaminationType & { beginTime: dayjs.Dayjs; endTime: dayjs.Dayjs })[]
  >([]);

  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    setFilterData(data);
    setSearchValue('');
  }, [data]);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    const filter = data.filter((v) =>
      v.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterData(filter);
  };

  const [gradeDrawerOpen, setGradeDrawerOpen] = useState<boolean>(false);

  const handleCalculate = (id: string) => {
    GradeService.create(id);
    Modal.success({
      title: '开始计算成绩',
      content: '成绩计算有一定延迟，请稍后刷新页面查看成绩。',
      onOk: refresh,
    });
  };

  const [selectedExamination, setSelectedExamination] =
    useState<ExaminationType>();

  const handleGradeDrawer = (examination: ExaminationType) => {
    setSelectedExamination(examination);
    setGradeDrawerOpen(true);
  };

  const handleGradeDrawerClose = () => {
    setGradeDrawerOpen(false);
  };

  const handleCancel = async (id: string) => {
    const response = await ExaminationService.deleteExamination(id);
    if (response.status === 204) {
      message.success('取消成功');
      refresh();
      return;
    }
    message.error('取消失败');
  };

  return (
    <Content style={{ margin: 50 }}>
      <Space>
        <Button
          type="dashed"
          onClick={() => {
            setCreateModalOpen(true);
          }}
        >
          创建考试
        </Button>
      </Space>
      <Divider />
      <Input
        size="large"
        bordered={false}
        placeholder="搜索考试"
        suffix={<SearchOutlined />}
        onChange={handleSearch}
        value={searchValue}
      />
      <Divider />
      <List
        style={{ width: '100%' }}
        loading={loading}
        dataSource={filterData}
        renderItem={(
          item: ExaminationType & {
            beginTime: dayjs.Dayjs;
            endTime: dayjs.Dayjs;
          }
        ) => (
          <List.Item
            key={item.id}
            actions={[
              <ExtraButton
                endTime={item.endTime}
                grades={item.grades!}
                id={item.id!}
                onCalculate={() => handleCalculate(item.id!)}
                onOpenGradeDrawer={() => handleGradeDrawer(item)}
                onCancel={() => handleCancel(item.id!)}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={
                <Descriptions>
                  <Descriptions.Item label="开始时间">
                    {item.beginTime.format('YYYY-MM-DD HH:mm')}
                  </Descriptions.Item>
                  <Descriptions.Item label="结束时间">
                    {item.endTime.format('YYYY-MM-DD HH:mm')}
                  </Descriptions.Item>
                  <Descriptions.Item label="试卷">
                    {item.paper?.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="用户组">
                    {item.group?.title}
                  </Descriptions.Item>
                  <Descriptions.Item label="开卷">
                    {item.uncoiling ? <span>是</span> : <span>否</span>}
                  </Descriptions.Item>
                </Descriptions>
              }
            />
          </List.Item>
        )}
      />
      <CreateModal open={createModalOpen} onCancel={handleCreateModalCancel} />
      <GradeDrawer
        examination={selectedExamination!}
        open={gradeDrawerOpen}
        onClose={handleGradeDrawerClose}
      />
    </Content>
  );
}
