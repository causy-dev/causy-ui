/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActionHistoryStep } from './ActionHistoryStep';
import type { CausyAlgorithmReference } from './CausyAlgorithmReference';
import type { EdgeInterface } from './EdgeInterface';
import type { PositionedNode } from './PositionedNode';
export type CausyExtendedResult = {
    algorithm: CausyAlgorithmReference;
    created_at?: string;
    nodes: Record<string, PositionedNode>;
    edges: Array<EdgeInterface>;
    action_history: Array<ActionHistoryStep>;
};

