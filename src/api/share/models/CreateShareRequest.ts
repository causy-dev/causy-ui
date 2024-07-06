/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExtendedResult_Input } from './ExtendedResult_Input';
export type CreateShareRequest = {
    workspace_name?: (string | null);
    experiment_name?: (string | null);
    experiment_date?: (string | null);
    data?: (ExtendedResult_Input | null);
    algorithm?: (Record<string, any> | null);
    valid_until?: (string | null);
};

