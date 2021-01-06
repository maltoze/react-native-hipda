import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import HiDivider from '../HiDivider';

type PostListFooter = {
  hasNextPage: boolean;
};

const PostListFooter = (props: PostListFooter) => {
  const { hasNextPage } = props;
  const { colors } = useTheme();
  return (
    <View>
      <HiDivider />
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        {hasNextPage ? (
          <>
            <ActivityIndicator />
            <Text style={styles.loading}>正在加载...</Text>
          </>
        ) : (
          <Text>全部加载完成</Text>
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
  indicator: {},
});

export default React.memo(PostListFooter);
