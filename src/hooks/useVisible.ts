import { useState } from 'react';

const useVisible = () => {
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return { visible, show, hide };
};

export default useVisible;
