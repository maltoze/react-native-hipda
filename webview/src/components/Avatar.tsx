import { useState } from 'preact/hooks';

type Props = {
  src?: string;
  username?: string;
};

const Avatar = (props: Props) => {
  const { src, username } = props;

  if (src) {
    return <img className="avatar lozad" data-src={src} />;
  }

  const [label, setLabel] = useState('');
  const reader = new FileReader();
  reader.onloadend = (e) => {
    const ret = e.target?.result;
    ret && setLabel(ret.toString());
  };
  reader.readAsText(new Blob([username ?? '匿名']).slice(0, 3));
  return (
    <div className="avatar flex items-center justify-center bg-primary dark:bg-primary-dark">
      <span className="text-lg dark:text-gray-800 text-white">{label}</span>
    </div>
  );
};

export default Avatar;
