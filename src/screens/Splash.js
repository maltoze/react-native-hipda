import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {stGetUser} from '../utils/storage';
import {loadUserIntoRedux} from '../actions';
import {connect} from 'react-redux';
import Theme from '../Theme';

class Splash extends React.Component {
  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const {navigation} = this.props;
    const user = await stGetUser();

    // CookieManager.get(FORUM_SERVER_SSL).then(res => {
    //   console.log("CookieManager.get =>", res); // => 'user_session=abcdefg; path=/;'
    // });

    if (user) {
      this.props.loadUserIntoRedux(user);
    }
    navigation.navigate('App');
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

const mapStateToProps = ({auth: {user}}) => ({user});
export default connect(
  mapStateToProps,
  {loadUserIntoRedux},
)(Splash);
