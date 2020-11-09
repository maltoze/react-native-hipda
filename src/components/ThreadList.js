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
import {getAvatarUrl} from '../api/urls';
import {fetchThreadList} from '../parser/ThreadListParser';
import LoginModal from './LoginModal';
import Theme from '../Theme';
import ListDivider from './ListDivider';

class ThreadList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    tList: [],
    isInitialLoading: true,
    refreshing: false,
  };

  static defaultProps = {
    // fid: 7
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
      const data = await fetchThreadList(fid);
      this.setState({
        tList: data,
        isInitialLoading: false,
        refreshing: false,
      });
    } catch (error) {
      console.error(error);
      // TODO 请检查网络连接
      this.setState({refreshing: false, isInitialLoading: false});
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item}) => {
    return (
      <View style={styles.threadView}>
        <TouchableOpacity>
          <View>
            <Image
              source={{uri: getAvatarUrl(item.author.uid)}}
              style={{width: 38, height: 38, borderRadius: 3}}
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
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={{color: 'black'}}>{item.author.name}</Text>
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
        ItemSeparatorComponent={ListDivider}
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
    const {isInitialLoading} = this.state;
    return (
      <View style={styles.container}>
        <LoginModal />
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
  threadView: {
    flexDirection: 'row',
    padding: Theme.spacing.tiny,
  },
  flatList: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ThreadList;
