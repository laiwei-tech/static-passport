// src/pages/login/hooks/useAccountForm.ts
import { Form, App, InputRef } from 'antd';
import { useRef, useState } from 'react';
import { useBindPhone, useGetSMSCode, useLoginWithSMS } from '@/lib/hooks/api/login';
import { useCountdown } from '@/lib/hooks/code-countdown';
import { redirectToRedirectBackURL } from '@/lib/utils/utils';
import { loginStore } from '../store';

export type FieldType = {
  phone_number?: string;
  code?: string;
  phone_code?: string;
};

export const useAccountForm = (isBind: boolean) => {
  const { message } = App.useApp();
  const { action, refreshUserInfo } = loginStore();
  const bindPhoneMutation = useBindPhone();
  const loginWithSMSMutation = useLoginWithSMS();
  const getSMSCodeMutation = useGetSMSCode();

  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
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
          if (action === 'bind') {
            refreshUserInfo();
          } else {
            redirectToRedirectBackURL();
          }
        })
        .finally(() => {
          setLoginLoading(false);
        });
    }
  };

  return {
    form,
    loading,
    loginLoading,
    count,
    isCounting,
    inputRef,
    handleSendCode,
    onFinish
  };
};