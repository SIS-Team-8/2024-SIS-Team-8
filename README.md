# Software Innovation Studio - Team 8

## EmoteLog: Daily Emoji Journal

### Tech Stack

* **Frontend**: React
* **Backend**: Express.js/Node.js
* **Database**: MongoDB

## Team Members

* [Andreas Skotadis](https://linkedin.com/in/andreas-skotadis/)
* [Alexandar Nikolic](https://linkedin.com/in/alexandar-nikolic-26411b23b)
* [Ishaan Verma](https://www.linkedin.com/in/ishaan-verma-uts)
* [Marcus Karozis](https://linkedin.com/in/marcus-karozis)
* [Perry Stamoulos](https://www.linkedin.com/in/perry-stamoulos-5b6b5b1a3)
* [Pulkit Jain](https://www.linkedin.com/in/pulkit-jain-11592761)

## Development Conventions

### Branch Name

* `[developer_name]/[task_name]` e.g. dave/style-summarisation-button

### Pull Request Reviews

* As a reviewer, only leave comments, approvals or change requests - Let the PR creator administrate (e.g. merge, delete the branch) the PR.
* Each PR will require at least **2** approvals.
* Pay attention to merge conflicts, they must be resolved before being merged.

### Documentation

* Leave comments for each function in regards to their purpose, and possibly an explanation of the process.
* Don't be afraid to leave small notes and comments whilst developing.

### Getting Started - Client Only

* clone repository.
* Open in vscode.
* run `npm install` in root directory.
* cd into the client directory and run `npm install`.
* return to the root directory with cd.

#### Startup Procedure

* To run only the client run `npm run start-client`.

#### Testing

* go to [application](http://localhost:3000) in your browser.

#### Shutdown procedure

* To stop the client run `ctrl/cmd + c` in the terminal.

### Getting Started - Full Stack

#### Setup

* clone repository.
* Open in vscode.
* run `npm install` in both the client and server directories.
* create a `.env` file in the server directory and add the following:

```text
MONGODB_URI=mongodb://dev:Endless2-Drift-Turf@localhost:28018
MONGODB_DB=SIS-Team-8-dev
```

#### Startup Procedure

* make sure docker is installed and the daemon is running.
* Start the development database by running `docker compose -f docker-compose.dev.yaml up -d` in the root directory.
* To run the full stack application run `npm run start`.

#### Testing

* go to [application](http://localhost:3000) in your browser.
* go to [mongo express](http://localhost:8081) in your browser.

#### Shutdown procedure

* To stop the full stack application run `ctrl/cmd + c` in the terminal.
* shut down the database with `docker compose -f docker-compose.dev.yaml down`

## TODO

* create config file setup function in server.js
