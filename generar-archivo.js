module.exports = {
    main
};
let fs = require('fs');

//TODO: Sin limites en la cantidad de elefantes que se pueden usar.
let elephants = randomNumber(1, 10);
let cameraLens = randomNumber(1, 100000000);
let acts = randomNumber(1, 150000);
let pos = [];
let actsPos = [];

async function main() {
    let title = elephants + " " + cameraLens + " " + acts;
    let resp = [];

    await fillElephantsFirstPosition();
    await fillActs();
    resp.push(title,...pos,...actsPos);

   await fs.writeFile('input.txt', resp.join('\n'), function (err) {
        if (err)
            console.error('something happened');
    });

    return "ready";
}

async function fillElephantsFirstPosition() {
    for (let i = 0; i < elephants; i++)
        pos.push(randomNumber(1, 1000000000));
}

async function fillActs() {
    for(let i = 0 ; i< acts;i++)
        actsPos.push(randomNumber(1,elephants-1)+" "+randomNumber(1,1000000000));
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}