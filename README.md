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
TOKEN_KEY=secret
```

* return to the root directory with cd.

#### Startup Procedure

* make sure docker is installed and the daemon is running.
* Start the development database by running `docker compose -f docker-compose.dev.yaml up -d` in the root directory.
* To run the full stack application run `npm run start`.

#### Testing

* go to [application](http://localhost:3000) in your browser.
* if using full stack, app will need to restart every time changes in client side code are made to see changes.
* go to [mongo express](http://localhost:8081) in your browser.

#### Shutdown procedure

* To stop the full stack application run `ctrl/cmd + c` in the terminal.
* shut down the database with `docker compose -f docker-compose.dev.yaml down`

## TODO

* create config file setup function in server.js

## Backend implementation

### Login AP

login implementation from [here](https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/)

```javascript
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const [cookies, removeCookie] = useCookies([]);
const [username, setUsername] = useState("");

const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:3000/api/auth",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status;
    };
verifyCookie();
// implement removeCookie("token") during the logout process
```

* the url to send a POST request to login is `http://localhost:3000/api/login`
  * this request requires a JSON object with the following structure:

    ```json
    {
      "username": "john.doe",
      "password": "test"
    }
    ```

* the url to send a POST request to signup is `http://localhost:3000/api/sign-up`
  * this request requires a JSON object with the following structure:

    ```json
    {
        "username": "john.doe",
        "password": "test"
    }
    ```

* all of the following api calls require the token cookie to be set by logging in first

* the url to send a POST request to update profile is `http://localhost:3000/api/profile`
  * this request requires a JSON object with the following structure:

    ```json
    {
      "name":"Jon day",
      "email":"jon.Day@gmail.com",
      "phone":"9123847012934",
      "address":"sadjhfg"
    }
    ```

