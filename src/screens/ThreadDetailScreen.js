import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import ThreadDetail from '../components/ThreadDetail';
import Theme from '../Theme';

// 帖子详情页
class ThreadDetailScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: (
        <View>
          <Text style={{color: '#fff'}}>{navigation.getParam('subject')}</Text>
        </View>
      ),
    };
  };
  render() {
    // const tid = this.props.navigation.state.params.tid;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.colors.primary}
        />
        <ThreadDetail navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThreadDetailScreen;
