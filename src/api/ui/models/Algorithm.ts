/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EdgeTypeInterface } from './EdgeTypeInterface';
import type { ExtensionInterface } from './ExtensionInterface';
import type { LogicStepInterface } from './LogicStepInterface';
export type Algorithm = {
    name: string;
    pipeline_steps: Array<LogicStepInterface>;
    edge_types: Array<EdgeTypeInterface>;
    extensions?: (Array<ExtensionInterface> | null);
    variables?: null;
};

