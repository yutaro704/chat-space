# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|Email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :message
- has_many :group thought user_group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users

## user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :users
- belongs_to :message

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
has_many :users thought user_group
