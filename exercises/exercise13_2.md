Start container

    docker run -d --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres

Connect to container

    docker exec -it postgres psql -U postgres postgres

Create blogs table

```
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes numeric DEFAULT 0
);
```

Insert blogs

    insert into blogs (author, url, title, likes) values ('Miguel Grinberg', 'https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world', 'The Flask Mega-Tutorial Part I: Hello, World!', 0);

    insert into blogs (author, url, title, likes) values ('Miguel Grinberg', 'https://blog.miguelgrinberg.com/post/introducing-the-react-mega-tutorial', 'Introducing the React Mega-Tutorial', 0);

Check blogs

    select * from blogs;