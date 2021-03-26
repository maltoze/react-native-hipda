import { Buffer } from 'buffer';

type Props = {
  src?: string;
  username?: string;
};

const Avatar = (props: Props) => {
  const { src, username } = props;

  if (src) {
    return <img className="w-9 h-9 rounded-full lozad" data-src={src} />;
  }

  const label = Buffer.from(username ?? 'Anonymous')
    .slice(0, 3)
    .toString();
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center bg-primary dark:bg-primary-dark">
      <span className="text-lg dark:text-gray-800 text-white">{label}</span>
    </div>
  );
};

export default Avatar;
