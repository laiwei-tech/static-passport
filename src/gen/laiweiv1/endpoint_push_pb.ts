// @generated by protoc-gen-es v2.2.2 with parameter "target=ts"
// @generated from file laiweiv1/endpoint_push.proto (package laiwei.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Operator, OperatorPushConfig, OperatorPushSceneConfig, Push_Scene_Enum, Query } from "./model_pb";
import { file_laiweiv1_model } from "./model_pb";
import { file_laiweiv1_service } from "./service_pb";
import { file_laiweiv1_extend } from "./extend_pb";
import { file_tagger_tagger } from "../tagger/tagger_pb";
import { file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file laiweiv1/endpoint_push.proto.
 */
export const file_laiweiv1_endpoint_push: GenFile = /*@__PURE__*/
  fileDesc("ChxsYWl3ZWl2MS9lbmRwb2ludF9wdXNoLnByb3RvEglsYWl3ZWkudjEinAYKEFB1c2hTZXJ2aWNlTW9kZWwabQoYVXBzZXJ0T3BlcmF0b3JQdXNoQ29uZmlnGkUKB1JlcXVlc3QSJQoIb3BlcmF0b3IYASABKAsyEy5sYWl3ZWkudjEuT3BlcmF0b3ISEwoLaXNfZGlzYWJsZWQYAiABKAgaCgoIUmVzcG9uc2Ua3gEKF1F1ZXJ5T3BlcmF0b3JQdXNoQ29uZmlnGnsKB1JlcXVlc3QSJQoIb3BlcmF0b3IYASABKAsyEy5sYWl3ZWkudjEuT3BlcmF0b3ISHwoFcXVlcnkYAiABKAsyEC5sYWl3ZWkudjEuUXVlcnkSGAoLaXNfZGlzYWJsZWQYAyABKAhIAIgBAUIOCgxfaXNfZGlzYWJsZWQaRgoIUmVzcG9uc2USKwoEbGlzdBgBIAMoCzIdLmxhaXdlaS52MS5PcGVyYXRvclB1c2hDb25maWcSDQoFdG90YWwYAiABKAManQEKHVVwc2VydE9wZXJhdG9yUHVzaFNjZW5lQ29uZmlnGnAKB1JlcXVlc3QSJQoIb3BlcmF0b3IYASABKAsyEy5sYWl3ZWkudjEuT3BlcmF0b3ISKQoFc2NlbmUYAiABKA4yGi5sYWl3ZWkudjEuUHVzaC5TY2VuZS5FbnVtEhMKC2lzX2Rpc2FibGVkGAMgASgIGgoKCFJlc3BvbnNlGpcCChxRdWVyeU9wZXJhdG9yUHVzaFNjZW5lQ29uZmlnGqkBCgdSZXF1ZXN0EiUKCG9wZXJhdG9yGAEgASgLMhMubGFpd2VpLnYxLk9wZXJhdG9yEh8KBXF1ZXJ5GAIgASgLMhAubGFpd2VpLnYxLlF1ZXJ5EhgKC2lzX2Rpc2FibGVkGAMgASgISACIAQESLAoIc2NlbmVfaW4YBCADKA4yGi5sYWl3ZWkudjEuUHVzaC5TY2VuZS5FbnVtQg4KDF9pc19kaXNhYmxlZBpLCghSZXNwb25zZRIwCgRsaXN0GAEgAygLMiIubGFpd2VpLnYxLk9wZXJhdG9yUHVzaFNjZW5lQ29uZmlnEg0KBXRvdGFsGAIgASgDMo0FCgtQdXNoU2VydmljZRKXAQoYVXBzZXJ0T3BlcmF0b3JQdXNoQ29uZmlnEjwubGFpd2VpLnYxLlB1c2hTZXJ2aWNlTW9kZWwuVXBzZXJ0T3BlcmF0b3JQdXNoQ29uZmlnLlJlcXVlc3QaPS5sYWl3ZWkudjEuUHVzaFNlcnZpY2VNb2RlbC5VcHNlcnRPcGVyYXRvclB1c2hDb25maWcuUmVzcG9uc2USlAEKF1F1ZXJ5T3BlcmF0b3JQdXNoQ29uZmlnEjsubGFpd2VpLnYxLlB1c2hTZXJ2aWNlTW9kZWwuUXVlcnlPcGVyYXRvclB1c2hDb25maWcuUmVxdWVzdBo8LmxhaXdlaS52MS5QdXNoU2VydmljZU1vZGVsLlF1ZXJ5T3BlcmF0b3JQdXNoQ29uZmlnLlJlc3BvbnNlEqYBCh1VcHNlcnRPcGVyYXRvclB1c2hTY2VuZUNvbmZpZxJBLmxhaXdlaS52MS5QdXNoU2VydmljZU1vZGVsLlVwc2VydE9wZXJhdG9yUHVzaFNjZW5lQ29uZmlnLlJlcXVlc3QaQi5sYWl3ZWkudjEuUHVzaFNlcnZpY2VNb2RlbC5VcHNlcnRPcGVyYXRvclB1c2hTY2VuZUNvbmZpZy5SZXNwb25zZRKjAQocUXVlcnlPcGVyYXRvclB1c2hTY2VuZUNvbmZpZxJALmxhaXdlaS52MS5QdXNoU2VydmljZU1vZGVsLlF1ZXJ5T3BlcmF0b3JQdXNoU2NlbmVDb25maWcuUmVxdWVzdBpBLmxhaXdlaS52MS5QdXNoU2VydmljZU1vZGVsLlF1ZXJ5T3BlcmF0b3JQdXNoU2NlbmVDb25maWcuUmVzcG9uc2VCK1opc3ZjLWxhaXdlaS9wcm90by9nZW4vZ28vbGFpd2VpdjE7bGFpd2VpdjFQAFACYgZwcm90bzM", [file_laiweiv1_model, file_laiweiv1_service, file_laiweiv1_extend, file_tagger_tagger, file_google_protobuf_timestamp]);

/**
 * @generated from message laiwei.v1.PushServiceModel
 */
export type PushServiceModel = Message<"laiwei.v1.PushServiceModel"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.
 * Use `create(PushServiceModelSchema)` to create a new message.
 */
export const PushServiceModelSchema: GenMessage<PushServiceModel> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0);

/**
 * @generated from message laiwei.v1.PushServiceModel.UpsertOperatorPushConfig
 */
export type PushServiceModel_UpsertOperatorPushConfig = Message<"laiwei.v1.PushServiceModel.UpsertOperatorPushConfig"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.
 * Use `create(PushServiceModel_UpsertOperatorPushConfigSchema)` to create a new message.
 */
export const PushServiceModel_UpsertOperatorPushConfigSchema: GenMessage<PushServiceModel_UpsertOperatorPushConfig> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 0);

/**
 * @generated from message laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.Request
 */
export type PushServiceModel_UpsertOperatorPushConfig_Request = Message<"laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.Request"> & {
  /**
   * @generated from field: laiwei.v1.Operator operator = 1;
   */
  operator?: Operator;

  /**
   * @generated from field: bool is_disabled = 2;
   */
  isDisabled: boolean;
};

/**
 * Describes the message laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.Request.
 * Use `create(PushServiceModel_UpsertOperatorPushConfig_RequestSchema)` to create a new message.
 */
export const PushServiceModel_UpsertOperatorPushConfig_RequestSchema: GenMessage<PushServiceModel_UpsertOperatorPushConfig_Request> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 0, 0);

/**
 * @generated from message laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.Response
 */
export type PushServiceModel_UpsertOperatorPushConfig_Response = Message<"laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.Response"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.UpsertOperatorPushConfig.Response.
 * Use `create(PushServiceModel_UpsertOperatorPushConfig_ResponseSchema)` to create a new message.
 */
export const PushServiceModel_UpsertOperatorPushConfig_ResponseSchema: GenMessage<PushServiceModel_UpsertOperatorPushConfig_Response> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 0, 1);

/**
 * @generated from message laiwei.v1.PushServiceModel.QueryOperatorPushConfig
 */
export type PushServiceModel_QueryOperatorPushConfig = Message<"laiwei.v1.PushServiceModel.QueryOperatorPushConfig"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.QueryOperatorPushConfig.
 * Use `create(PushServiceModel_QueryOperatorPushConfigSchema)` to create a new message.
 */
export const PushServiceModel_QueryOperatorPushConfigSchema: GenMessage<PushServiceModel_QueryOperatorPushConfig> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 1);

/**
 * @generated from message laiwei.v1.PushServiceModel.QueryOperatorPushConfig.Request
 */
export type PushServiceModel_QueryOperatorPushConfig_Request = Message<"laiwei.v1.PushServiceModel.QueryOperatorPushConfig.Request"> & {
  /**
   * @generated from field: laiwei.v1.Operator operator = 1;
   */
  operator?: Operator;

  /**
   * @generated from field: laiwei.v1.Query query = 2;
   */
  query?: Query;

  /**
   * @generated from field: optional bool is_disabled = 3;
   */
  isDisabled?: boolean;
};

/**
 * Describes the message laiwei.v1.PushServiceModel.QueryOperatorPushConfig.Request.
 * Use `create(PushServiceModel_QueryOperatorPushConfig_RequestSchema)` to create a new message.
 */
export const PushServiceModel_QueryOperatorPushConfig_RequestSchema: GenMessage<PushServiceModel_QueryOperatorPushConfig_Request> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 1, 0);

/**
 * @generated from message laiwei.v1.PushServiceModel.QueryOperatorPushConfig.Response
 */
export type PushServiceModel_QueryOperatorPushConfig_Response = Message<"laiwei.v1.PushServiceModel.QueryOperatorPushConfig.Response"> & {
  /**
   * @generated from field: repeated laiwei.v1.OperatorPushConfig list = 1;
   */
  list: OperatorPushConfig[];

  /**
   * @generated from field: int64 total = 2;
   */
  total: bigint;
};

/**
 * Describes the message laiwei.v1.PushServiceModel.QueryOperatorPushConfig.Response.
 * Use `create(PushServiceModel_QueryOperatorPushConfig_ResponseSchema)` to create a new message.
 */
export const PushServiceModel_QueryOperatorPushConfig_ResponseSchema: GenMessage<PushServiceModel_QueryOperatorPushConfig_Response> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 1, 1);

/**
 * @generated from message laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig
 */
export type PushServiceModel_UpsertOperatorPushSceneConfig = Message<"laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.
 * Use `create(PushServiceModel_UpsertOperatorPushSceneConfigSchema)` to create a new message.
 */
export const PushServiceModel_UpsertOperatorPushSceneConfigSchema: GenMessage<PushServiceModel_UpsertOperatorPushSceneConfig> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 2);

/**
 * @generated from message laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.Request
 */
export type PushServiceModel_UpsertOperatorPushSceneConfig_Request = Message<"laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.Request"> & {
  /**
   * @generated from field: laiwei.v1.Operator operator = 1;
   */
  operator?: Operator;

  /**
   * @generated from field: laiwei.v1.Push.Scene.Enum scene = 2;
   */
  scene: Push_Scene_Enum;

  /**
   * @generated from field: bool is_disabled = 3;
   */
  isDisabled: boolean;
};

/**
 * Describes the message laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.Request.
 * Use `create(PushServiceModel_UpsertOperatorPushSceneConfig_RequestSchema)` to create a new message.
 */
export const PushServiceModel_UpsertOperatorPushSceneConfig_RequestSchema: GenMessage<PushServiceModel_UpsertOperatorPushSceneConfig_Request> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 2, 0);

/**
 * @generated from message laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.Response
 */
export type PushServiceModel_UpsertOperatorPushSceneConfig_Response = Message<"laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.Response"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.UpsertOperatorPushSceneConfig.Response.
 * Use `create(PushServiceModel_UpsertOperatorPushSceneConfig_ResponseSchema)` to create a new message.
 */
export const PushServiceModel_UpsertOperatorPushSceneConfig_ResponseSchema: GenMessage<PushServiceModel_UpsertOperatorPushSceneConfig_Response> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 2, 1);

/**
 * @generated from message laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig
 */
export type PushServiceModel_QueryOperatorPushSceneConfig = Message<"laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig"> & {
};

/**
 * Describes the message laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.
 * Use `create(PushServiceModel_QueryOperatorPushSceneConfigSchema)` to create a new message.
 */
export const PushServiceModel_QueryOperatorPushSceneConfigSchema: GenMessage<PushServiceModel_QueryOperatorPushSceneConfig> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 3);

/**
 * @generated from message laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.Request
 */
export type PushServiceModel_QueryOperatorPushSceneConfig_Request = Message<"laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.Request"> & {
  /**
   * @generated from field: laiwei.v1.Operator operator = 1;
   */
  operator?: Operator;

  /**
   * @generated from field: laiwei.v1.Query query = 2;
   */
  query?: Query;

  /**
   * @generated from field: optional bool is_disabled = 3;
   */
  isDisabled?: boolean;

  /**
   * @generated from field: repeated laiwei.v1.Push.Scene.Enum scene_in = 4;
   */
  sceneIn: Push_Scene_Enum[];
};

/**
 * Describes the message laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.Request.
 * Use `create(PushServiceModel_QueryOperatorPushSceneConfig_RequestSchema)` to create a new message.
 */
export const PushServiceModel_QueryOperatorPushSceneConfig_RequestSchema: GenMessage<PushServiceModel_QueryOperatorPushSceneConfig_Request> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 3, 0);

/**
 * @generated from message laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.Response
 */
export type PushServiceModel_QueryOperatorPushSceneConfig_Response = Message<"laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.Response"> & {
  /**
   * @generated from field: repeated laiwei.v1.OperatorPushSceneConfig list = 1;
   */
  list: OperatorPushSceneConfig[];

  /**
   * @generated from field: int64 total = 2;
   */
  total: bigint;
};

/**
 * Describes the message laiwei.v1.PushServiceModel.QueryOperatorPushSceneConfig.Response.
 * Use `create(PushServiceModel_QueryOperatorPushSceneConfig_ResponseSchema)` to create a new message.
 */
export const PushServiceModel_QueryOperatorPushSceneConfig_ResponseSchema: GenMessage<PushServiceModel_QueryOperatorPushSceneConfig_Response> = /*@__PURE__*/
  messageDesc(file_laiweiv1_endpoint_push, 0, 3, 1);

/**
 * @generated from service laiwei.v1.PushService
 */
export const PushService: GenService<{
  /**
   * @generated from rpc laiwei.v1.PushService.UpsertOperatorPushConfig
   */
  upsertOperatorPushConfig: {
    methodKind: "unary";
    input: typeof PushServiceModel_UpsertOperatorPushConfig_RequestSchema;
    output: typeof PushServiceModel_UpsertOperatorPushConfig_ResponseSchema;
  },
  /**
   * @generated from rpc laiwei.v1.PushService.QueryOperatorPushConfig
   */
  queryOperatorPushConfig: {
    methodKind: "unary";
    input: typeof PushServiceModel_QueryOperatorPushConfig_RequestSchema;
    output: typeof PushServiceModel_QueryOperatorPushConfig_ResponseSchema;
  },
  /**
   * @generated from rpc laiwei.v1.PushService.UpsertOperatorPushSceneConfig
   */
  upsertOperatorPushSceneConfig: {
    methodKind: "unary";
    input: typeof PushServiceModel_UpsertOperatorPushSceneConfig_RequestSchema;
    output: typeof PushServiceModel_UpsertOperatorPushSceneConfig_ResponseSchema;
  },
  /**
   * @generated from rpc laiwei.v1.PushService.QueryOperatorPushSceneConfig
   */
  queryOperatorPushSceneConfig: {
    methodKind: "unary";
    input: typeof PushServiceModel_QueryOperatorPushSceneConfig_RequestSchema;
    output: typeof PushServiceModel_QueryOperatorPushSceneConfig_ResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_laiweiv1_endpoint_push, 0);

