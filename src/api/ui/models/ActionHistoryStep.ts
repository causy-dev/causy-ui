/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestResult } from './TestResult';
export type ActionHistoryStep = {
    name: string;
    duration?: (number | null);
    actions?: (Array<TestResult> | null);
    steps?: (Array<ActionHistoryStep> | null);
};

