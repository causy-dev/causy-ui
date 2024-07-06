/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EdgeTypeInterface } from './EdgeTypeInterface';
import type { NodeInterface_Input } from './NodeInterface_Input';
/**
 * Edge interface for the graph
 * A graph edge is defined by two nodes and an edge type. It can also have metadata.
 */
export type EdgeInterface_Input = {
    'u': NodeInterface_Input;
    'v': NodeInterface_Input;
    edge_type: EdgeTypeInterface;
    metadata?: Record<string, (string | number | boolean | Record<string, (string | number | boolean)>)>;
};

