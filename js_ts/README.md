# Node.js usage

## Installation

1) Install Node.js and npm according to <https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#checking-your-version-of-npm-and-nodejs>
2) Open a command prompt/shell and `cd` to this folder
3) Run `npm install` to install project dependencies
4) To compile the Javascript program from Typescript, run `tsc` once. The compiled program should now be located in `out/index.js`, alongside a `index.d.ts` file, which contains Typescript declarations

## Usage

The program `index.js` takes 2 positional arguments: the first one is the filepath of the input image and the second is the filepath of the output TXT file (You can also run the program with the `--help` flag to check it for yourself).

You can also run the program with `npm start`, however, in order to pass the positional arguments this way, don't forget to add a `--` before them
