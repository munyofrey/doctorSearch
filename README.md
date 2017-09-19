# BetterDoctor Search page

## Getting started

In order to successfully get responses from the BetterDoctor API you
will need to create a `.env` file in the root directory to store your API user key.

Your `.env` file should look like this

```text
DOCTOR_KEY=yourUserKey
```

Then navigate into the project directory and run

```shell
$ npm install
$ webpack
$ npm start
```
You can now navigate to localhost:3000 in your browser and test it out!

## Testing

`Mocha` and `Jest` are utilized to test this application. Mocha is used to test
the backend. To run the mocha tests run

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

## Possible Improvements

This application would benefit from a few more error checks. Were I to spend
more time on this challenge I would type check user input so that special characters
and numbers do not show up or become part of a query. Furthermore, on the backend I would
do better error handling in the case that the BetterDoctor API does not return
the expected information.

There are also few improvements to round out the testing in this application, first
`frontend/__tests__/search-test.js` does not currently test the updating of the
doctor list after typing in the input field, or the change of the input field.
Also, due to the timing of external API calls, it was difficult to test proper responses,
since good testing practices state to "not mock what you don't own", I would like to
spend some time learning how to properly test responses that rely on external API calls.
