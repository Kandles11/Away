/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthTokens } from '../models/AuthTokens';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Register as user
     * @returns any Created
     * @throws ApiError
     */
    public postAuthRegister({
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
        },
    }): CancelablePromise<{
        user?: User;
        tokens?: AuthTokens;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Email already taken`,
            },
        });
    }
    /**
     * Login
     * @returns any OK
     * @throws ApiError
     */
    public postAuthLogin({
        requestBody,
    }: {
        requestBody: {
            email: string;
            password: string;
        },
    }): CancelablePromise<{
        user?: User;
        tokens?: AuthTokens;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid email or password`,
            },
        });
    }
    /**
     * Logout
     * @returns void
     * @throws ApiError
     */
    public postAuthLogout({
        requestBody,
    }: {
        requestBody: {
            refreshToken: string;
        },
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Refresh auth tokens
     * @returns AuthTokens OK
     * @throws ApiError
     */
    public postAuthRefreshTokens({
        requestBody,
    }: {
        requestBody: {
            refreshToken: string;
        },
    }): CancelablePromise<AuthTokens> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/refresh-tokens',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Forgot password
     * An email will be sent to reset password.
     * @returns void
     * @throws ApiError
     */
    public postAuthForgotPassword({
        requestBody,
    }: {
        requestBody: {
            email: string;
        },
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Reset password
     * @returns void
     * @throws ApiError
     */
    public postAuthResetPassword({
        token,
        requestBody,
    }: {
        /**
         * The reset password token
         */
        token: string,
        requestBody: {
            /**
             * At least one number and one letter
             */
            password: string;
        },
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/reset-password',
            query: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Password reset failed`,
            },
        });
    }
    /**
     * Send verification email
     * An email will be sent to verify email.
     * @returns void
     * @throws ApiError
     */
    public postAuthSendVerificationEmail(): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/send-verification-email',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * verify email
     * @returns void
     * @throws ApiError
     */
    public postAuthVerifyEmail({
        token,
    }: {
        /**
         * The verify email token
         */
        token: string,
    }): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/verify-email',
            query: {
                'token': token,
            },
            errors: {
                401: `verify email failed`,
            },
        });
    }
}
