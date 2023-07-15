declare const _default: () => {
    port: number;
    database: {
        type: string;
        synchronize: boolean;
        logging: boolean;
        host: string;
        port: string | number;
        username: string;
        password: string;
        database: string;
        schema: string;
        extra: {
            connectionLimit: number;
        };
        autoLoadEntities: boolean;
    };
};
export default _default;
