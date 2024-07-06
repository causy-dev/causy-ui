/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionHistoryStep_Input } from './ActionHistoryStep_Input';
import type { AlgorithmReference } from './AlgorithmReference';
import type { EdgeInterface_Input } from './EdgeInterface_Input';
import type { PositionedNode_Input } from './PositionedNode_Input';
export type ExtendedResult_Input = {
    algorithm: AlgorithmReference;
    created_at?: string;
    nodes: Record<string, PositionedNode_Input>;
    edges: Array<EdgeInterface_Input>;
    action_history: Array<ActionHistoryStep_Input>;
    variables?: (Record<string, any> | null);
    data_loader_hash?: (string | null);
    algorithm_hash?: (string | null);
    variables_hash?: (string | null);
    version?: (number | null);
};

