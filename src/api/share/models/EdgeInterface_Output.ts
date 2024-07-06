/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EdgeTypeInterface } from './EdgeTypeInterface';
import type { NodeInterface_Output } from './NodeInterface_Output';
/**
 * Edge interface for the graph
 * A graph edge is defined by two nodes and an edge type. It can also have metadata.
 */
export type EdgeInterface_Output = {
    'u': NodeInterface_Output;
    'v': NodeInterface_Output;
    edge_type: EdgeTypeInterface;
    metadata?: Record<string, (string | number | boolean | Record<string, (string | number | boolean)>)>;
};

