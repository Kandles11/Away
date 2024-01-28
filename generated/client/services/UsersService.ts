/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create a user
     * Only admins can create other users.
     * @param requestBody
     * @returns User Created
     * @throws ApiError
     */
    public static postUsers(
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
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
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
     * @param name User name
     * @param role User role
     * @param sortBy sort by query in the form of field:desc/asc (ex. name:asc)
     * @param limit Maximum number of users
     * @param page Page number
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers(
        name?: string,
        role?: string,
        sortBy?: string,
        limit?: number,
        page: number = 1,
    ): CancelablePromise<{
        results?: Array<User>;
        page?: number;
        limit?: number;
        totalPages?: number;
        totalResults?: number;
    }> {
        return __request(OpenAPI, {
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
     * @param id User id
     * @returns User OK
     * @throws ApiError
     */
    public static getUsers1(
        id: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
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
     * @param id User id
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public static patchUsers(
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
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
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
     * @param id User id
     * @returns any No content
     * @throws ApiError
     */
    public static deleteUsers(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
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
