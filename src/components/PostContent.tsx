import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { FORUM_IMG_PATTERN } from '../api/urls';

// 忽略的元素className
const ignoreNodeClass = ['t_attach', 'imgtitle', 'attach_popup'];
// 需要将匹配图片的src替换为file值
const imgNonePattern = 'images/common/none.gif';
const forumSmiliesImgPattern = '/forum/images/smilies/';

export const PostContent = React.memo((props: any) => {
  const { pContent: html } = props;
  const ignoreNodesFunction = (node: any) => {
    const imgSrc = node.attribs ? node.attribs.src : '';
    if (node.attribs && ignoreNodeClass.includes(node.attribs.class)) {
      return true;
    } else if (
      imgSrc &&
      !imgSrc.match(imgNonePattern) &&
      imgSrc.match(FORUM_IMG_PATTERN)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const alterNode = (node: any) => {
    if (!node.attribs) {
      return node;
    }
    const { name } = node;
    if (name === 'img') {
      if (node.attribs.src.match(imgNonePattern)) {
        node.attribs = { ...(node.attribs || {}), src: node.attribs.file };
        return node;
      } else if (node.attribs.src.match(forumSmiliesImgPattern)) {
        node.attribs = {
          ...(node.attribs || {}),
          style: 'justify-content:flex-start',
        };
        return node;
      }
      // eslint-disable-next-line no-script-url
    } else if (name === 'a' && node.attribs.href === 'javascript:;') {
      return node.children ? node.children[0] : node;
    }
  };

  const dimensionsWidth = useWindowDimensions().width - 16;
  const classesStyles = {
    pstatus: {
      color: 'rgba(0, 0, 0, 0.5)',
      fontSize: 14,
      // textAlign not work on Android
      textAlign: 'center',
      fontStyle: 'normal',
      letterSpacing: 0,
    },
    quote: {
      backgroundColor: '#e6e6e6',
      padding: 8,
      borderRadius: 4,
    },
  };
  return (
    <HTML
      source={{ html }}
      contentWidth={dimensionsWidth}
      ignoreNodesFunction={ignoreNodesFunction}
      alterNode={alterNode}
      baseFontStyle={styles.baseFontStyle}
      classesStyles={classesStyles}
    />
  );
});

const styles = StyleSheet.create({
  baseFontStyle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});
