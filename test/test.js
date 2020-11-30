var expect  = require('chai').expect;
var googleCurrency = require('../services/googleCurrency');


 it('test request rates coin google', async () => {
    let value = await googleCurrency.getCurrencie('BRL', 'USD');
    console.log(value);
    expect(value).to.be.a('string');
  });

