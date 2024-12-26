import { Alert } from 'antd';
import { useNetworkState } from 'react-use';

export const OfflineAllert = () => {
  const state = useNetworkState();

  return !state.online ? <Alert message={'Разрыв соединения'} /> : null;
};

