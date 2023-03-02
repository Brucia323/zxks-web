import {
  EditOutlined,
  GroupOutlined,
  PaperClipOutlined,
  QuestionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Outlet, redirect, useMatches, useNavigate } from 'react-router-dom';
import './App.css';
import UserService from './services/users';

export function loader() {
  const user = UserService.getUser();
  if (!user) {
    return redirect('/users/sign_in');
  }
}

const items = [
  { label: '考试', key: 'examination', icon: <EditOutlined /> },
  { label: '试卷', key: 'paper', icon: <PaperClipOutlined /> },
  { label: '题目', key: 'question', icon: <QuestionOutlined /> },
  { label: '用户组', key: 'group', icon: <GroupOutlined /> },
  { label: '个人中心', key: 'me', icon: <UserOutlined /> },
];

export default function App() {
  const matchs = useMatches();
  const [current, setCurrent] = useState<string>(
    matchs.length > 1 ? matchs[1].pathname.substring(1) : 'examination'
  );
  const navigate = useNavigate();

  const handleClick = (e: { key: React.SetStateAction<string> }) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <div className="App">
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
          }}
        >
          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[current]}
            onClick={handleClick}
          />
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}
