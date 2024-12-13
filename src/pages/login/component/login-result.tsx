import { privateClient } from "@/lib/utils/client";
import { getAppId } from "@/lib/utils/utils";
import { Result, Spin } from "antd";
import { useEffect, useState } from "react";

export const LoginResult = ({ action }: { action: string }) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (action === 'bind') {
      setLoading(true);
      privateClient.sharedMyWechatOfficialAccountUser({
        appIdIn: [getAppId()],
      }).then((res) => {
        if (res.list.length > 0) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [action]);

  return <Spin spinning={loading}>
    {isSuccess ? <Result
      status="success"
      title={action === 'bind' ? '绑定公众号成功' : '登录成功'}
    /> : <Result
      status="error"
      title="绑定公众号失败"
    />}
  </Spin>;
};
