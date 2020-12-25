import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme, Colors } from 'react-native-paper';
import HTML from 'react-native-render-html';
import { FORUM_IMG_PATTERN } from '../../api/urls';
import { formatColor, isValidColor } from '../../utils/color';

// 忽略的元素className
const ignoreNodeClass = ['t_attach', 'imgtitle', 'attach_popup'];
// 需要将匹配图片的src替换为file值
const imgNonePattern = 'images/common/none.gif';
const forumSmiliesImgPattern = '/forum/images/smilies/';
const fontSizeKeywords = [
  'xx-small',
  'x-small',
  'small',
  'medium',
  'large',
  'x-large',
  'xx-large',
  // 'xxx-large',
];

export const PostContent = React.memo((props: any) => {
  const { colors } = useTheme();
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
    } else if (name === 'font') {
      let fontStyle = node.attribs.style || '';
      let fontSize = node.attribs.size;
      let fontColor = node.attribs.color;
      if (fontSize) {
        fontSize = parseFloat(fontSize);
        if (fontSize > fontSizeKeywords.length) {
          fontSize = fontSizeKeywords.length;
        }
        fontStyle = `font-size:${fontSizeKeywords[fontSize - 1]};${fontStyle}`;
      }
      if (fontColor && isValidColor(fontColor)) {
        fontStyle = `color:${formatColor(fontColor)};${fontStyle}`;
      }
      node.attribs = {
        ...node.attribs,
        style: fontStyle,
      };
      return node;
    }
  };

  const dimensionsWidth = useWindowDimensions().width - 16;
  const classesStyles = {
    pstatus: {
      color: colors.backdrop,
      fontSize: 14,
      // textAlign not work on Android
      textAlign: 'center',
      fontStyle: 'normal',
      letterSpacing: 0,
    },
    quote: {
      backgroundColor: Colors.grey200,
      padding: 8,
      borderRadius: 4,
    },
  };
  return (
    <HTML
      source={{ html: `<div>${html}</div>` }}
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
