import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

type ThreadListFooterProps = {
  refreshing: boolean;
};

const ThreadListFooter = (props: ThreadListFooterProps) => {
  const { refreshing } = props;
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {refreshing ? null : (
        <>
          <ActivityIndicator />
          <Text style={styles.loading}>正在加载...</Text>
        </>
      )}
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
