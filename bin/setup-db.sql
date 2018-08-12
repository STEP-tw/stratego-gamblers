DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS setups;
create table users (
  username text primary key,
  password text not null,
  name text not null
);

create table setups (
  index SERIAL,
  mode varchar(20) not null,
  name varchar(30) not null,
  setup text not null,
  owner varchar(30)
 );