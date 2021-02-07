import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { css, injectGlobal } from '@emotion/css';
import { PostItemBaseProps } from '../../src/types/post';
import render from './renderer';

injectGlobal`
  body {
    overflow-wrap: break-word;
  }
  img {
    max-width: 100%
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
        <div
          class=${css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            class=${css`
              display: flex;
              align-items: center;
            `}
          >
            <img class=${avatar} src=${post.author.avatar} />
            <span
              class=${css`
                padding: 4px;
              `}
              >${post.author.username}</span
            >
          </div>
          <div>
            <span>${post.posttime}</span>
            <span>${post.postno}#</span>
          </div>
        </div>
        <p>${unsafeHTML(post.content)}</p>
      </div>
    `,
  )}
`;

render(postsTemplate);
