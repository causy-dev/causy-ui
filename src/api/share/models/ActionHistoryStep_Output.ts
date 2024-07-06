/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestResult_Output } from './TestResult_Output';
export type ActionHistoryStep_Output = {
    name: string;
    duration?: (number | null);
    actions?: (Array<TestResult_Output> | null);
    steps?: (Array<ActionHistoryStep_Output> | null);
};

