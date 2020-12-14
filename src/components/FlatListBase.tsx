import React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import HiDivider from './HiDivider';

const FlatListBase = React.memo((props: FlatListProps<any>) => {
  return (
    <FlatList
      onEndReachedThreshold={1}
      ItemSeparatorComponent={HiDivider}
      {...props}
    />
  );
});

export default FlatListBase;
