/*
  通过自己解析html来渲染帖子内容
  unused
*/
import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import Theme from '../Theme';
import cheerio from 'cheerio-without-node-native';
import {SMILIES_PATTERN, FORUM_IMG_PATTERN} from '../api/urls';

// 忽略的元素className
const ignoreElemClass = ['t_attach', 'imgtitle', 'attach_popup', 'pstatus'];

// 作者被禁止或删除 内容自动屏蔽
export class LockedContent extends React.Component {}

export class PostContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.textStyleArr = [];
    this.text = [];
    this.postStatus = '';
  }
  static defaultProps = {};

  static propTypes = {
    pContent: PropTypes.string,
  };

  renderText = (tData, index) => {
    // this.textStyleArr.unshift(styles.text);
    return (
      <Text style={StyleSheet.flatten(this.textStyleArr)} key={index}>
        {tData}
      </Text>
    );
  };

  renderTexts = key => {
    return (
      <Text style={styles.text} key={key}>
        {this.text}
      </Text>
    );
  };

  renderImg = (uri, index, styles = []) => {
    return (
      <Image
        key={index}
        source={{uri: uri}}
        style={StyleSheet.flatten(styles.concat(styles.img))}
        resizeMode={'contain'}
      />
    );
  };

  parseImg = (imgNode, index) => {
    const uri = imgNode.attribs.src;
    const file = imgNode.attribs.file;
    const nid = imgNode.attribs.id || '';
    if (uri.match(SMILIES_PATTERN)) {
      // 表情
      return this.renderImg(uri, index, [styles.smiliesImg]);
    } else if (nid.startsWith('aimg')) {
      if (uri.match('images/common/none.gif')) {
        return this.renderImg(file, index, [styles.attachImg]);
      } else {
        return this.renderImg(uri, index, [styles.attachImg]);
      }
    } else if (uri.match(FORUM_IMG_PATTERN)) {
      // do nothing
    } else {
      return this.renderImg(uri, index, [styles.attachImg]);
    }
  };

  parseNode = (node, index) => {
    if (node.type == 'tag') {
      switch (node.tagName) {
        case 'img':
          const imgC = this.parseImg(node, index);
          let cArr = [];
          if (imgC) {
            cArr.push(imgC);
          }
          if (this.text.length) {
            // const textComponent = (<Text key={index+'ptext'}>{this.text}</Text>)
            const textComponent = this.renderTexts(index + 'ptext');
            this.text = [];
            cArr.unshift(textComponent);
          }
          return cArr;
        case 'strong':
          this.textStyleArr.push(styles.strong);
          break;
        case 'font':
          if (node.attribs && node.attribs.color) {
            // TODO check color is valid
            const fColor = node.attribs.color.toLowerCase();
            this.textStyleArr.push({color: fColor});
          }
          break;
        case 'a':
          this.textStyleArr.push(styles.hyperlink);
          break;
        case 'i':
          // if (node.attribs && node.attribs.class == "pstatus") {
          //   this.textStyleArr.push(styles.pstatus);
          // }
          break;
        default:
          break;
      }
    } else if (node.type == 'text') {
      this.text.push(this.renderText(node.data, index));
      // return this.renderText(tData, index)
    }
  };

  getContents = (msgElem, keyPrefix) => {
    let stack = [msgElem];
    let contents = [];
    // 深度遍历
    stackLoop: while (stack.length) {
      // The top of the stack is our working node.
      let node = stack[stack.length - 1];
      if (!node) {
        console.log(stack, this.props.pNum);
      }
      if (node && !node.index) {
        node.index = keyPrefix + '-' + this.props.pNum;
      }
      // Visit the node if it's not visited yet.
      if (!node.visited) {
        node.visited = true;
        const cArr = this.parseNode(node, node.index);
        if (cArr && cArr.length) {
          contents = contents.concat(cArr);
        }
      }
      if (node.childNodes) {
        // Get next node to visit.
        // for (let n of node.childNodes) {
        for (const [idx, cNode] of node.childNodes.entries()) {
          // if (!n.visited) {
          if (!cNode.visited) {
            // do nothing
            if (
              cNode.attribs &&
              ignoreElemClass.includes(cNode.attribs.class)
            ) {
              continue;
            }
            // unique key
            cNode.index = node.index + '-' + idx;
            // Found the node, just go to the DFS
            // loop for it, pushing it onto the stack.
            stack.push(cNode);
            continue stackLoop;
          }
        }
      }
      // 重置style列表
      this.textStyleArr = [];
      // If we reach here, all child nodes were visited,
      // so just pop the node from the stack.
      stack.pop();
    }
    if (this.text.length) {
      // contents.push(<Text key={this.text[0].key+'ptext'}>{this.text}</Text>)
      contents.push(this.renderTexts(this.text[0].key + 'ptext'));
      this.text = [];
      this.textStyleArr = [];
    }
    return contents;
  };

  parseMessage = () => {
    const $ = cheerio.load(this.props.pContent);
    const msgElem = $('.t_msgfont')[0] || $('.locked')[0];
    const attachElem = $('.postattachlist')[0];
    const pStatusElem = $('.t_msgfont .pstatus')[0];
    let contents = [];
    if (attachElem) {
      contents = this.getContents(msgElem, 'm').concat(
        this.getContents(attachElem, 'a'),
      );
    } else {
      contents = this.getContents(msgElem, 'm');
    }
    if (pStatusElem) {
      const pStatusC = this.renderPostStatus(pStatusElem.children[0]);
      contents.unshift(pStatusC);
    }
    return contents;
  };

  renderPostStatus = pStatusE => {
    return (
      <View sytle={styles.psContainer}>
        <Text style={styles.pstatus}>{pStatusE.data}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container} selectable={true}>
        {this.parseMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...Theme.typography.body,
    lineHeight: 22,
  },
  hyperlink: {
    color: '#005CAF',
  },
  strong: {
    fontWeight: 'bold',
  },
  attachImg: {
    width: Dimensions.get('window').width,
    height: 400,
  },
  smiliesImg: {
    width: 20,
    height: 20,
  },
  pstatus: {
    ...Theme.typography.status,
    textAlign: 'center',
  },
  img: {},
  psContainer: {},
});
