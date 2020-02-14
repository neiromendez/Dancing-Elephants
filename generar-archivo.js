module.exports = {
    main
};
let fs = require('fs');

//TODO: Sin limites en la cantidad de elefantes que se pueden usar.

let elephants = randomNumber(1, 15);
let cameraLens = randomNumber(1, 25);
let acts = randomNumber(10, 100);
let pos = [];
let actsPos = [];

async function main() {
    let title = elephants + " " + cameraLens + " " + acts;
    let resp = [];

    await fillElephantsFirstPosition();
    await fillActs();
    resp.push(title, ...pos, ...actsPos);

    await fs.writeFile('inputx.txt', resp.join('\n'), function (err) {
        if (err)
            console.error('something happened');
    });

    return "ready";
}

async function fillElephantsFirstPosition() {
    for (let i = 0; i < elephants; i++)
        pos.push(randomNumber(1, 50));
}

async function fillActs() {
    for (let i = 0; i < acts; i++)
        actsPos.push(randomNumber(0, elephants - 1) + " " + randomNumber(1, 35));
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}