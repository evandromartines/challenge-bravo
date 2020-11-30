const cheerio = require('cheerio');
const got = require('got');
 
/*
  
*/
const getCurrencie = async function (currenOrig, currenDest) {

    try {

        let termSearch = currenOrig + '+to+' + currenDest;
        let urlSearch = 'https://www.google.com/search?q=$&gl=us&gws_rd=cr';
        urlSearch = urlSearch.replace('$', termSearch);

        const response = await got(urlSearch,{
            headers: {
              'user-agent': 'Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion',
            }
          });
        
        var $ = cheerio.load(response.body);
        let value = $('#main > div:nth-child(4) > div > div:nth-child(3) > div > div > div > div > div:nth-child(1) > div > div > div > div').text();
        value = value.replace(/[^\d.-]/g,'');

        return value;

    } catch (error) {
        console.log(error.response.body);
    }
}


module.exports = {

  getCurrencie,

}

