import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Overlay, Icon, Input, Button} from 'react-native-elements';
import Theme from '../Theme';
import {loginModalHide} from '../actions';
import {
  loginUsernameChanged,
  loginPasswordChanged,
  loginUser,
} from '../actions/AuthActions';

class LoginModal extends React.Component {
  onUsernameTextChange = text => this.props.loginUsernameChanged(text);
  onPasswordTextChange = text => this.props.loginPasswordChanged(text);

  onLoginPress = () => {
    const {loginUsername, loginPassword} = this.props;
    this.props.loginUser({
      username: loginUsername,
      password: loginPassword,
      onSuccess: this.props.loginModalHide,
    });
  };

  render() {
    return (
      <Overlay
        isVisible={this.props.modalVisible || false}
        onBackdropPress={this.props.loginModalHide}
        width="auto"
        height="auto">
        <View style={styles.container}>
          <Input
            placeholder="用户名"
            leftIcon={
              <Icon
                name="user"
                type="feather"
                containerStyle={styles.leftIconContainer}
              />
            }
            containerStyle={styles.inputContainer}
            onChangeText={this.onUsernameTextChange}
          />
          <Input
            placeholder="密码"
            leftIcon={
              <Icon
                name="lock"
                type="feather"
                containerStyle={styles.leftIconContainer}
              />
            }
            containerStyle={styles.inputContainer}
            secureTextEntry={true}
            onChangeText={this.onPasswordTextChange}
          />
          <Button title="登录" type="clear" onPress={this.onLoginPress} />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Theme.spacing.tiny,
  },
  leftIconContainer: {
    marginLeft: -10,
    marginRight: Theme.spacing.tiny,
  },
  inputContainer: {
    width: 250,
    marginBottom: Theme.spacing.tiny,
  },
});

const mapStateToProps = ({auth}) => auth;
export default connect(
  mapStateToProps,
  {loginModalHide, loginUsernameChanged, loginPasswordChanged, loginUser},
)(LoginModal);
