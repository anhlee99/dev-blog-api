export declare class UserEntity {
    id: number;
    account_id: number;
    email: string;
    fullname: string;
    shortname: string;
    bio: string;
    address: string;
    picture: string;
    phone: string;
    website: string;
    facebook: string;
    twitch: string;
    instagram: string;
    gender: number;
    birthday: Date;
    roles: string;
    user_setting_data: JSON;
    status: number;
    create_user: string;
    created_at: Date;
    updated_at: Date;
    insertCreated(): void;
    insertUpdated(): void;
}
