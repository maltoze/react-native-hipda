import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Surface, TextInput, useTheme } from 'react-native-paper';
import { PostReplyUrlParams } from '../../types/post';

type ReplyModalProps = {
  isVisible: boolean;
  close: () => void;
  tid: number;
  onReplyPost: (args: PostReplyUrlParams, message: string) => Promise<void>;
};

const ReplyModal = (props: ReplyModalProps) => {
  const { isVisible, tid, close, onReplyPost } = props;
  const { colors } = useTheme();
  const [replyMsg, setReplyMsg] = useState('');

  const handleSendBtnOnPress = () => {
    onReplyPost({ tid }, replyMsg);
    close();
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      coverScreen={false}
      hasBackdrop={false}
      onBackButtonPress={close}
      swipeDirection={'down'}
      swipeThreshold={10}
      onSwipeComplete={close}>
      <Surface style={styles.surface}>
        <TextInput
          placeholder="发表回复..."
          autoFocus
          multiline
          numberOfLines={2}
          style={[styles.textInput, { backgroundColor: colors.surface }]}
          right={<TextInput.Icon name="send" onPress={handleSendBtnOnPress} />}
          onChangeText={(msg) => setReplyMsg(msg)}
        />
      </Surface>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  surface: {
    elevation: 4,
  },
  textInput: {},
});

export default ReplyModal;
