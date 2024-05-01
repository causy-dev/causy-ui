/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CausyExtension } from './CausyExtension';
import type { EdgeTypeInterface } from './EdgeTypeInterface';
import type { LogicStepInterface } from './LogicStepInterface';
import type { PipelineStepInterface } from './PipelineStepInterface';
export type CausyAlgorithm = {
    name: string;
    pipeline_steps: Array<(PipelineStepInterface | LogicStepInterface)>;
    edge_types: Array<EdgeTypeInterface>;
    extensions?: (Array<CausyExtension> | null);
};

