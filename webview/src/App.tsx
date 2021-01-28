import React from 'react';
import { PostItemBaseProps } from '../../src/types/post';

const App = () => {
  const posts: PostItemBaseProps[] = [];
  return (
    <div>
      {posts.map((post) => (
        <div key={`${post.postno}`}>
          <img src={post.author.avatar} width="50" />
          <span>{post.author.username}</span>
          <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
        </div>
      ))}
    </div>
  );
};

export default App;
