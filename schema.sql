create database if not exists wallet_service;
use wallet_service;


create table users (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    name varchar(250) not null,
    email varchar(100) not null unique,
    created_at TIMESTAMP default current_timestamp,
    updated_at TIMESTAMP default current_timestamp on update current_timestamp
)

create table wallets (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id bigint unique,
    balance float(15,2) default 0,
    status enum('ACTIVE', 'BLOCKED') default 'ACTIVE',
    created_at TIMESTAMP default current_timestamp,
    updated_at TIMESTAMP default current_timestamp on update current_timestamp

    Foreign key (user_id) references users(id) 
)

create table transactions (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    from_user_id int,
    to_user_id int,
    amount float(15,2),
    status enum('PENDING', 'SUCCESS', 'FAILED') default 'PENDING',
    failure_remark varchar(255) null,
    created_at TIMESTAMP default current_timestamp
)

create index idx_wallet_user on wallets (user_id);
create index idx_transactions_status on transactions (status);
create index idx_transactions_created_at on transactions (created_at);
