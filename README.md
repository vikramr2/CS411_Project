# CS411_Project
CS 411 [Data Base Systems Project]

## Running This Project
Running this project involves several steps. One with the Database, API, then Client. 
  
### Generating Data
Using an R compiler. Run both `databases/generation/data_gen.R` and `databases/generation/Xgen_data.R`.
  
### Initializing the Database
<strong>You must have mySQL and mySQL workbench installed !!!</strong> First, start a MySQL server by going to Apple Icon -> System Preferences. Open MySQL and start a server. Open MySQL workbench and run `databases/xSQLcode.sql` up until the basic table generation. 
  
![Screenshot](/readme_images/Image\ 11-13-21\ at\ 1.01\ AM.pdf)

Now, on the tables on the left panel. Right click each table and select <strong>Table Data Import Wizard</strong>. You should then be able to import each respective `.csv` file.
  
Afer the data is imported, you can now run the following queries:
```sql
INSERT INTO PeopleDetail
SELECT 
	pid,
    first_name,
    last_name,
    MAX(has_covid),
    age,
    gender,
    email,
    MAX(country),
    MAX(state_province),
    MAX(city)
FROM (
	SELECT DISTINCT 
		pid,
		first_name,
		last_name,
        has_covid,
		age,
		gender,
		email,
		country, 
		state_province, 
		city
	FROM (
		(SELECT 
			People.people_id pid,
			first_name,
			last_name,
            People.status_id sid,
			age,
			gender,
			email
		FROM People
		GROUP BY People.people_id) t
			JOIN PeopleWorkStatus ON PeopleWorkStatus.people_id = pid 
			JOIN WorkStatus ON WorkStatus.work_id = PeopleWorkStatus.work_id 
			JOIN Location ON WorkStatus.location_id = Location.location_id
            JOIN CovidStatus ON sid = CovidStatus.status_id
)) T
GROUP BY pid;

SELECT * FROM PeopleDetail; 

-- Get Cases for each country, province, and city

CREATE TABLE CountryCount (
	country VARCHAR (255)										,
    cases INT NOT NULL											,
    PRIMARY KEY (country)
);

CREATE TABLE ProvinceCount (
	province VARCHAR (255)										,
    cases INT NOT NULL											,
    PRIMARY KEY (province)
);

CREATE TABLE CityCount (
	city VARCHAR (255)											,
    cases INT NOT NULL											,
    PRIMARY KEY (city)
);

INSERT INTO CountryCount
SELECT 
	country,
    SUM(has_covid)
FROM (
	SELECT DISTINCT 
		pid,
		first_name,
		last_name,
        has_covid,
		age,
		gender,
		email,
		country, 
		state_province, 
		city
	FROM (
		(SELECT 
			People.people_id pid,
			first_name,
			last_name,
            People.status_id sid,
			age,
			gender,
			email
		FROM People
		GROUP BY People.people_id) t
			JOIN PeopleWorkStatus ON PeopleWorkStatus.people_id = pid 
			JOIN WorkStatus ON WorkStatus.work_id = PeopleWorkStatus.work_id 
			JOIN Location ON WorkStatus.location_id = Location.location_id
            JOIN CovidStatus ON sid = CovidStatus.status_id
)) T
GROUP BY country;

INSERT INTO ProvinceCount
SELECT 
	state_province,
    SUM(has_covid)
FROM (
	SELECT DISTINCT 
		pid,
		first_name,
		last_name,
        has_covid,
		age,
		gender,
		email,
		country, 
		state_province, 
		city
	FROM (
		(SELECT 
			People.people_id pid,
			first_name,
			last_name,
            People.status_id sid,
			age,
			gender,
			email
		FROM People
		GROUP BY People.people_id) t
			JOIN PeopleWorkStatus ON PeopleWorkStatus.people_id = pid 
			JOIN WorkStatus ON WorkStatus.work_id = PeopleWorkStatus.work_id 
			JOIN Location ON WorkStatus.location_id = Location.location_id
            JOIN CovidStatus ON sid = CovidStatus.status_id
)) T
GROUP BY state_province;

INSERT INTO CityCount
SELECT 
	city,
    SUM(has_covid)
FROM (
	SELECT DISTINCT 
		pid,
		first_name,
		last_name,
        has_covid,
		age,
		gender,
		email,
		country, 
		state_province, 
		city
	FROM (
		(SELECT 
			People.people_id pid,
			first_name,
			last_name,
            People.status_id sid,
			age,
			gender,
			email
		FROM People
		GROUP BY People.people_id) t
			JOIN PeopleWorkStatus ON PeopleWorkStatus.people_id = pid 
			JOIN WorkStatus ON WorkStatus.work_id = PeopleWorkStatus.work_id 
			JOIN Location ON WorkStatus.location_id = Location.location_id
            JOIN CovidStatus ON sid = CovidStatus.status_id
)) T
GROUP BY city;
```
  
### Starting the API
