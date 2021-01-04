import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import HiDivider from '../HiDivider';

type ThreadListFooterProps = {
  refreshing: boolean;
};

const ThreadListFooter = (props: ThreadListFooterProps) => {
  const { refreshing } = props;
  return (
    <View>
      <HiDivider />
      <View style={styles.container}>
        {refreshing ? null : (
          <>
            <ActivityIndicator />
            <Text style={styles.loading}>正在加载...</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginLeft: 12,
  },
});

export default React.memo(ThreadListFooter);
