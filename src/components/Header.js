import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import Theme from '../Theme';

export class MenuHeader extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.toggleDrawer()}
          style={styles.iconTouchable}>
          <Icon type="entypo" name="menu" color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {this.props.navigation.dangerouslyGetParent().state.routeName}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  headerTitle: {
    ...Theme.typography.header,
    color: '#fff',
    paddingLeft: Theme.spacing.small,
  },
  iconTouchable: {
    paddingHorizontal: Theme.spacing.small,
  },
});
