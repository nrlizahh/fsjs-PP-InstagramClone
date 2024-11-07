const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('s0/\/\P4$$w0rD', salt);

console.log(hash);

console.log(bcrypt.compareSync("s0/\/\P4$$w0rD", hash)); //true
console.log(bcrypt.compareSync("s0/\/4$$w0rD", hash)) //false
