/**
 * Represents a user profile within the application.
 * Defines the essential identity and authorization data for a user session.
 */
export interface UserProfile {
    /** Unique identifier for the user */
    id: string;

    /** Primary email address */
    email: string;

    /** Unique login name */
    username: string;

    /** User's given name */
    firstName: string;

    /** User's family name */
    lastName: string;

    /** Optional URL to the user's profile picture or avatar */
    avatarUrl?: string;

    /** System role determining access permissions */
    role: 'user' | 'admin' | 'manager';

    /** Optional authentication token for API communication */
    token?: string;
}
