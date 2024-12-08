import { useEffect, useState } from "react";
import { privateClientWithoutPrompt } from "../utils/client";
import { User } from "@/gen/laiweiv1/model_pb";

export const useUserLoginInfo = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    privateClientWithoutPrompt.sharedMyUser({}).then(res => {
      if (res.user) {
        setIsLogined(true);
        setUserInfo(res.user);
      } else {
        setIsLogined(false);
      }
    })
  }, [])

  return {
    isLogined,
    userInfo,
  }
};
