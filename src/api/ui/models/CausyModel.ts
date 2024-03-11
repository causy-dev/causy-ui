/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CausyAlgorithm } from './CausyAlgorithm';
import type { CausyEdge } from './CausyEdge';
import type { CausyNode } from './CausyNode';
export type CausyModel = {
    name: string;
    created_at: string;
    algorithm: CausyAlgorithm;
    steps: Array<Record<string, any>>;
    nodes: Record<string, CausyNode>;
    edges: Array<CausyEdge>;
};

