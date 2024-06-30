/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateShareRequest } from '../models/CreateShareRequest'
import type { ShareCreatedResponse } from '../models/ShareCreatedResponse'
import type { ShareResponse } from '../models/ShareResponse'
import type { UpdateShareRequest } from '../models/UpdateShareRequest'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class V1Service {
  /**
   * Create Share
   * Create new share. Valid until is optional.
   * @param requestBody
   * @returns ShareCreatedResponse Successful Response
   * @throws ApiError
   */
  public static createShareV1SharePost(
    requestBody: CreateShareRequest
  ): CancelablePromise<ShareCreatedResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/share',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    })
  }
  /**
   * Update Share
   * Update share data by share id. Management code is required.
   * @param shareId
   * @param requestBody
   * @returns ShareResponse Successful Response
   * @throws ApiError
   */
  public static updateShareV1ShareShareIdPatch(
    shareId: string,
    requestBody: UpdateShareRequest
  ): CancelablePromise<ShareResponse> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/v1/share/{share_id}',
      path: {
        share_id: shareId
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`
      }
    })
  }
  /**
   * Get Share
   * Get share data by share id.
   * @param shareId
   * @returns ShareResponse Successful Response
   * @throws ApiError
   */
  public static getShareV1ShareShareIdGet(shareId: string): CancelablePromise<ShareResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/share/{share_id}',
      path: {
        share_id: shareId
      },
      errors: {
        422: `Validation Error`
      }
    })
  }
  /**
   * Delete Share
   * Delete share by share id. Management code is required.
   * @param shareId
   * @param managementCode
   * @returns void
   * @throws ApiError
   */
  public static deleteShareV1ShareShareIdDelete(
    shareId: string,
    managementCode: string
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/share/{share_id}',
      path: {
        share_id: shareId
      },
      query: {
        management_code: managementCode
      },
      errors: {
        422: `Validation Error`
      }
    })
  }
}
