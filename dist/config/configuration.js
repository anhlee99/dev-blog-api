"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurationValidate = exports.configuration = void 0;
const Joi = require("joi");
function configuration() {
    return {
        port: parseInt(process.env.PORT, 10) || 3000,
        database: {
            type: process.env.DB_TYPE || 'postgres',
            synchronize: false,
            logging: true,
            host: process.env.DB_HOST || 'masterHost',
            port: process.env.DB_PORT || 5432,
            username: process.env.DB_USER || 'username',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_NAME || 'dbname',
            schema: process.env.DB_SCHEMA || 'dev_blog',
            extra: {
                connectionLimit: 30,
            },
            autoLoadEntities: true,
        },
        UPLOADED_FILES_DESTINATION: process.env.UPLOADED_FILES_DESTINATION,
        UPLOADED_FILES_FILE_LIMIT_SIZE: process.env.UPLOADED_FILES_FILE_LIMIT_SIZE || (3 * 1024),
    };
}
exports.configuration = configuration;
exports.configurationValidate = {
    UPLOADED_FILES_DESTINATION: Joi.string().required(),
};
//# sourceMappingURL=configuration.js.map