import { useRequest } from 'ahooks';
import { Button, Descriptions } from 'antd';
import { Content } from 'antd/es/layout/layout';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherService from 'services/teachers';
import users from 'services/users';
import { TeacherType } from 'types';

export default function Me() {
  const [teacher, setTeacher] = useState<TeacherType>();

  useRequest(TeacherService.get, {
    refreshOnWindowFocus: true,
    onSuccess: async (response) => {
      if (response.status === 200) {
        const data: TeacherType = await response.json();
        setTeacher(data);
      }
    },
  });

  const handleSignOut = () => {
    users.setUser(null!);
    sessionStorage.clear();
    navigate('/users/sign_in');
  };

  const navigate = useNavigate();

  return (
    <Content style={{ margin: 50 }}>
      <Descriptions
        title="用户信息"
        extra={<Button onClick={handleSignOut}>退出登录</Button>}
      >
        <Descriptions.Item label="姓名">{teacher?.name}</Descriptions.Item>
        <Descriptions.Item label="电子邮箱">{teacher?.email}</Descriptions.Item>
        <Descriptions.Item label="注册日期">
          {dayjs(
            teacher?.createTime?.toString(),
            'YYYY,MM,DD,HH,mm,ss'
          ).format('YYYY-MM-DD')}
        </Descriptions.Item>
      </Descriptions>
    </Content>
  );
}
