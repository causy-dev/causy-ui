/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CausyAlgorithm } from './CausyAlgorithm'
import type { CausyEdge_Output } from './CausyEdge_Output'
import type { CausyNode } from './CausyNode'
export type CausyModel_Output = {
  name: string
  created_at: string
  algorithm: CausyAlgorithm
  steps: Array<Record<string, any>>
  nodes: Record<string, CausyNode>
  edges: Array<CausyEdge_Output>
}
