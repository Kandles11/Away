/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a user
     * Only admins can create other users.
     * @returns User Created
     * @throws ApiError
     */
    public postUsers({
        requestBody,
    }: {
        requestBody: {
            name: string;
            /**
             * must be unique
             */
            email: string;
            /**
             * At least one number and one letter
             */
            password: string;
            role: 'user' | 'admin';
        },
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email already taken`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Get all users
     * Only admins can retrieve all users.
     * @returns any OK
     * @throws ApiError
     */
    public getUsers({
        name,
        role,
        sortBy,
        limit,
        page = 1,
    }: {
        /**
         * User name
         */
        name?: string,
        /**
         * User role
         */
        role?: string,
        /**
         * sort by query in the form of field:desc/asc (ex. name:asc)
         */
        sortBy?: string,
        /**
         * Maximum number of users
         */
        limit?: number,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<{
        results?: Array<User>;
        page?: number;
        limit?: number;
        totalPages?: number;
        totalResults?: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                'name': name,
                'role': role,
                'sortBy': sortBy,
                'limit': limit,
                'page': page,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Get a user
     * Logged in users can fetch only their own user information. Only admins can fetch other users.
     * @returns User OK
     * @throws ApiError
     */
    public getUsers1({
        id,
    }: {
        /**
         * User id
         */
        id: (string | 'me'),
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * Update a user
     * Logged in users can only update their own information. Only admins can update other users.
     * @returns User OK
     * @throws ApiError
     */
    public patchUsers({
        id,
        requestBody,
    }: {
        /**
         * User id
         */
        id: string,
        requestBody: {
            name?: string;
            /**
             * must be unique
             */
            email?: string;
            /**
             * At least one number and one letter
             */
            password?: string;
        },
    }): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email already taken`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * Delete a user
     * Logged in users can delete only themselves. Only admins can delete other users.
     * @returns any No content
     * @throws ApiError
     */
    public deleteUsers({
        id,
    }: {
        /**
         * User id
         */
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
}
