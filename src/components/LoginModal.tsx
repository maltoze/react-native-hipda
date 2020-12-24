import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button, useTheme } from 'react-native-paper';
import { requestToLogin } from '../api/auth';
import {
  useLoginModalVisible,
  useSetLoginModalVisible,
  useSetUser,
} from '../state/store';

export default function LoginModal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const visible = useLoginModalVisible();
  const setLoginModalVisible = useSetLoginModalVisible();
  const setUser = useSetUser();
  const theme = useTheme();
  const backgroundColor = theme.colors.background;
  const baseInputStyle = { backgroundColor };

  const handleLogin = async () => {
    const { uid, avatar } = await requestToLogin(username, password);
    if (uid) {
      setUser({ uid, username, isGuest: false, avatar });
      setLoginModalVisible(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setLoginModalVisible(false)}
        contentContainerStyle={[styles.modalContainer, { backgroundColor }]}>
        <TextInput
          placeholder="用户名"
          left={<TextInput.Icon name="account" />}
          style={[styles.inputContainer, baseInputStyle]}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="密码"
          left={<TextInput.Icon name="lock" />}
          style={[styles.inputContainer, baseInputStyle]}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          onPress={handleLogin}
          style={styles.loginButton}
          accessibilityLabel="登录">
          登录
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: 24,
    margin: 52,
    borderRadius: 4,
  },
  inputContainer: {
    marginBottom: 8,
    height: 52,
  },
  loginButton: {
    marginTop: 8,
  },
});
