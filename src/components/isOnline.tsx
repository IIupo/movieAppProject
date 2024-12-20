import { Alert } from 'antd';
import { useNetworkState } from 'react-use';

const IsOnline = () => {
  const state = useNetworkState();

  return !state.online ? <Alert message={'Разрыв соединения'} /> : null;
};

export { IsOnline };