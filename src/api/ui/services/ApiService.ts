/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CausyModel } from '../models/CausyModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
    /**
     * Get Status
     * Get the current status of the API.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getStatusApiV1StatusGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/status',
        });
    }
    /**
     * Get Model
     * Get the current model.
     * @returns CausyModel Successful Response
     * @throws ApiError
     */
    public static getModelApiV1ModelGet(): CancelablePromise<CausyModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/model',
        });
    }
}
