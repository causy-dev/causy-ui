/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CausyAlgorithm } from '../models/CausyAlgorithm';
import type { CausyExtendedResult } from '../models/CausyExtendedResult';
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
     * @returns CausyExtendedResult Successful Response
     * @throws ApiError
     */
    public static getModelApiV1ModelGet(): CancelablePromise<CausyExtendedResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/model',
        });
    }
    /**
     * Get Algorithm
     * Get the current algorithm.
     * @param referenceType
     * @param reference
     * @returns CausyAlgorithm Successful Response
     * @throws ApiError
     */
    public static getAlgorithmApiV1AlgorithmReferenceTypeReferenceGet(
        referenceType: string,
        reference: string,
    ): CancelablePromise<CausyAlgorithm> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/algorithm/{reference_type}/{reference}',
            path: {
                'reference_type': referenceType,
                'reference': reference,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
