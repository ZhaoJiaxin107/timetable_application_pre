use test;
drop table users
create table users(
	id int identity(1,1) not null,
	first_name nvarchar(20) not null,
	last_name nvarchar(20) not null,
	email nvarchar(40) not null,
	mobile_num nvarchar(40) not null,
	username nvarchar(40) not null,
	password nvarchar(250) not null,
	constraint users_pk primary key(id)
);
select * from users;
delete from users where id=3;
insert into users(first_name,last_name,email,mobile_num,username,password) 
values('Jiaxin','Zhao','jzhao537@uwo.ca','1-(519)6944295','jzhao537','123456')
insert into users(first_name,last_name,email,mobile_num,username,password) 
values('Yiyun','Yang','yyan496@uwo.ca','1-(226)9985643','yyan496','123456')
insert into users(first_name,last_name,email,mobile_num,username,password) 
values('Utkarsha','Bakshi','ubakshi2@uwo.ca','1-(226)9983421','ubakshi2','123456')
insert into users(first_name,last_name,email,mobile_num,username,password) 
values('Bharti','Upadhyay','bupadhy@uwo.ca','1-(519)5562432','bupadhy','123456')

select id,first_name,last_name,email from users where username = 'jzhao537' and password = '123456'