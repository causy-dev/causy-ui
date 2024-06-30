/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CausyAlgorithm } from './CausyAlgorithm'
import type { CausyEdge_Input } from './CausyEdge_Input'
import type { CausyNode } from './CausyNode'
export type CausyModel_Input = {
  name: string
  created_at: string
  algorithm: CausyAlgorithm
  steps: Array<Record<string, any>>
  nodes: Record<string, CausyNode>
  edges: Array<CausyEdge_Input>
}
