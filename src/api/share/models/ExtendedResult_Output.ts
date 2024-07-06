/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionHistoryStep_Output } from './ActionHistoryStep_Output';
import type { AlgorithmReference } from './AlgorithmReference';
import type { EdgeInterface_Output } from './EdgeInterface_Output';
import type { PositionedNode_Output } from './PositionedNode_Output';
export type ExtendedResult_Output = {
    algorithm: AlgorithmReference;
    created_at?: string;
    nodes: Record<string, PositionedNode_Output>;
    edges: Array<EdgeInterface_Output>;
    action_history: Array<ActionHistoryStep_Output>;
    variables?: (Record<string, any> | null);
    data_loader_hash?: (string | null);
    algorithm_hash?: (string | null);
    variables_hash?: (string | null);
    version?: (number | null);
};

