import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { PostItemBaseProps } from '../../src/types/post';
import './styles/posts.css';

const Posts = () => {
  const [posts, setPosts] = useState<PostItemBaseProps[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
    <div className="px-2 dark:bg-black dark:text-gray-100">
      {posts?.map((post) => (
        <div className="border-b py-2 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={post.author.avatar} className="w-9 h-9 rounded-full" />
              <span className="p-1">{post.author.username}</span>
            </div>
            <div className="text-gray-500">
              <span className="mr-2">{post.posttime}</span>
              <span>{post.postno}#</span>
            </div>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
            className="break-words pt-3"></p>
        </div>
      ))}
    </div>
  );
};

const rootEl = document.getElementById('root');
render(<Posts />, rootEl!);
