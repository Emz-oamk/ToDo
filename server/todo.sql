drop table if exists task;
drop table if exists account;

create table task (
    id serial primary key,
    description varchar(255) not null
);

create table account (
    id serial primary key,
    email varchar(50) not null unique,
    password varchar(255) not null
);

insert into task (description) values
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to production'),
('Conduct a code review with peers');

insert into task (description) values ('My test task');
insert into task (description) values ('My other test task');
