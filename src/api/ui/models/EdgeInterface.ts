/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EdgeTypeInterface } from './EdgeTypeInterface';
import type { NodeInterface } from './NodeInterface';
/**
 * Edge interface for the graph
 * A graph edge is defined by two nodes and an edge type. It can also have metadata.
 */
export type EdgeInterface = {
    'u': NodeInterface;
    'v': NodeInterface;
    edge_type: EdgeTypeInterface;
    metadata?: Record<string, any>;
};

