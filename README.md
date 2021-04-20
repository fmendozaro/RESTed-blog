# RESTed Blog App

- Fernando Mendoza Rodriguez, fernandoza@gmail.com.
- Firefox, Chrome, Safari, Ms Edge, Desktop and Mobile (Pixel 5 and iPhone 8).
- Only Materialize CSS was used as an external framework for a quick implementation of mobile responsiveness and aesthetic purposes.
- File Structure:
```
├── README.md > A copy of this txt in Markdown
├── blog.html > Main page HTML Code
├── css
│ └── style.css > Main CSS file
├── js
│ ├── loading.js > Main CSS file
│ ├── main.js > Main CSS file
│ └── postsAPI.js > JS file where all the promises are taking care of with fetch Web API
└── readme.txt > The description file of this project
```

This project was deployed using GitHub pages [Live site](https://fmendozaro.github.io/RESTed-blog/blog.html)

## Testing

This project uses `npm` to manage the libraries and tools necessary to run automated tests, before running your tests need to install all the dependencies first:

``npm install``

To run the tests on your node cli client, in the root of the project you can execute:

```npm run test```

You should get an output similar to:

``` 
PASS  js/api.test.js

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.258 s, estimated 9 s
Ran all test suites.
```