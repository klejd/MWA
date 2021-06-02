//this is the asgm ---------------------------------------------------
let fibonacci = new Promise(function(resolve, reject) {
    // console.log(resolve + reject);
});
fibonacci.then(fib).catch(err);

function fib(number) {
    if (number <= 2) {
        return 1;
    } else {
        return fib(number - 1) + fib(number - 2);
    }
}

function err(err) {
    console.log(err);
}
console.log(fib(10));


//-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -
// let fibonacc = new Promise(function(resolve, reject) {
//     console.log(resolve + reject);
// });

// function fib1(number) {
//     if (number <= 2) {
//         return 1;
//     } else {
//         return fib1(number - 1) + fib1(number - 2);
//     }
// }

// fibonacc.then(result).catch(err1);
// var a = 0;
// async function result() {

//     a = await fib1(41);


// }
// // console.log(a);

// function err1(err1) {
//     console.log(err1);
// }
// result();
// console.log("print this after the result");