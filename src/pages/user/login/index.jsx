/**
 * @author lzh
 * @desc: 登录
 * @date:2020-12-09
 */
import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {Link} from 'umi';
import {connect} from 'dva';
import cls from 'classnames';
import style from './style.less'

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 18},
};
const tailLayout = {
  wrapperCol: {offset: 3, span: 19},
};

const loginLayout = {
  wrapperCol: {offset: 3, span: 19},
};

const Login = (props) => {

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleRememberMe = e => {
    console.log(e);
    const {dispatch} = props;
    if (e) {
      dispatch({
        type: 'userLogin/updateSate',
        rememberMe: e
      })
    }
  };


  const {img} = props.userLogin;
  return (
    <div className={cls(style['container'])}>
      <Form
        {...layout}
        name="basic"
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={cls('form')}
      >
        <Form.Item
          label="用户名"
          name="用户名"
          rules={[{required: true, message: '请输入你的用户名称!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="密码"
          rules={[{required: true, message: '请输入你的密码!'}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="校验码"
          name="username"
          rules={[{required: true, message: '请输入校验码!'}]}
        >
          <div className={cls('captcha')}>
            <Input/>
            <img src={img} alt='图片'/>
          </div>
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <div className={cls('register')}>
            <Checkbox onClick={handleRememberMe}>记住登录</Checkbox>
            <Link to="/list">没有账户，重新注册。</Link>
          </div>
        </Form.Item>

        <Form.Item {...loginLayout}>
          <Button type="primary" htmlType="submit" style={{width: '100%'}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}


export default connect(({userLogin, loading}) => ({
  userLogin,
  loading
}))(Login);
