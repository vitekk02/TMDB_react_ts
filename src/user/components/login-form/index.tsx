import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React, { FunctionComponent, memo } from 'react';

import { Title } from '../../../layout/components/title';
import { UserBase } from '../../types/userBase';
import './styles.scss';

interface Props {
    onSubmit(values: UserBase): void;
}

const LoginFormBase: FunctionComponent<Props> = (props) => {
  const { onSubmit } = props;

  return (
    <Form
      name="login"
      className="login-form limitedWidth"
      onFinish={onSubmit}
    >
      <Title text="Login" />
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export const LoginForm = memo(LoginFormBase);
