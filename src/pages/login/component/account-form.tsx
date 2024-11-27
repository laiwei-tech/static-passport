import { App, Button, Col, Form, Input, InputRef, Row, Select } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { PHONE_CODE } from '@/lib/constant/phone-code';
import { useCountdown } from '@/lib/hooks/code-countdown';
import { useBindPhone, useGetSMSCode, useLoginWithSMS } from '@/lib/hooks/api/login';
import { useRef, useState } from 'react';
import { redirectToRedirectBackURL } from '@/lib/utils/utils';

export type FieldType = {
  phone_number?: string;
  code?: string;
  phone_code?: string;
};

export const AccountForm = ({ isBind }: { isBind: boolean }) => {
  const { message } = App.useApp();
  const bindPhoneMutation = useBindPhone();
  const loginWithSMSMutation = useLoginWithSMS();

  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const getSMSCodeMutation = useGetSMSCode();
  const { count, startCountdown, isCounting } = useCountdown(60);

  const inputRef = useRef<InputRef>(null);

  const [form] = Form.useForm<FieldType>();

  const handleSendCode = () => {
    if (!form.getFieldValue('phone_number')) {
      message.error('请输入手机号');
      return;
    }
    setLoading(true);
    getSMSCodeMutation
      .mutateAsync({
        phoneCode: form.getFieldValue('phone_code'),
        phoneNumber: form.getFieldValue('phone_number'),
      })
      .then(res => {
        if (res?.case === 'sms') {
          res.value.smsCode && message.info(res.value.smsCode);
        }
        startCountdown();
        setLoading(false);
        inputRef.current?.focus();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: FieldType) => {
    if (isBind && values.code) {
      setLoginLoading(true);
      bindPhoneMutation
        .mutateAsync({
          phone: `${values.phone_code} ${values.phone_number}`,
          code: values.code,
        })
        .then(() => {
          sessionStorage.setItem('isLoginByPassport', 'true');
          message.success('绑定成功');
          redirectToRedirectBackURL();
        })
        .finally(() => {
          setLoginLoading(false);
        });
    } else if (values.code) {
      loginWithSMSMutation
        .mutateAsync({
          phone: `${values.phone_code} ${values.phone_number}`,
          smsCode: values.code,
        })
        .then(() => {
          sessionStorage.setItem('isLoginByPassport', 'true');
          message.success('登录成功');
          redirectToRedirectBackURL();
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  };

  return (
    <div className="p-5">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ phone_code: '+86' }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Username"
          name="phone_number"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input
            size="large"
            prefix={<MobileOutlined />}
            placeholder="请输入手机号"
            addonBefore={prefixSelector}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="code"
          rules={[{ required: true, message: '请输入验证码' }]}
        >
          <Row gutter={8}>
            <Col span={16}>
              <Input ref={inputRef} size="large" prefix={<LockOutlined />} placeholder="请输入验证码" />
            </Col>
            <Col span={8}>
              <Button
                loading={loading}
                className="w-full"
                size="large"
                disabled={isCounting}
                onClick={handleSendCode}
              >
                {isCounting ? `重新发送(${count}s)` : '发送验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item label={null}>
          <Button
            loading={loginLoading}
            size="large"
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            {isBind ? '绑定手机号' : '登录'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const prefixSelector = (
  <Form.Item<FieldType> name="phone_code" noStyle>
    <Select
      popupMatchSelectWidth={340}
      options={PHONE_CODE}
      optionRender={option => (
        <span className="flex justify-between">
          <span>{option.data.text}</span>
          <span>{option.data.value}</span>
        </span>
      )}
    ></Select>
  </Form.Item>
);
