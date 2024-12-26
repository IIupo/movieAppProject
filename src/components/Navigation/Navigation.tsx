import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';

const items = [
  {
    key: '/',
    label: 'Search',
  },
  {
    key: '/rated',
    label: 'Rated',
  },
];

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      onClick={({ key }) => navigate(key)}
      className={styles.navigation}
    />
  );
};
