import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import ThreadList from '../components/ThreadList';
import {MenuHeader} from '../components/Header';
import Theme from '../Theme';

// 帖子列表页
class ThreadListScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => {
    return {
      // title: `${navigation.dangerouslyGetParent().state.routeName}`,
      // headerLeft: <Icon name='menu' type='entypo' color={'#fff'}/>,
      // drawerLabel: navigation.routeName,
      // title: navigation.routeName,
      headerTitle: <MenuHeader navigation={navigation} />,
    };
  };

  render() {
    const parent = this.props.navigation.dangerouslyGetParent();
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.colors.primary}
        />
        <ThreadList
          navigation={this.props.navigation}
          fid={parent.state.params.fid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThreadListScreen;
