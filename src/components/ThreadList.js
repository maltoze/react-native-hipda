import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { getAvatarUrl } from '../api/urls';
import { getThreadList } from '../parser/ThreadListParser';
import Theme from '../Theme';
import Divider from './HiDivider';

class ThreadList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    tList: [],
    isInitialLoading: true,
    refreshing: false,
  };

  static propTypes = {
    fid: PropTypes.number,
  };

  componentDidMount() {
    this.fetchThread(this.props.fid);
  }

  async fetchThread(fid) {
    this.setState({
      refreshing: true,
    });
    try {
      const data = await getThreadList(fid);
      this.setState({
        tList: data,
        isInitialLoading: false,
        refreshing: false,
      });
    } catch (error) {
      console.error(error);
      // TODO 请检查网络连接
      this.setState({ refreshing: false, isInitialLoading: false });
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item }) => {
    return (
      <View style={styles.threadContainer}>
        <TouchableOpacity>
          <View>
            <Image
              source={{ uri: getAvatarUrl(item.author.uid) }}
              style={styles.avatarImg}
            />
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate('ThreadDetail', {
              tid: item.tid,
              subject: item.name,
            })
          }>
          <View style={styles.threadView}>
            <Text style={styles.threadAuthorText}>{item.author.name}</Text>
            <Text>{item.date}</Text>
            <Text style={styles.threadText}>{item.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  onRefresh = () => {
    this.fetchThread(this.props.fid);
  };

  renderThreadList = () => {
    return (
      <FlatList
        data={this.state.tList}
        renderItem={this._renderItem}
        style={styles.flatList}
        keyExtractor={this._keyExtractor}
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        ItemSeparatorComponent={Divider}
      />
    );
  };

  renderLoadingIndicator = () => (
    <ActivityIndicator
      size={Theme.specifications.activityIndicatorSize}
      color={Theme.gray.lighter}
    />
  );

  render() {
    const { isInitialLoading } = this.state;
    return (
      <View style={styles.container}>
        {isInitialLoading
          ? this.renderLoadingIndicator()
          : this.renderThreadList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  threadText: {
    ...Theme.typography.body,
    lineHeight: 23,
  },
  threadContainer: {
    flexDirection: 'row',
    padding: Theme.spacing.tiny,
  },
  threadView: {
    marginLeft: 10,
    flex: 1,
  },
  threadAuthorText: {
    color: 'black',
  },
  flatList: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  avatarImg: {
    width: Theme.specifications.iconSize,
    height: Theme.specifications.iconSize,
    borderRadius: 3,
  },
});

export default ThreadList;
