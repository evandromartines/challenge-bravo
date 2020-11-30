const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const util = require('../../../util/functions')
const serviceCurrencie = require('../../../services/currencieService')

let validateInsert = [
  check('coin').notEmpty().withMessage('coin is required'),
  check('coin').isIn(['BRL', 'EUR', 'BTC', 'ETH']).withMessage('coin is not suported'),
]


router.get('/:coinOrig/:coinDest/:amount', (req, res) => {

    let coinOrig = req.params.coinOrig;
    let coinDest = req.params.coinDest;
    let amount = req.params.amount;

    let execute = serviceCurrencie.convertCoin(coinOrig, coinDest, amount);

    execute.then(function (result) {

          let msg = util.messageResponse(0, "SUCCESS", result);
          res.send(msg);
    
    }, function (error) {
        var msg = util.messageResponse(1, "ERROR", error);
        res.send(msg);
    });

});

router.post('/',validateInsert, (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var msg = util.messageResponse(1, "ERROR", errors.array());
      res.send(msg);
      return 
    }
    
    let coin = req.body.coin;
    let execute = serviceCurrencie.insert(coin);

    execute.then(function (result) {

          let msg = util.messageResponse(0, "SUCCESS", "insert successfull")
          res.send(msg);
     
    }, function (error) {
        var msg = util.messageResponse(1, "ERROR", error);
        res.send(msg);
    });

});


module.exports = router;    