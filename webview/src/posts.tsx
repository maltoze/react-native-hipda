import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { css, injectGlobal } from '@emotion/css';
import { PostItemBaseProps } from '../../src/types/post';
import render from './renderer';

injectGlobal`
  img {
    max-width: 100%
  }
  body {
    overflow-wrap: break-word;
  }
`;

const avatar = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const postsTemplate = (posts: PostItemBaseProps[]) => html`
  ${posts.map(
    (post) => html`
      <div>
        <img class=${avatar} src=${post.author.avatar} />
        <span>${post.author.username}</span>
        <span>${post.posttime}</span>
        <p>${unsafeHTML(post.content)}</p>
      </div>
    `,
  )}
`;

render(postsTemplate);
