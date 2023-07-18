-- t_accounts  (only use for login)//
CREATE TABLE t_accounts (
		id serial8 PRIMARY KEY,
		user_id bigint NULL,
		account_type bigint NOT NULL,
		login_name VARCHAR ( 100 ) NOT NULL,
		password VARCHAR ( 100 ) NULL,
		salt VARCHAR ( 100 )  NULL,
		reset_password_expired TIMESTAMP,
		reset_password_key VARCHAR ( 100 )  NULL,
		status int2 DEFAULT 1,
		create_user VARCHAR ( 100 )  NULL DEFAULT 'system',
		created_at TIMESTAMP ,
		updated_at TIMESTAMP
);
comment on column t_accounts.account_type is 'USER(0), ADMIN(1)';
comment on column t_accounts.password is 'MD5 ( SALT + RAW PASSWORD + SALT )';
comment on column t_accounts.salt is 'RANDOM (from timestamp)';
comment on column t_accounts.reset_password_expired is 'Not null when user request forgot password';
comment on column t_accounts.reset_password_key is 'Not null when user request forgot password';
comment on column t_accounts.status is '0: Inactive, 1: Activate, 9: Deleted';

-- t_users (use for userInfo)
CREATE TABLE t_users (
		id serial8 PRIMARY KEY,
		account_id bigint NOT NULL,
		email VARCHAR ( 100 ) NULL,
		fullname VARCHAR ( 100 ) NULL,
		shortname VARCHAR ( 100 )  NULL,
		bio VARCHAR ( 1024 )  NULL,
		address VARCHAR ( 1024 )  NULL,
		picture VARCHAR ( 100 ) NULL,
        phone VARCHAR ( 100 ) NULL,
        website VARCHAR ( 100 ) NULL,
        facebook VARCHAR ( 100 ) NULL,
        twitch VARCHAR ( 100 ) NULL,
        instagram VARCHAR ( 100 ) NULL,
        gender int2 DEFAULT 0,
        birthday date null,
        roles VARCHAR ( 255 ) NULL,
        user_setting_data jsonb null,
        status int2 DEFAULT 1,
	    create_user VARCHAR ( 100 )  NULL DEFAULT 'system',
		created_at TIMESTAMP ,
		updated_at TIMESTAMP
);
comment on column t_users.fullname is 'Họ và tên';
comment on column t_users.shortname is 'Ten viet tắt(tên thân mật) neu co';
comment on column t_users.user_setting_data is 'Jsonb data setting';
comment on column t_users.status is '0: Inactive, 1: Activate, 9: Deleted';

-- m_local_file  (file info)//
CREATE TABLE m_local_file (
  id serial8 PRIMARY KEY,
  user_id bigint NULL,
  filename VARCHAR ( 255 ) NULL,
  path VARCHAR ( 255 ) NULL,
  mimetype VARCHAR ( 100 )  NULL,
  created_at TIMESTAMP
);

comment on column m_local_file.user_id is 'owner';
CREATE UNIQUE INDEX idx_m_local_file_path ON m_local_file(path);

