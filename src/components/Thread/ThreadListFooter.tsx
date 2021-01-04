import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import HiDivider from '../HiDivider';

type ThreadListFooterProps = {
  isLoading: boolean;
};

const ThreadListFooter = (props: ThreadListFooterProps) => {
  const { isLoading } = props;
  return (
    <View>
      <HiDivider />
      <View style={styles.container}>
        {isLoading ? (
          <>
            <ActivityIndicator />
            <Text style={styles.loading}>正在加载...</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    marginLeft: 12,
  },
});

export default React.memo(ThreadListFooter);
