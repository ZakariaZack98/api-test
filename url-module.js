const {log} = require('console');
const { URL } = require('url');

const ourUrl = new URL('https://www.facebook.com:8080/reader?name=zakaria&id=112#about');

log(ourUrl.searchParams.get('name'));