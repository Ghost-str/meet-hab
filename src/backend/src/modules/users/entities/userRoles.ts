export const USER_ROLES = ['Anonym', 'Admin', 'User'] as const;
export const DEFAULT_ROLE: UserRole = 'User';
export type UserRole = (typeof USER_ROLES)[number];
