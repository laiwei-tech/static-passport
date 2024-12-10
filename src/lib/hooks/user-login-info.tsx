import { useEffect, useState } from "react";
import { privateClientWithoutPrompt } from "../utils/client";
import { User } from "@/gen/laiweiv1/model_pb";

export const useUserLoginInfo = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const isLoginedInPassport = localStorage.getItem('isLoginedInPassport');

    if (isLoginedInPassport && !sessionStorage.getItem('isLoginByPassport')) {
      getUserInfo();
    } else {
      setIsLogined(false);
    }
  }, [])

  const getUserInfo = () => {
    privateClientWithoutPrompt.sharedMyUser({}).then(res => {
      if (res.user) {
        setIsLogined(true);
        setUserInfo(res.user);
      } else {
        setIsLogined(false);
      }
    }).catch(() => {
      setIsLogined(false);
    })
  }

  return {
    isLogined,
    userInfo,
    refresh: getUserInfo,
  }
};
