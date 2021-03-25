import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, NativeModules } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import WebView from 'react-native-webview';
import url from 'url';
import {
  PostScreenNavigationProp,
  PostScreenRouteProp,
} from '../types/navigation';
import { postOrderAsc } from '../types/post';
import { postStore } from '../store/post';
import PostAppbar from '../components/Post/PostAppbar';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
const source = __DEV__
  ? { uri: `http://${hostname}:8080/posts.html` }
  : { html: require('../templates/posts').template() };

const PostScreen = () => {
  const route = useRoute<PostScreenRouteProp>();
  const { tid, ordertype = postOrderAsc, authorid } = route.params;

  const navigation = useNavigation<PostScreenNavigationProp>();

  const { colors, dark } = useTheme();

  const usePostStore = useMemo(postStore, []);
  const { posts, refreshing, actions } = usePostStore();

  const webViewRef = useRef<WebView>(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  useEffect(() => {
    navigation.setOptions({ header: () => <PostAppbar /> });
  }, [navigation]);

  useEffect(() => {
    actions.refreshPost({ tid, ordertype, authorid });
  }, [actions, authorid, ordertype, tid]);

  const setPostsScript = useCallback(
    (postsData) => `
      window.hiSetTheme("${dark ? 'dark' : 'light'}");
      window.hiSetPosts(${JSON.stringify(postsData)});
    `,
    [dark],
  );

  useEffect(() => {
    posts.length > 0 &&
      webViewLoaded &&
      webViewRef.current?.injectJavaScript(setPostsScript(posts));
  }, [webViewLoaded, posts, setPostsScript]);

  return (
    <View style={styles.container}>
      {(posts.length === 0 || refreshing) && (
        <ActivityIndicator
          size="large"
          style={[StyleSheet.absoluteFill, styles.spinner]}
        />
      )}
      <WebView
        ref={webViewRef}
        source={source}
        onLoadEnd={() => setWebViewLoaded(true)}
        style={{ backgroundColor: colors.surface }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinner: {
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostScreen;
