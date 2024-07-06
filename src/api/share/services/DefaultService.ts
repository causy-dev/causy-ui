/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIStatus } from '../models/APIStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Root
     * @returns APIStatus Successful Response
     * @throws ApiError
     */
    public static rootGet(): CancelablePromise<APIStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
    /**
     * Get Legal Document
     * Get document by path.
     * @param docPath
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getLegalDocumentDocumentsDocPathGet(
        docPath: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documents/{doc_path}',
            path: {
                'doc_path': docPath,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Legal Document
     * Get share UI.
     * @param shareId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getLegalDocumentShareShareIdGet(
        shareId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/share/{share_id}',
            path: {
                'share_id': shareId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
