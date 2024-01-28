/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Baggage } from '../models/Baggage';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class BaggageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a new baggage
     * @returns Baggage OK
     * @throws ApiError
     */
    public postBaggage({
        requestBody,
    }: {
        requestBody: {
            user: string;
            tagData: string;
        },
    }): CancelablePromise<Baggage> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/baggage',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Update baggage information
     * @returns Baggage OK
     * @throws ApiError
     */
    public patchBaggage({
        requestBody,
    }: {
        requestBody: {
            tagData: string;
            claimed?: boolean;
        },
    }): CancelablePromise<Baggage> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/baggage',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get baggage information
     * @returns Baggage OK
     * @throws ApiError
     */
    public getBaggage({
        requestBody,
    }: {
        requestBody: {
            tagData: string;
        },
    }): CancelablePromise<Baggage> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/baggage',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Delete baggage information
     * @returns any Baggage deleted successfully
     * @throws ApiError
     */
    public deleteBaggage({
        requestBody,
    }: {
        requestBody: {
            tagData: string;
        },
    }): CancelablePromise<{
        message?: string;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/baggage',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Baggage not found`,
            },
        });
    }
    /**
     * Get baggage by user ID
     * @returns Baggage An array of baggage objects
     * @throws ApiError
     */
    public getBaggageUser({
        user,
    }: {
        /**
         * The user ID
         */
        user: string,
    }): CancelablePromise<Array<Baggage>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/baggage/user/{user}',
            path: {
                'user': user,
            },
            errors: {
                400: `Bad Request`,
                404: `No baggage found for the user`,
            },
        });
    }
}
