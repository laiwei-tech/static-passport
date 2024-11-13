import { createClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { AdminService } from "../../gen/laiweiv1/endpoint_admin_pb";
import { FeastService } from "../../gen/laiweiv1/endpoint_feast_pb";
import { PublicService } from "../../gen/laiweiv1/endpoint_public_pb";
import { PrivateService } from "../../gen/laiweiv1/endpoint_private_pb";
import { ImService } from "../../gen/laiweiv1/endpoint_im_pb";
import { PushService } from "../../gen/laiweiv1/endpoint_push_pb";
import { BookingService } from "../../gen/laiweiv1/endpoint_booking_pb";
import { getBaseUrl } from "./config";
import axios from "./axios";
import { AxiosHeaders } from "axios";

export const connectTransport = createConnectTransport({
  baseUrl: getBaseUrl(),
  fetch: (input, init) => {
    init?.headers;
    return axios.request({
      url: `${input}`,
      method: init?.method,
      headers: init?.headers as AxiosHeaders,
      data: init?.body,
      withCredentials: true,
    });
  },
});

// 管理员接口
export const adminClient = createClient(AdminService, connectTransport);
// 饭局接口
export const feastClient = createClient(FeastService, connectTransport);
// 公开接口
export const publicClient = createClient(PublicService, connectTransport);
// 私有接口
export const privateClient = createClient(PrivateService, connectTransport);
// 消息接口
export const imClient = createClient(ImService, connectTransport);
// 推送接口
export const pushClient = createClient(PushService, connectTransport);
// 预订接口
export const bookingClient = createClient(BookingService, connectTransport);
