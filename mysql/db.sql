create table languages(
    id int not null auto_increment,
    name varchar(200),
    primary key(id)
);

create table countries(
    id int not null auto_increment, 
    name varchar(100) not null, 
    flag varchar(2000) not null, 
    language_id int not null, 
    capital varchar(100) not null, 
    primary key(id),
    foreign key(language_id) references languages(id)
);

create table users(
    id int not null auto_increment, 
    first_name varchar(100) not null, 
    last_name varchar(100) not null, 
    country_id int not null, 
    username varchar(100) not null, 
    admin varchar(1) not null, 
    password varchar(100) not null, 
    primary key(id),
    foreign key(country_id) references countries(id)
);

create table films(
    id int not null auto_increment, 
    title varchar(200) not null, 
    description varchar(2000) not null, 
    release_year int not null, 
    language_id int not null, 
    length int not null, 
    user_id int not null,
    country_id int not null,
    primary key(id),
    foreign key(language_id) references languages(id),
    foreign key(user_id) references users(id),
    foreign key(country_id) references countries(id)

);

create table authors(
    id int not null auto_increment, 
    first_name varchar(100) not null, 
    last_name varchar(100) not null,
    primary key(id)
);

create table books(
    id int not null auto_increment, 
    title varchar(200) not null, 
    description varchar(2000) not null, 
    release_year int not null, 
    language_id int not null, 
    author_id int not null, 
    user_id int not null,
    country_id int not null, 
    primary key(id),
    foreign key(language_id) references languages(id),
    foreign key(author_id) references authors(id),
    foreign key(user_id) references users(id),
    foreign key(country_id) references countries(id)

);

create table history_topics(
    id int not null auto_increment, 
    name varchar(200) not null, 
    description varchar(5000) not null, 
    user_id int not null, 
    country_id int not null, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(country_id) references countries(id)
)

create table film_comments(
    id int not null auto_increment, 
    user_id int not null, 
    film_id int not null, 
    comment varchar(2000) not null, 
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(film_id) references films(id)
)

create table film_likes(
    id int not null auto_increment, 
    user_id int not null, 
    film_id int not null, 
    film_like int not null, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(film_id) references films(id)
)

create table book_comments(
    id int not null auto_increment, 
    user_id int not null, 
    book_id int not null, 
    comment varchar(2000) not null, 
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(book_id) references books(id)
)

create table book_likes(
    id int not null auto_increment, 
    user_id int not null, 
    book_id int not null, 
    book_like int not null, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(book_id) references books(id)
)
create table history_topic_comments(
    id int not null auto_increment, 
    user_id int not null, 
    history_topic_id int not null, 
    comment varchar(2000) not null, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(history_topic_id) references history_topics(id)
)

create table history_topic_likes(
    id int not null auto_increment, 
    user_id int not null, 
    history_topic_id int not null, 
    history_topic_like int not null, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    primary key(id),
    foreign key(user_id) references users(id),
    foreign key(history_topic_id) references history_topics(id)
)

-- insert statement
insert into languages(name) values('English');
insert into countries(name, flag, language_id,capital)values('The United States of America', 'https://miro.medium.com/max/1200/0*o0-6o1W1DKmI5LbX.png', 1, 'Washington DC');
insert into users(first_name, last_name,country_id, username,password,admin, bio, avatar, email)values('Jerry', 'Sienfeld',2, 'jerry', 'jerry','N', "Just a simple guy, love traveling.", "https://cdn-icons.flaticon.com/png/512/1785/premium/1785911.png?token=exp=1650668307~hmac=27cde020bf921e8a9c7c3fc68cb0e25d", "jerrysienfeld@gmail.com");

insert into authors(first_name, last_name) values("Mario", "Llosa")
insert into books(title, description, release_year, language_id, author_id, user_id, country_id, cover) values('A Fish in the Water', 'A Fish in the Water, is the memoir of Peruvian writer Mario Vargas Llosa, who won the Nobel Prize in Literature in 2010. It covers two main periods of his life: the first comprising the years between 1946 and 1958, describes his childhood and the beginning of his writing career in Europe.', 1993, 2, 1, 1, 2,'https://images-na.ssl-images-amazon.com/images/I/91PPDwr-vSL.jpg');

-- join statements

--join orders, products, & user_payment
select countries.name , countries.capital, countries.flag, 
languages.name
from countries 
inner join languages on countries.language_id = languages.id


