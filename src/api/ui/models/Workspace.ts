/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Algorithm } from './Algorithm'
import type { AlgorithmReference } from './AlgorithmReference'
import type { DataLoaderReference } from './DataLoaderReference'
import type { Experiment } from './Experiment'
export type Workspace = {
  name: string
  author: string | null
  pipelines: Record<string, Algorithm | AlgorithmReference> | null
  data_loaders: Record<string, DataLoaderReference> | null
  experiments: Record<string, Experiment> | null
}
