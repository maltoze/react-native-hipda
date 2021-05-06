import React, {
  ComponentProps,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  NativeModules,
  ScrollView,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
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
import makeWebshell, {
  HandleHTMLDimensionsFeature,
  useAutoheight,
} from '@formidable-webview/webshell';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
const source = __DEV__
  ? { uri: `http://${hostname}:8080/posts.html` }
  : { html: require('../templates/posts').template() };

const Webshell = makeWebshell(WebView, new HandleHTMLDimensionsFeature());

const pullHeight = 150;

const PostScreen = () => {
  const route = useRoute<PostScreenRouteProp>();
  const { tid, ordertype = postOrderAsc, authorid } = route.params;

  const navigation = useNavigation<PostScreenNavigationProp>();

  const { colors, dark } = useTheme();

  const usePostStore = useMemo(postStore, []);
  const { posts, refreshing, actions, hasNextPage } = usePostStore();

  const webViewRef = useRef<WebView>(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  useEffect(() => {
    navigation.setOptions({ header: () => <PostAppbar /> });
  }, [navigation]);

  useEffect(() => {
    actions.refreshPost({ tid, ordertype, authorid });
  }, [actions, authorid, ordertype, tid]);

  const renderScript = useMemo(() => {
    const jsonData = JSON.stringify({ posts, hasNextPage });
    return `
      window.hiSetTheme("${dark ? 'dark' : 'light'}");
      window.hiSetPostsData(JSON.parse(JSON.stringify(${jsonData})));
      true;
    `;
  }, [dark, hasNextPage, posts]);

  useEffect(() => {
    posts.length > 0 &&
      webViewLoaded &&
      webViewRef.current?.injectJavaScript(renderScript);
  }, [webViewLoaded, posts, renderScript]);

  const { autoheightWebshellProps } = useAutoheight({
    webshellProps: {
      source,
      style: { backgroundColor: colors.background },
    } as ComponentProps<typeof Webshell>,
  });

  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrollFree, setIsScrollFree] = useState(true);
  const refreshHeightRef = useRef(new Animated.Value(0));

  const [refreshHeight, setRefreshHeight] = useState(0);
  refreshHeightRef.current.addListener((progress) => {
    setRefreshHeight(progress.value);
  });

  const [scrollHeight, setScrollHeight] = useState(0);

  const handlePanResponderMove = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (!refreshing) {
      console.log(gestureState.dy, gestureState.dx, refreshHeight);
      if (gestureState.dy < 0 || refreshHeight > 0) {
        refreshHeightRef.current.setValue(-1 * gestureState.dy + refreshHeight);
      } else {
        scrollViewRef.current?.scrollTo({
          y: scrollHeight - 618 + -1 * gestureState.dy,
          animated: true,
        });
      }
    }
  };

  const handlePanResponderEnd = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (!refreshing) {
      // refreshHeightRef.current.setValue(0);
      if (refreshHeight <= pullHeight) {
        // do something
        // } else if (refreshHeight >= 0) {
        // refreshHeightRef.current.setValue(0);
        // Animated.spring(refreshHeightRef.current, {
        //   toValue: 0,
        //   useNativeDriver: false,
        // }).start();
      }
      if (gestureState.dy > 0) {
        setIsScrollFree(true);
      }
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isScrollFree,
    onMoveShouldSetPanResponder: () => !isScrollFree,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderEnd: handlePanResponderEnd,
    onPanResponderTerminate: handlePanResponderEnd,
  });

  const handleOnScrollEvent = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {
      contentOffset: { y: offsetY },
      contentSize: { height: contentHeight },
      layoutMeasurement: { height: screenHeight },
    } = event.nativeEvent;
    contentHeight > scrollHeight && setScrollHeight(contentHeight);
    if (Math.round(offsetY + screenHeight) >= Math.round(contentHeight)) {
      console.log('screenHeight----', screenHeight);
      setIsScrollFree(false);
    }
  };

  const animateHeight = refreshHeightRef.current.interpolate({
    inputRange: [0, 1000],
    outputRange: [0, -1000],
  });

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      {(posts.length === 0 || refreshing) && (
        <ActivityIndicator
          size="large"
          style={[StyleSheet.absoluteFill, styles.spinner]}
        />
      )}
      <ScrollView
        ref={scrollViewRef}
        scrollEnabled={isScrollFree}
        onScroll={handleOnScrollEvent}
        {...panResponder.panHandlers}>
        <View style={{ marginBottom: refreshHeight }}>
          <Webshell
            scrollEnabled={false}
            ref={webViewRef}
            onLoadEnd={() => setWebViewLoaded(true)}
            {...autoheightWebshellProps}
          />
        </View>
      </ScrollView>
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
