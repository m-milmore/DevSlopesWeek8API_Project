// Fetch API requires a discussion of ...
// Callbacks, Promises, Thenables, and Async/Await

// the Fetch API returns a promise on its own
// we don't have to create a new promise



// 9) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const url = 'https://api.chucknorris.io/jokes/random';
const items = 10;
const fetches = [];

const getFetches = async() => {
    try {
        const jokes = [];
        for (let i = 0; i < items; i++) {
            const response = await fetch(url);
            const data = await response.json();
            jokes.push(data.value);
        }
        postToWebJokes(jokes);
    } catch (e) {
        console.log(e.message);
    }
};

const postToWebJokes = data => {
    const ul = document.querySelector('.jokes');
    data.forEach((joke, index) => {
        const p = document.createElement('p');
        p.innerHTML = `${index + 1} - ${joke}`;
        ul.appendChild(p);
    });
};

// getFetches();

// 8) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// The actual code transfered to the main.js file

// 7) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 2nd parameter of Fetch is always an object
const getDadJoke = async() => {
    const response = await fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
            Accept: "application/json"
                // Accept: "text/plain"
        }
    });
    const jsonJokeData = await response.json();
    // const textJokeData = await response.text();

    console.log(jsonJokeData);
    // console.log(textJokeData);
};

// getDadJoke();



// 6) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// worlflow function
const getAllUseremails = async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();

    const userEmailArray = jsonUserData.map(user => {
        return user.email;
    });
    postToWebPage(userEmailArray);
};

const postToWebPage = (data) => {
    console.log(data);
};

// getAllUseremails();



// 5) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// about ES2017 Async/Await came about
// define an object in the global space that contains a list that consists of a blank array at first
const myUsers = {
    userList: []
};
// define a function that going to use async/await, we need to tell the function right at the beginning
// let's define it as an arrow function
const myCoolFunction = async() => {
    // define a response variable that is equals to what we get from fetch() using the await keyword
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonUserData = await response.json();
    return jsonUserData;
};

const anotherFunc = async() => {
    const data = await myCoolFunction();
    myUsers.userList = data;
    console.log(myUsers.userList);
};

// anotherFunc();
// console.log(myUsers.userList);



// 4) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Pending state of promises, we need to do that with the Fetch API, it's an easier way of explaining that

// https://jsonplaceholder.typicode.com/users is a great site to get some example APIs from to get data
// variable users is equal to the promise that is return from Fetch()
// const users = fetch("https://jsonplaceholder.typicode.com/users");
// console.log(users);
// pending

// we started with executing fetch directly, not as a variable
// if we declare a variable, we're going to run in in the same problem as before
const users = fetch("https://jsonplaceholder.typicode.com/users")
    // once we get that response, it's not ready to work with yet
    .then(response => {
        // we want to work with json, and this is a readable stream (body: ReadableStream)
        // console.log(response);
        // we need to call the json method of that readable stream, the json method returns a promise
        return response.json();
    })
    .then(data => {
        // we get 10 objects back
        // we need to work with this data within this block, we can't just take the data out
        // because it's not executing the code in the same order, 
        // the environment will go and execute the code below the fetch
        // console.log(data);
        data.forEach(user => {
            // console.log(user);
        });
    });

// if I logged the data, that line (line 41) is executed first and we see that is pending... before we get the other results
// this line does not wait on the code above
// console.log(users);



// 3) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// use a Timeout in javaScript

const myPromise = new Promise((resolve, reject) => {
    const error = false;
    if (!error) {
        resolve("Yes! Resolved the promise!");
    } else {
        reject("No! Rejected the promise!");
    }
});

const myNextPromise = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve("myNextPromise resolved!");
    }, 3000);
});

// myNextPromise.then(value => {
//     console.log(value);
// });

// myPromise.then(value => {
//     console.log(value);
// });



// 2) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Promises

// 3 states: Pending, Fulfilled, Rejected
// Promises will deliver async code

// const myPromise = new Promise((resolve, reject) => {
//     const error = true;
//     if (!error) {
//         resolve("Yes! Resolved the promise!");
//     } else {
//         reject("No! Rejected the promise!");
//     }
// });

// A promise may not return a value where you expect it to: You need to wait for a promise to resolve
// console.log(myPromise);
// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"											or "Pending" or "Rejected"
// [[PromiseResult]]: "Yes! Resolved the promise!"

// To get the value, we need to chain thenables (ES6-2015, when promises first came about)
// Async/Await will replace the thenables

// myPromise.then(value => {
// console.log(value);
// "Yes! Resolved the promise!"
//     return value + 1;
// })
// .then(newValue => {
//     console.log(newValue);
// "Yes! Resolved the promise!1"
// })
// we can catch an error in chained thenables, 
// what we do at the very end is chained a catch that can also have an anonymous function
// and it passes in the error object
// .catch(err => {
//     console.error(err);
// });



// 1) +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Callbacks, functions that are passed to other functions as parameters

function firstFunction(parameters, callback) {
    // do stuff with the parameters
    callback();
}

// AKA 'callback hell'
// firstFunction(para, function() {
// do stuff with the parameters
// secondFunction(para, function() {
// do stuff with the parameters
// thirdFunction(para, function() {
// do stuff with the parameters
//         });
//     });
// });