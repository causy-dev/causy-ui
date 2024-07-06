/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestResult_Input } from './TestResult_Input';
export type ActionHistoryStep_Input = {
    name: string;
    duration?: (number | null);
    actions?: (Array<TestResult_Input> | null);
    steps?: (Array<ActionHistoryStep_Input> | null);
};

