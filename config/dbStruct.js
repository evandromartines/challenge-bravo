
const createTableCurrencies = `

    CREATE TABLE IF NOT EXISTS currencies (
        coin TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        date_update TEXT NOT NULL
    );

`
module.exports ={
    createTableCurrencies
}
