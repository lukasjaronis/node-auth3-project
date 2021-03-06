const db = require("../database/dbConfig");

module.exports = {
    find,
    add,
    findById,
    findBy
}

function find() {
    return db('users')
    .select('id', 'username', 'department')
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id)
}

  function findBy(filter) {
    return db('users')
    .where(filter)
}

 function findById(id) {
    return db('users')
    .where({ id })
    .first();
}