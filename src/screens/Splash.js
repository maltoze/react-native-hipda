import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import Theme from '../Theme';
import {stGetUser} from '../utils/storage';
import {loadUserIntoRedux} from '../actions';

class Splash extends React.Component {
  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const user = await stGetUser();
    if (user) {
      this.props.loadUserIntoRedux(user);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text style={styles.text}>HiPDA</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Theme.typography.splash,
  },
});

const mapStateToProps = ({auth}) => ({user: auth.user});
export default connect(mapStateToProps, {loadUserIntoRedux})(Splash);