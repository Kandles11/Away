/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthTokens } from '../models/AuthTokens';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register as user
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postAuthRegister(
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
    ): CancelablePromise<{
        user?: User;
        tokens?: AuthTokens;
    }> {
        return __request(OpenAPI, {
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
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postAuthLogin(
        requestBody: {
            email: string;
            password: string;
        },
    ): CancelablePromise<{
        user?: User;
        tokens?: AuthTokens;
    }> {
        return __request(OpenAPI, {
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
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postAuthLogout(
        requestBody: {
            refreshToken: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
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
     * @param requestBody
     * @returns AuthTokens OK
     * @throws ApiError
     */
    public static postAuthRefreshTokens(
        requestBody: {
            refreshToken: string;
        },
    ): CancelablePromise<AuthTokens> {
        return __request(OpenAPI, {
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
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postAuthForgotPassword(
        requestBody: {
            email: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
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
     * @param token The reset password token
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postAuthResetPassword(
        token: string,
        requestBody: {
            /**
             * At least one number and one letter
             */
            password: string;
        },
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
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
    public static postAuthSendVerificationEmail(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/send-verification-email',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * verify email
     * @param token The verify email token
     * @returns void
     * @throws ApiError
     */
    public static postAuthVerifyEmail(
        token: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
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
