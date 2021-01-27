import { useState } from 'react';

const useVisible = (isVisible = false) => {
  const [visible, setVisible] = useState(isVisible);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  return { visible, show, hide };
};

export default useVisible;
