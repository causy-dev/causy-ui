/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExperimentVersion } from './ExperimentVersion';
export type ExtendedExperiment = {
    pipeline: string;
    data_loader: string;
    variables?: (Record<string, any> | null);
    versions?: (Array<ExperimentVersion> | null);
    name?: string;
};

