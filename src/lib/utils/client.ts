import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { AdminService } from '@/gen/laiweiv1/endpoint_admin_pb';
import { FeastService } from '@/gen/laiweiv1/endpoint_feast_pb';
import { PublicService } from '@/gen/laiweiv1/endpoint_public_pb';
import { PrivateService } from '@/gen/laiweiv1/endpoint_private_pb';
import { ImService } from '@/gen/laiweiv1/endpoint_im_pb';
import { PushService } from '@/gen/laiweiv1/endpoint_push_pb';
import { BookingService } from '@/gen/laiweiv1/endpoint_booking_pb';
import { getBaseUrl } from './config';
import axios from './axios';
import { AxiosHeaders } from 'axios';
import { getHeader } from './header';

export const connectTransport = (basePath: string, noPrompt: boolean = false) => {
  return createConnectTransport({
    baseUrl: `${getBaseUrl()}/grpc/${basePath}`,
    fetch: (input, init) => {
      return new Promise((resolve, reject) => {
        axios.request({
          url: `${input}`,
          method: init?.method,
          headers: getHeader(`${input}`, init) as unknown as AxiosHeaders,
          data: init?.body,
          withCredentials: true,
          // @ts-ignore
          hideErrorMessage: noPrompt,
        }).then((res) => {
          resolve(new Response(JSON.stringify(res.data), {
            status: res.status,
            statusText: res.statusText,
            headers: new Headers(res.headers as HeadersInit),
          }));
        }).catch((res) => {
          reject(new Response(JSON.stringify(res.data), {
            status: res.status,
            statusText: res.statusText,
            headers: new Headers(res.headers as HeadersInit),
          }));
        })
      })
    },
  });
};
// 管理员接口
export const adminClient = createClient(AdminService, connectTransport('admin'));
// 饭局接口
export const feastClient = createClient(FeastService, connectTransport('feast'));
// 公开接口
export const publicClient = createClient(PublicService, connectTransport('public'));
// 私有接口
export const privateClient = createClient(PrivateService, connectTransport('private'));
// 消息接口
export const imClient = createClient(ImService, connectTransport('im'));
// 推送接口
export const pushClient = createClient(PushService, connectTransport('push'));
// 预订接口
export const bookingClient = createClient(BookingService, connectTransport('booking'));
// 私有接口（无提示）
export const privateClientWithoutPrompt = createClient(PrivateService, connectTransport('private', true));

