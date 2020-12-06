import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import Theme from '../Theme';
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

  const handleLogin = async () => {
    try {
      const { uid } = await requestToLogin(username, password);
      setUser({ uid, username, isGuest: false });
      setLoginModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setLoginModalVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <TextInput
          placeholder="用户名"
          left={<TextInput.Icon name="account" />}
          style={styles.inputContainer}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="密码"
          left={<TextInput.Icon name="lock" />}
          style={styles.inputContainer}
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
    padding: Theme.spacing.base,
    backgroundColor: 'white',
    margin: Theme.spacing.large,
    borderRadius: Theme.spacing.xTiny,
  },
  inputContainer: {
    marginBottom: Theme.spacing.tiny,
    backgroundColor: 'white',
    height: Theme.spacing.large,
  },
  loginButton: {
    marginTop: Theme.spacing.tiny,
  },
});
