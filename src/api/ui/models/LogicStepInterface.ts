/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExitConditionInterface } from './ExitConditionInterface';
import type { PipelineStepInterface } from './PipelineStepInterface';
export type LogicStepInterface = {
    pipeline_steps?: (Array<PipelineStepInterface> | null);
    exit_condition?: (ExitConditionInterface | null);
    readonly name: string;
};

