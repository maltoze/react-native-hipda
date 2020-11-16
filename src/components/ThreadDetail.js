import React from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import {fetchThreadDetail} from '../parser/ThreadDetailParser';
import Theme from '../Theme';
import {FooterEnd, FooterLoading} from './Footer';
import ListDivider from './ListDivider';
import PostListItem from './PostListItem';

const initialPostNum = 27;

export default class ThreadDetail extends React.Component {
  mounted = false;
  page = 0;
  totalPages = 0;

  state = {
    postList: [],
    isInitialLoading: true,
    isPaginationLoading: false,
  };

  _keyExtractor = (item, index) => index.toString();

  componentDidMount() {
    this.page = 1;
    this.totalPages = 1;
    this.mounted = true;
    this.fetchFirstPage(this.props.navigation.state.params.tid);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState && this.props === nextProps) {
      return false;
    }
    return true;
  }

  onListEndReached = () => {
    if (this.state.isPaginationLoading || this.totalPages <= this.page) {
      return;
    }
    this.fetchNextPage(this.props.navigation.state.params.tid);
  };

  async fetchFirstPage(tid) {
    if (!this.mounted) return
    const data = await fetchThreadDetail(tid);
    this.totalPages = data.totalPages;
    this.setState({
      postList: data.postList,
      isInitialLoading: false,
    });
  }

  filterDuplicatePosts = posts =>
    posts.filter(
      (post, index) =>
        index ===
        posts.findIndex(p => p.postno.toString() === post.postno.toString()),
    );

  async fetchNextPage(tid) {
    if (!this.mounted) return
    this.setState({isPaginationLoading: true});
    const {postList: postListBeforeFetch} = this.state;
    const data = await fetchThreadDetail(tid, this.page + 1);
    const postProps = {};
    const {postList} = this.state;
    if (postList === postListBeforeFetch) {
      postProps.postList = this.filterDuplicatePosts([
        ...this.state.postList,
        ...data.postList,
      ]);
      this.page++;
    }
    this.setState({isPaginationLoading: false, ...postProps});
  }

  _renderItem = ({item}) => <PostListItem post={item} />;

  renderListFooter = () => {
    const {isPaginationLoading} = this.state;
    return isPaginationLoading ? <FooterLoading /> : <FooterEnd />;
  };

  renderThreadDetail = () => {
    return (
      <FlatList
        data={this.state.postList}
        renderItem={this._renderItem}
        style={styles.flatList}
        keyExtractor={this._keyExtractor}
        initialNumToRender={initialPostNum}
        ItemSeparatorComponent={ListDivider}
        ListFooterComponent={this.renderListFooter}
        onEndReached={this.onListEndReached}
        onEndReachedThreshold={7}
        extraData={this.state.isPaginationLoading}
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
        {isInitialLoading
          ? this.renderLoadingIndicator()
          : this.renderThreadDetail()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flatList: {},
});
