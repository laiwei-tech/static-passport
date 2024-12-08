import { ClientInfo_Platform_Enum, ClientInfo_PlatformId_WEB_Enum } from "@/gen/laiweiv1/model_pb";
import { getBaseUrl } from "./config";
import getDigest from "./digest";
import { getDeviceId } from "./utils";

// 请求头,用变量的方式，更好的支持代码混淆
const platform = "X-Client-Platform";
const platformId = "X-Client-Platform-Id";
const deviceId = "X-Client-Device-Id";
const version = "X-Client-Version";
const contentDigest = "Content-Digest";

export function getHeader(input: string, init?: RequestInit) {
  const digest = getDigest({
    method: init?.method || "",
    path: input.replace(getBaseUrl(), ""),
    body: init?.body,
  });

  let header = {
    ...init?.headers,
    [platform]: ClientInfo_Platform_Enum[ClientInfo_Platform_Enum.WEB],
    [platformId]: ClientInfo_PlatformId_WEB_Enum[ClientInfo_PlatformId_WEB_Enum.PASSPORT],
    [deviceId]: getDeviceId(),
    [version]: "1.0.1",
    [contentDigest]: `laiwei-v1=${digest}`,
    "Content-Type": "application/json",
  };
  return header;
}

export function getUploadHeader(input: string, init?: RequestInit) {
  const digest = getDigest({
    method: init?.method || "",
    path: input.replace(getBaseUrl(), ""),
    body: init?.body,
  });

  let header = {
    ...init?.headers,
    [platform]: "WEB",
    [platformId]: "admin",
    [deviceId]: getDeviceId(),
    [version]: "0.0.1",
    [contentDigest]: `laiwei-v1=${digest}`,
    "Content-Type": "application/json",
  };
  return header;
}
