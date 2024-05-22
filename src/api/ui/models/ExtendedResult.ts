/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionHistoryStep } from './ActionHistoryStep';
import type { AlgorithmReference } from './AlgorithmReference';
import type { EdgeInterface } from './EdgeInterface';
import type { PositionedNode } from './PositionedNode';
export type ExtendedResult = {
    algorithm: AlgorithmReference;
    created_at?: string;
    nodes: Record<string, PositionedNode>;
    edges: Array<EdgeInterface>;
    action_history: Array<ActionHistoryStep>;
    variables?: (Record<string, any> | null);
    data_loader_hash?: (string | null);
    algorithm_hash?: (string | null);
    variables_hash?: (string | null);
    version?: (number | null);
};

