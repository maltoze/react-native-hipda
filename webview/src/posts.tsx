import lozad from 'lozad';
import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { PostItemBaseProps } from '../../src/types/post';
import Avatar from './components/Avatar';
import './styles/posts.css';

const Posts = () => {
  const [posts, setPosts] = useState<PostItemBaseProps[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (posts.length > 0) {
      const observer = lozad();
      observer.observe();
    }
  }, [posts]);

  useEffect(() => {
    window.hiSetPosts = setPosts;
    window.hiSetTheme = setTheme;
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="px-2 pb-5 dark:text-gray-100 dark:bg-dark">
      {posts?.map((post) => (
        <div className="border-b py-2 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm">
              <Avatar
                src={post.author.avatar}
                username={post.author.username}
              />
              <span className="ml-2">{post.author.username}</span>
            </div>
            <div className="text-gray-500 text-sm">
              <span className="mr-2">{post.posttime}</span>
              <span>{post.postno}#</span>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
            className="break-words pt-2"></p>
        </div>
      ))}
    </div>
  );
};

const rootEl = document.getElementById('root');
render(<Posts />, rootEl!);
