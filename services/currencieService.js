const gooogleCurrency = require('./googleCurrency');
const config = require('../config/config');

const sqlInsert = `
    insert into currencies (coin, value, date_update) values (?, ?, ?)
`
const sqlUpdate = `
    update currencies set value=?, date_update=? where coin = ?
`
const sqlGet = `
    select coin, value, date_update from currencies where coin = ?
`

const insert = function (coin) {

    try {
        return new Promise(async function (resolve, reject) {

            let dateUpdate = Date.now();

            let value = 1 
            if (coin != "USD"){
                value = await gooogleCurrency.getCurrencie('USD', coin);
            }

            db.run(sqlInsert, [coin, value, dateUpdate],
                function(error){
                    if (!error){
                        resolve(true);
                    }else{
                        reject(error);
                    }
                }
            );

        });
    }
    catch (error) {
        console.log(error);
        return new Promise((reject) => reject(error));
    }
}

const update = function (coin) {

    try {
        return new Promise(async function (resolve, reject) {

            let dateUpdate = Date.now();
           
            let value = 1 
            if (coin != "USD"){
                value = await gooogleCurrency.getCurrencie('USD', coin);
            }
           
            db.run(sqlUpdate, [value, dateUpdate, coin],
                function(error){
                    if (!error){
                        resolve(true);
                    }else{
                        reject(error);
                    }
                }
            );

        });
    }
    catch (error) {
        console.log(error);
        return new Promise((reject) => reject(error));
    }
}

/*

    return currencie to id :coin
*/
const getById = function (coin) {

    try {
        
        return new Promise(async function (resolve) {

            global.db.all(sqlGet, [coin], (error, rows) => {
                resolve(rows);
            });

        });
    }
    catch (error) {
        console.log(error);
        return new Promise((reject) => reject(error));
    }

}

const convertCoin = function (coinOrig, coinDest, amount) {

    try {
        return new Promise(async function (resolve) {

            let dataCoinOrig = await getById(coinOrig);
            let dataCoinDest = await getById(coinDest);

            if (Array.isArray(dataCoinOrig) && dataCoinOrig.length > 0){

                if (Array.isArray(dataCoinDest) && dataCoinOrig.length > 0){
                    let valueConvert = ((Number(amount) * Number(dataCoinDest[0].value)) / Number(dataCoinOrig[0].value));
                    resolve(valueConvert);
                }
            }

        });
    }
    catch (error) {
        console.log(error);
        return new Promise((reject) => reject(error));
    }

}

/*
    update all coins support application
*/
const insertDefaultsCoins = async function () {

    for (let idCoin of config.COINS_SUPPORT){
        
        let result = await getById(idCoin);

        if (Array.isArray(result) && result.length > 0 ){
            update(idCoin);
        }else{
            insert(idCoin);
        }
    }
}

module.exports = {
    insert,
    getById,
    convertCoin,
    insertDefaultsCoins
}