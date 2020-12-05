import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  DrawerItemList,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Theme from '../Theme';
import { loginModalPopup } from '../actions';
import { getAvatarUrl } from '../api/urls';

class HiDrawerContent extends React.Component {
  loadUser = () => {
    this.props.navigation.closeDrawer();
    if (this.props.user) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.loginModalPopup();
    }
  };

  renderDefaultHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Avatar
          rounded
          size="medium"
          icon={{ name: 'user', type: 'font-awesome' }}
          activeOpacity={0.7}
          containerStyle={styles.avatarContainer}
          onPress={this.loadUser}
        />
      </View>
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
        <DrawerContentScrollView>
          <DrawerItemList {...this.props} labelStyle={styles.drawerLabel} />
        </DrawerContentScrollView>
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
    backgroundColor: Theme.gray.light,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.small,
  },
  headerText: {
    ...Theme.typography.body,
    marginTop: Theme.spacing.tiny,
    marginLeft: Theme.spacing.tiny,
  },
  drawerLabel: {
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ auth }) => ({ user: auth.user });
export default connect(mapStateToProps, { loginModalPopup })(HiDrawerContent);
