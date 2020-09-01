const database = require('../config/Databases')
const Category = {}

Category.getAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT * FROM categories ORDER BY id DESC')
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Category.add = (name, date) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO categories (name, created_at, updated_at) VALUES ('${name}', '${date}', '${date}') RETURNING *`)
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Category.edit = (id, name, date) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE categories SET name='${name}', updated_at='${date}' WHERE id=${id} RETURNING *`)
            .then((res) => {
                if (res.rows.length === 0){
                    reject('Data is not found')
                }
                else{
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Category.delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM categories WHERE id=${id} RETURNING *`)
            .then((res) => {
                if (res.rows.length === 0){
                    reject('Data is not found')
                }
                else{
                    resolve(res.rows)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

module.exports = Category