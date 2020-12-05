import React from 'react';
import HTML from 'react-native-render-html';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import Theme from '../Theme';
import { FORUM_IMG_PATTERN } from '../api/urls';

// 忽略的元素className
const ignoreNodeClass = ['t_attach', 'imgtitle', 'attach_popup'];
// 需要将匹配图片的src替换为file值
const imgNonePattern = 'images/common/none.gif';

export class PostContent extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  ignoreNodesFunction = (node, parentTagName, parentIsText) => {
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

  alterNode = (node) => {
    if (!node.attribs) {
      return node;
    }
    const { name } = node;
    if (name === 'img' && node.attribs.src.match(imgNonePattern)) {
      node.attribs = { ...(node.attribs || {}), src: node.attribs.file };
      return node;
      // eslint-disable-next-line no-script-url
    } else if (name === 'a' && node.attribs.href === 'javascript:;') {
      return node.children ? node.children[0] : node;
    }
  };

  render() {
    const dimensionsWidth = Dimensions.get('window').width - 16;
    return (
      <ScrollView style={styles.container}>
        <HTML
          textSelectable
          html={this.props.pContent}
          imagesMaxWidth={dimensionsWidth}
          baseFontStyle={styles.text}
          ignoreNodesFunction={this.ignoreNodesFunction}
          alterNode={this.alterNode}
          // imagesInitialDimensions={{ width: dimensionsWidth, height: 200 }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...Theme.typography.body,
  },
});
