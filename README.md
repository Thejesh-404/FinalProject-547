# EE-547 Final Project: Group 2

University Thrifting Marketplace is a Vue/JS based application to help students get rid of things by putting them up for donation to other students that need them.​

## Installation

Use the package manager [yarn](https://yarnpkg.com/) to install the University Thrifting Marketplace.

```bash
yarn install
```

## Usage

To run the application, open two terminal consoles and navigate to the parent directory of the folder
Run the following command on terminal 1 to start the Javascript server:

```bash
yarn server-start
```

Run the following command on terminal 2 to start the Vue client:

```bash
yarn client-start
```

## Folder Structure/ Architecture

The project has a segregated client and server side code.

The server/ directory has the JS based backend for the application. It connects to the Database through src/db.js. The backend exposes REST endpoints in src/app.js to process images through Google vision, and for basic CRUD operations.

The Vue based frontend is within the client/ directory and handles rendering of the Home/ Create/ Edit/ Listing/ Details pages within the views directory. The components directory provide basic layout for serach bars, headers and footers for the different pages of the UI. The userlogin component handles Google account authentication to the App.

The entire service is hosted on AWS. The AWS Instance has a free tier Ubuntu OS and is configured with Git authentication. The latest code is cloned from the Github Repository and Port access is enabled for Ports 3000 and 5173, which allows access to the application through a dynamically assigned IP Address.

The MongoDB Database is hosted on Atlas and authenticated through the Database URL, allowing access to certain IP Addresses. This access has been broadened to allow requests from any IP Addresses for the server code to be available for local testing on any machine.

