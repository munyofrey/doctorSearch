# BetterDoctor Search page

## Getting started

In order to successfully get responses from the BetterDoctor API you
will need to create a `.env` file in the root directory to store your API user key.

Your `.env` file should look like this

```text
DOCTOR_KEY=yourUserKey
```

navigate into the project directory and run

```shell
$ npm install
$ webpack
$ npm start
```
in your browser navigate to localhost:3000 and test it out!

## Testing

`Mocha` and `Jest` are utilized to test this application. Mocha is used to test
the backend. To run the mocha test run

```shell
$ npm test
```

The Jest tests need to be run separately, run the follow 4 commands

```shell
$ jest frontend/__tests__/doctorSearch-test.js
$ jest frontend/__tests__/util-test.js
$ jest frontend/__tests__/search-test.js
$ jest frontend/__tests__/search_item-test.js
```
