import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Theme from '../Theme';

class Profile extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {};
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.colors.primary}
        />
        <Text selectable>{this.props.user.username}的资料</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.tiny,
  },
});

const mapStateToProps = ({auth: {user}}) => ({user});
export default connect(mapStateToProps)(Profile);
