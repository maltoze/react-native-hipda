#! /usr/bin/env node

const fs = require('fs');

const bundle = fs.readFileSync('./build/posts.html', 'utf8');

const escaped = JSON.stringify(bundle);
const js = `/* eslint-disable prettier/prettier */
export const template = () => ${escaped};
`;

fs.writeFileSync('../src/templates/posts.ts', js);
