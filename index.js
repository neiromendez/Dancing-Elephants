let fs = require('fs');
let arrayF = fs.readFileSync('input.txt').toString().split("\n");

let row;
let cameraLens = 0;
let actsPos = [];
let elephantsPos = [];

main();

function main() {
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
    console.log(row,cameraLens,actsPos,elephantsPos);
}