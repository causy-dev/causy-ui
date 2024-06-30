/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Algorithm } from '../models/Algorithm'
import type { ExtendedExperiment } from '../models/ExtendedExperiment'
import type { ExtendedResult } from '../models/ExtendedResult'
import type { Workspace } from '../models/Workspace'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
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
      url: '/api/v1/status'
    })
  }
  /**
   * Get Model
   * Get the current model.
   * @returns ExtendedResult Successful Response
   * @throws ApiError
   */
  public static getModelApiV1ModelGet(): CancelablePromise<ExtendedResult> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/model'
    })
  }
  /**
   * Get Workspace
   * @returns Workspace Successful Response
   * @throws ApiError
   */
  public static getWorkspaceApiV1WorkspaceGet(): CancelablePromise<Workspace> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/workspace'
    })
  }
  /**
   * Get Latest Experiment
   * Get the current experiment.
   * @param experimentName
   * @returns ExtendedResult Successful Response
   * @throws ApiError
   */
  public static getLatestExperimentApiV1ExperimentsExperimentNameLatestGet(
    experimentName: string
  ): CancelablePromise<ExtendedResult> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/experiments/{experiment_name}/latest',
      path: {
        experiment_name: experimentName
      },
      errors: {
        422: `Validation Error`
      }
    })
  }
  /**
   * Get Experiment
   * Get the current experiment.
   * @param experimentName
   * @param versionNumber
   * @returns ExtendedResult Successful Response
   * @throws ApiError
   */
  public static getExperimentApiV1ExperimentsExperimentNameVersionNumberGet(
    experimentName: string,
    versionNumber: number
  ): CancelablePromise<ExtendedResult> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/experiments/{experiment_name}/{version_number}',
      path: {
        experiment_name: experimentName,
        version_number: versionNumber
      },
      errors: {
        422: `Validation Error`
      }
    })
  }
  /**
   * Get Experiments
   * Get the current experiment.
   * @returns ExtendedExperiment Successful Response
   * @throws ApiError
   */
  public static getExperimentsApiV1ExperimentsGet(): CancelablePromise<Array<ExtendedExperiment>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/experiments'
    })
  }
  /**
   * Get Algorithm
   * Get the current algorithm.
   * @param referenceType
   * @param reference
   * @returns Algorithm Successful Response
   * @throws ApiError
   */
  public static getAlgorithmApiV1AlgorithmReferenceTypeReferenceGet(
    referenceType: string,
    reference: string
  ): CancelablePromise<Algorithm> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/algorithm/{reference_type}/{reference}',
      path: {
        reference_type: referenceType,
        reference: reference
      },
      errors: {
        422: `Validation Error`
      }
    })
  }
}
