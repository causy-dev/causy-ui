/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExitConditionInterface } from './ExitConditionInterface';
import type { VariableReference } from './VariableReference';
export type LogicStepInterface = {
    pipeline_steps?: null;
    exit_condition?: (ExitConditionInterface | null);
    display_name?: (string | VariableReference | null);
    readonly name: string;
};

