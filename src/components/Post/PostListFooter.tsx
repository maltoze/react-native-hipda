import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

type PostListFooter = {
  loading: boolean;
};

const PostListFooter = (props: PostListFooter) => {
  const { loading } = props;
  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : <Text>全部加载完成</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});

export default React.memo(PostListFooter);
