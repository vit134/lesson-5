const href = 'http://ya.ru';

const protocol = href.split('//')[0];
let host = href.split('//')[1];

host = 'blabla';

console.log('protocol = ', `${protocol} host = ${host}`);
