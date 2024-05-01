/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GeneratorInterface } from './GeneratorInterface';
export type PipelineStepInterface = {
    number_of_comparison_elements?: number;
    generator?: (GeneratorInterface | null);
    threshold?: (number | null);
    chunk_size_parallel_processing?: number;
    parallel?: boolean;
    readonly name: string;
};

