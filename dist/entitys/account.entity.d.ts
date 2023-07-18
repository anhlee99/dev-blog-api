import { BaseEntity } from 'typeorm';
export declare class AccountEntity extends BaseEntity {
    id: number;
    user_id: number;
    account_type: number;
    login_name: string;
    password: string;
    salt: string;
    reset_password_expired: Date;
    reset_password_key: string;
    status: number;
    create_user: string;
    created_at: Date;
    updated_at: Date;
    insertCreated(): void;
    insertUpdated(): void;
}
