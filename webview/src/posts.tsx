import lozad from 'lozad';
import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { PostItemBaseProps } from '../../src/types/post';
import Avatar from './components/Avatar';
import './styles/posts.css';

type PostsDataProps = {
  posts: PostItemBaseProps[];
  hasNextPage: Boolean;
};

const defaultPostsData = {
  posts: [],
  hasNextPage: false,
};

const Posts = () => {
  const [postsData, setPostsData] = useState<PostsDataProps>(defaultPostsData);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { posts, hasNextPage } = postsData;

  useEffect(() => {
    if (posts.length > 0) {
      const observer = lozad();
      observer.observe();
    }
  }, [posts]);

  useEffect(() => {
    window.hiSetPostsData = setPostsData;
    window.hiSetTheme = setTheme;
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  if (posts.length === 0) return <div />;

  return (
    <div className="px-2 dark:text-gray-lightest dark:bg-dark">
      {posts?.map((post) => (
        <div className="border-b py-2 dark:border-gray-darkest ">
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
      {hasNextPage ? null : (
        <div className="text-center py-4 text-sm text-gray">全部加载完成</div>
      )}
    </div>
  );
};

const rootEl = document.getElementById('root');
render(<Posts />, rootEl!);
