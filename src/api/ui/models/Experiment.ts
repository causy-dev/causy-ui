/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * represents a single experiment
 * :param name: name of the experiment
 * :param pipeline: the name of the pipeline used
 */
export type Experiment = {
    pipeline: string;
    data_loader: string;
    variables?: (Record<string, any> | null);
};

