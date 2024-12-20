import { Auth_Provider_Type_Enum } from '@/gen/laiweiv1/model_pb';
import { WECHAT_WEBSITE_APP_ID } from '@/lib/constant';
import { publicClient } from '@/lib/utils/client';
import { WxLogin } from '@/lib/utils/login';
import { getAppId, isWeChatBrowser } from '@/lib/utils/utils';
import { useMutation, useQuery } from 'react-query';

export const useGetQrcode = () => {
  return useQuery(
    'qrcodeInfo',
    async () => {
      if (isWeChatBrowser()) return;

      const res = await publicClient.beforeLogin({
        providerType: Auth_Provider_Type_Enum.WECHAT_WEBSITE_APP,
        providerId: {
          provider: {
            case: 'wechatWebsiteApp',
            value: {
              appId: WECHAT_WEBSITE_APP_ID,
            },
          },
        },
        providerRequest: {
          provider: {
            case: 'wechatWebsiteApp',
            value: {},
          },
        },
      });

      return res.providerResponse?.provider;
    },
    {
      onSuccess: data => {
        if (data?.case === 'wechatWebsiteApp') {
          let result = data.value || {};
          const redirectUri = data.value.redirectUri;
          const state = data.value.state;
          WxLogin({
            self_redirect: true,
            appid: result.appId,
            scope: 'snsapi_login',
            redirect_uri: redirectUri,
            state,
            id: 'login-wechat-qrcode',
          });
        }
      },
    },
  );
};

export const useLoginByWechatCode = () => {
  return useMutation(async (qrcodeResult: { code: string; state: string }) => {
    const res = await publicClient.login({
      providerType: Auth_Provider_Type_Enum.WECHAT_WEBSITE_APP,
      providerId: {
        provider: {
          case: 'wechatWebsiteApp',
          value: {
            appId: WECHAT_WEBSITE_APP_ID,
          },
        },
      },
      providerRequest: {
        provider: {
          case: 'wechatWebsiteApp',
          value: {
            code: qrcodeResult.code,
            state: qrcodeResult.state,
          },
        },
      },
    });

    return res;
  });
};

export const useLoginByWechatOfficialAccount = () => {
  return useMutation(async (qrcodeResult: { code: string; state: string }) => {
    const res = await publicClient.login({
      providerType: Auth_Provider_Type_Enum.WECHAT_OFFICIAL_ACCOUNT,
      providerId: {
        provider: {
          case: 'wechatOfficialAccount',
          value: {
            appId: getAppId(),
          },
        },
      },
      providerRequest: {
        provider: {
          case: 'wechatOfficialAccount',
          value: {
            code: qrcodeResult.code,
            state: qrcodeResult.state,
          },
        },
      },
    });

    return res;
  });
};

export const useGetSMSCode = () => {
  return useMutation(async (data: { phoneCode: string; phoneNumber: number }) => {
    const { phoneCode, phoneNumber } = data;
    const phone = `${phoneCode} ${phoneNumber}`;
    const ret = await publicClient.beforeLogin({
      providerType: Auth_Provider_Type_Enum.SMS,
      providerId: {
        provider: {
          case: 'sms',
          value: {},
        },
      },
      providerRequest: {
        provider: {
          case: 'sms',
          value: {
            phone,
          },
        },
      },
    });

    return ret.providerResponse?.provider;
  });
};

export const useLoginWithSMS = () => {
  return useMutation(async ({ phone, smsCode }: { phone: string; smsCode: string }) => {
    const res = await publicClient.login({
      providerType: Auth_Provider_Type_Enum.SMS,
      providerId: {
        provider: {
          case: 'sms',
          value: {},
        },
      },
      providerRequest: {
        provider: {
          case: 'sms',
          value: {
            phone,
            smsCode,
          },
        },
      },
    });

    return res;
  });
};

export const useBindPhone = () => {
  return useMutation(async ({ phone, code }: {
    phone: string;
    code: string;
  }) => {
    const res = await publicClient.bindPhone({
      providerType: Auth_Provider_Type_Enum.WECHAT_OFFICIAL_ACCOUNT,
      providerId: {
        provider: {
          case: 'wechatOfficialAccount',
          value: {
            appId: getAppId(),
          },
        },
      },
      providerRequest: {
        provider: {
          case: 'wechatOfficialAccount',
          value: {}
        },
      },
      phone: phone,
      smsCode: code,
    });

    return res;
  });
};

export const useBindPhoneByApp = () => {
  return useMutation(async ({ phone, code }: {
    phone: string;
    code: string;
  }) => {
    const res = await publicClient.bindPhone({
      providerType: Auth_Provider_Type_Enum.WECHAT_WEBSITE_APP,
      providerId: {
        provider: {
          case: 'wechatWebsiteApp',
          value: {
            appId: WECHAT_WEBSITE_APP_ID,
          },
        },
      },
      providerRequest: {
        provider: {
          case: 'wechatWebsiteApp',
          value: {}
        },
      },
      phone: phone,
      smsCode: code,
    });

    return res;
  });
};
