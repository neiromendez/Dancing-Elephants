let fs = require('fs');
const util = require('util');
let file = require('./generar-archivo');

let row;
let cameraLens = 0;
let actsPos = [];
let elephantsPos = [];
let compareArray = [];
const sleep = util.promisify(setTimeout);

main().then(r => console.log(r));

async function main() {

    await file.main();
    await sleep(1000);

    let arrayF = fs.readFileSync('input.txt').toString().split("\n");

    for (let i = 0; i < arrayF.length; i++) {
        row = arrayF[i].split(" ");

        if (i === 0)
            cameraLens = row[1];

        if (row.length === 1)
            for (let j of row)
                elephantsPos.push(j);

        if (row.length === 2)
            actsPos.push(row);

    }
    compare(elephantsPos, actsPos);

    return "ready";
}

function compare(posE, acts) {
    let nCamera = 0;
    let responses = [];

    for (let i = 0; i < acts.length; i++) {
        let actos = posE;

        nCamera = 0;
        compareArray = [];
        actos.splice(acts[i][0], 1, acts[i][1]);
        responses.push(acountCameras(actos.slice()));
    }

    fs.writeFile('output.txt', responses.join('\n'), function (err) {
        if (err)
            console.error('something happened');
    });
}

function acountCameras(elephantArray) {
    let cameraPos = 0;
    let nCamera = 0;
    let newArray = [];
    let array = elephantArray;

    array.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < array.length; i++) {
        if (i === 0)
            cameraPos = parseInt(array[i]);

        if (parseInt(array[i]) >= cameraPos && parseInt(array[i]) <= cameraPos + parseInt(cameraLens)) {
            nCamera = 1;
            compareArray.push(array[i]);
        } else {
            let flag = false;
            newArray = [];

            for (let i of array) {
                flag = false;
                for (let j of compareArray)
                    if (i === j)
                        flag = true;

                if (!flag)
                    newArray.push(i);
            }

            nCamera += acountCameras(newArray);
        }
    }
    return nCamera;
}