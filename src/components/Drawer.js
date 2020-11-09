import React from 'react';
import {StyleSheet, ScrollView, View, Text, StatusBar} from 'react-native';
import {Avatar, Divider} from 'react-native-elements';
import {connect} from 'react-redux';
import {DrawerItems, SafeAreaView} from 'react-navigation';
import Theme from '../Theme';
import {loginModalPopup} from '../actions';
import {getAvatarUrl} from '../api/urls';

class Drawer extends React.Component {
  loadUser = () => {
    this.props.navigation.closeDrawer();
    if (this.props.user) {
      // this.props.navigation.navigate("App");
      this.props.navigation.navigate('Profile');
    } else {
      this.props.loginModalPopup();
    }
  };

  renderDefaultHeader = () => {
    return (
      <Avatar
        rounded
        size="medium"
        icon={{name: 'user', type: 'font-awesome'}}
        activeOpacity={0.7}
        containerStyle={styles.avatarContainer}
        onPress={this.loadUser}
      />
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Avatar
          rounded
          size="medium"
          source={{
            uri: getAvatarUrl(this.props.user.uid),
          }}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
          onPress={this.loadUser}
        />
        <Text style={styles.headerText}>{this.props.user.username}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.user ? this.renderHeader() : this.renderDefaultHeader()}
        <Divider />
        <ScrollView>
          <SafeAreaView
          // forceInset={{ top: "always", horizontal: "never" }}
          >
            <DrawerItems {...this.props} />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    marginLeft: Theme.spacing.small,
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.small,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerText: {
    ...Theme.typography.body,
    marginTop: Theme.spacing.large,
    marginLeft: Theme.spacing.tiny,
  },
});

const mapStateToProps = ({auth}) => ({user: auth.user});
export default connect(
  mapStateToProps,
  {loginModalPopup},
)(Drawer);
