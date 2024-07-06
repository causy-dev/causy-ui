/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Algorithm } from './Algorithm';
import type { ExtendedResult_Output } from './ExtendedResult_Output';
export type ShareResponse = {
    share_id: string;
    workspace_name?: (string | null);
    experiment_name?: (string | null);
    experiment_date?: (string | null);
    data?: (ExtendedResult_Output | null);
    algorithm?: (Algorithm | null);
    valid_until?: (string | null);
    created_at?: (string | null);
    updated_at?: (string | null);
};

