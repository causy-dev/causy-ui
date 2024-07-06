/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExtensionInterface } from './ExtensionInterface';
import type { LogicStepInterface } from './LogicStepInterface';
export type Algorithm = {
    name: string;
    pipeline_steps: Array<LogicStepInterface>;
    edge_types: Array<any>;
    extensions?: (Array<ExtensionInterface> | null);
    variables?: null;
};

