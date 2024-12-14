import { Button, Col, Form, Input, Row, Select } from 'antd';
import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { PHONE_CODE } from '@/lib/constant/phone-code';
import { FieldType, useAccountForm } from '../hooks/use-account-form';

export const AccountForm = ({ isBind }: { isBind: boolean }) => {
  const { form, loading, loginLoading, count, isCounting, inputRef, handleSendCode, onFinish } =
    useAccountForm(isBind);

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
            type="number"
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
              <Input
                ref={inputRef}
                size="large"
                type="number"
                prefix={<LockOutlined />}
                placeholder="请输入验证码"
              />
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
