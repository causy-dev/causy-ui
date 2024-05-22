/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DataLoaderType } from './DataLoaderType';
/**
 * represents a single data loader
 * :param type: the type of dataloader
 * :param reference: path to either the python class which can be executed to load the data or the data source file itself
 */
export type DataLoaderReference = {
    type: DataLoaderType;
    reference: string;
    options?: (Record<string, any> | null);
};

