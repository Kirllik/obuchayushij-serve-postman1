

module.exports = {
    `create table if not exists users(
  id int primary key auto_increment,
  name varchar(255) not null,
  age varchar(255) not null
)`;
}
