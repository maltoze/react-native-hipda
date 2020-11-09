import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';
import Theme from '../Theme';

export default class ListDivider extends React.Component {
  render() {
    return <Divider style={styles.divider} />;
  }
}

const styles = StyleSheet.create({
  divider: {
    // height: 1,
    // backgroundColor: Theme.gray.lighter
  },
});
