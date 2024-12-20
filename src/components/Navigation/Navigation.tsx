import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';
const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
export { Navigation };