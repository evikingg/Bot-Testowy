const cowsay = require("cowsay");
const fs = require('fs');



function get_cows(error, cow_names) {
    if (error) {
        console.log(error)
    }
    else if (cow_names) {
        console.log(`Number of cows available: ${cow_names.length}`);
        console.log(cow_names);
    }
}

// cowsay.list(get_cows);


console.log(fs.readdirSync('./cows', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name));
