CREATE TABLE owners (
id SERIAL PRIMARY KEY,
first_name character varying(60),
last_name character varying(80)
);

CREATE TABLE pets (
id SERIAL PRIMARY KEY,
pet_name character varying(60),
breed character varying(80),
color character varying(60),
owner_id integer REFERENCES owners
);

CREATE TABLE visits (
id SERIAL PRIMARY KEY,
check_in character varying(60),
check_out character varying(60),
pet_id integer REFERENCES pets
);

//added a column for complete
ALTER TABLE visits
ADD COLUMN is_complete BOOLEAN NOT NULL DEFAULT FALSE;

INSERT INTO owners
VALUES (1, 'James', 'Leary'),
(2, 'Dexter', 'St-Pierre'),
(3, 'Anne', 'Kennedy'),
(4, 'Joe', 'Smoe');

INSERT INTO pets
VALUES (1, 'Sparky', 'Pit Bull', 'Black', 1),
(2, 'Baxter', 'Russel Terrier', 'Grey', 2),
(3, 'Buddy', 'Poodle', 'White', 3),
(4, 'Eye of Sauron', 'Pug', 'Brown and White', 4),
(5, 'Chloe', 'Great Dane', 'Tan', 1),
(6, 'Mikey', 'Great Dane', 'Tan', 3);

INSERT INTO visits
VALUES (1, '2012-02-08', '2012-02-010', 1),
(2, '2016-03-02', '2016-03-10', 2),
(3, '2016-05-01', '2016-05-08', 5),
(4, '2016-07-01', '2016-07-03', 6),
(5, '2017-05-04', '2017-05-08', 3),
(6, '2017-07-08', '2017-07-12', 4),
(7, '2017-06-08', '2017-06-12', 4);
