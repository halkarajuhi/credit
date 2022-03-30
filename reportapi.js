const express = require('express');
const request = require("request");
const cors = require('cors');
const fetch = require('node-fetch');
var router = express.Router();
const db = require('./dbConnection');

const corsOptions = {
  origin: "http://localhost:3000"
};


router.post('/getData', function (req, res) {
  // 百度在线网络技术（北京）有限公司
 
  const companyname = req.body.searchValue;
  console.log(companyname);
  if(companyname == ''){
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success:false}));
  }else{

  var options = {
    method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/staffV3/1002',
    qs: { name: companyname },
    headers:
    {
      'cache-control': 'no-cache',
      token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
      'accept-encoding': 'gzip'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    res.send(body);

  });
}
})


router.post('/Shareholder', function (req, res) {
  const companyname = req.body.searchValue;
  // 北京真弘文化发展有限责任公司
  if (companyname == '') {
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success: false }));
  } else {

    var options = {
      method: 'GET',
      url: 'https://quanweidu.cn/api/open/ic/holderV5/1003',
      qs: { name: companyname, page_num: '1', page_size: '20' },
      headers:
      {
        'postman-token': '4557de6b-17fc-0d9d-ed8d-fb46e0fd590a',
        'cache-control': 'no-cache',
        token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
        'accept-encoding': 'gzip'
      }
    };
 request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body);

    });
  }
})

router.post('/bussinessrecord', function (req, res) {

  // 北京三快在线科技有限公司
  const companyname = req.body.searchValue;

  if (companyname == '') {
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success: false }));
  } else {
    var options = {
      method: 'GET',
      url: 'https://quanweidu.cn/api/open/ic/changeinfoV3/1004',
      qs: { name: companyname },
      headers:
      {
        'postman-token': '2a4cd3a9-6bff-b6f5-3fc4-719d645ed760',
        'cache-control': 'no-cache',
        token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
        'accept-encoding': 'gzip'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body);
     

    });
  }
})

router.post('/enterprise', function (req, res) {
  // 百度在线网络技术（北京）有限公司
  const companyname = req.body.searchValue;
  if (companyname == '') {
    
  } else {
    var options = {
      method: 'GET',
      url: 'https://quanweidu.cn/api/open/ic/baseinfoV3/1005',
      qs: { name: companyname },
      headers:
      {
        'postman-token': '35e83dac-27f4-16e0-5be4-fa2dca857ecc',
        'cache-control': 'no-cache',
        token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
        'accept-encoding': 'gzip'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      res.send(body);
    });
  }
})


router.post('/bussinessrecord_V5', function (req, res) {
  // '百度在线网络技术（北京）有限公司
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{


  var options = {

    
    method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/baseinfoV5/1006',
    qs: { name: companyname },
    headers:
    {
      'postman-token': 'fa8e4812-c087-00fa-af65-68a6ef25a0aa',
      'cache-control': 'no-cache',
      token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
      'accept-encoding': 'gzip'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);

  });
}
})

router.post('/foreign', function (req, res) {
  // 北京华堂综合服务开发中心有限责任公司
  const companyname = req.body.searchValue;
  if(companyname == ''){
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success:false}));
  }else{


  var options = {
    method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/inverstV2/1007',
    qs: { name: companyname, page_num: '1', page_size: '20' },
    headers:
    {
      'postman-token': '93e00d38-5d8d-624c-326e-1489dc2c87bb',
      'cache-control': 'no-cache',
      token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
      'accept-encoding': 'gzip'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);

  });
}

})

router.post('/annualapi', function (req, res) {
  // '北京搜狗科技发展有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success:false}));
  }else{

  var options = {
    method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/annualreportv2/1008',
    qs: { name: companyname },
    headers:
    {
      'postman-token': 'b89836ff-405e-498b-aa34-b76643cb5619',
      'cache-control': 'no-cache',
      token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
      'accept-encoding': 'gzip'
    }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);

  });
}
})

router.post('/enterprisedata', function (req, res) {
  // '北京搜狗科技发展有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
   
  }else{

    var options = { method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/comverify/1009',
    qs: 
     { name: companyname,
       code: '91110105801754689Q',
       legal_person_name: '张连君' },
    headers: 
     { 'postman-token': '8a8812cc-e4d4-62a9-e2fa-2ed196d71486',
       'cache-control': 'no-cache',
       token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
       'accept-encoding': 'gzip' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
  
}
})

router.post('/corporate_contact', function (req, res) {
  // '北京搜狗科技发展有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success:false}));
  }else{

    var options = { method: 'GET',
  url: 'https://quanweidu.cn/api/open/ic/contact/1010',
  qs: { name: companyname, page_num: '1', page_size: '20' },
  headers: 
   { 'postman-token': 'f10efac1-1dd6-9bb9-76cc-aa8ca8570927',
     'cache-control': 'no-cache',
     token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
     'accept-encoding': 'gzip' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  
});
  
}
})
router.post('/Shareholding_change', function (req, res) {
  // '上海轩吉实业有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
    res.send(JSON.stringify({ status: 200, errormsg: "Please search with company Name", success:false}));
  }else{

    var options = { method: 'GET',
  url: 'https://quanweidu.cn/api/open/ic/holderChange/1015',
  qs: { name: companyname },
  headers: 
   { 'postman-token': '006020f8-90bc-9818-9c64-15355af3ec47',
     'cache-control': 'no-cache',
     token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
     'accept-encoding': 'gzip' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
 
});
}
})

router.post('/taxpayer_identification', function (req, res) {
  // '北京三快科技有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{

    var options = { method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/taxescode/1032',
    qs: { name: companyname},
    headers: 
     { 'postman-token': 'beea6691-5243-5690-462e-96a1fce438d2',
       'cache-control': 'no-cache',
       token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
       'accept-encoding': 'gzip' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
     }
})

router.post('/Search_value', function (req, res) {
  // '北京三快科技有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{

 var options = { method: 'GET',
    url: 'https://quanweidu.cn/api/open/ic/search/1036',
    qs: { word: '百度' },
    headers: 
     { 'postman-token': 'd9b5efdd-bd2c-e48f-386d-2088e1180e96',
       'cache-control': 'no-cache',
       token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
       'accept-encoding': 'gzip' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
   });
  }
})

router.post('/branch', function (req, res) {
  // '北京三快科技有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{

  var options = { method: 'GET',
  url: 'https://quanweidu.cn/api/open/ic/branchV2/1051',
  qs: { name: companyname },
  headers: 
   { 'postman-token': '5ea40e1b-0d95-70e3-a500-7e0fb0060a2f',
     'cache-control': 'no-cache',
     token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
     'accept-encoding': 'gzip' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
      res.send(body);
 
    });
  }
})

router.post('/basic_information', function (req, res) {
  // '港源实业（香港）有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{

  var options = { method: 'GET',
  url: 'https://quanweidu.cn/api/open/ic/eciother/1052',
  qs: { name: companyname },
  headers: 
   { 'postman-token': 'cd109fdf-918c-4699-896d-16435977d804',
     'cache-control': 'no-cache',
     token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
     'accept-encoding': 'gzip' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  
});
  }
})

router.post('/previous_name', function (req, res) {
  // '台纤电子自动化（上海）有限公司'
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{

  var options = { method: 'GET',
  url: 'https://quanweidu.cn/api/open/ic/historynames/1053',
  qs: { name: companyname },
  headers: 
   { 'postman-token': 'b6baa5c9-e14a-0570-4c2c-11c2278a7364',
     'cache-control': 'no-cache',
     token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
     'accept-encoding': 'gzip' } };

request(options, function (error, response, body) {
  if (error) throw  new Error(error);
   res.send(body);
});
  }
})

router.post('/head_office', function (req, res) {
  // '中国房地产开发宁波公司综合经营部'
  const companyname = req.body.searchValue;
  if(companyname == ''){
  
  }else{
  var options = { method: 'GET',
  url: 'https://quanweidu.cn/api/open/ic/parentcompany/1054',
  qs: { name: companyname },
  headers: 
   { 'postman-token': '693380e5-e64b-965b-ebd6-b33cd0517eb7',
     'cache-control': 'no-cache',
     token: 'fb1bcd3c-d6cc-4773-9ebb-68879c23127e',
     'accept-encoding': 'gzip' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(body);
  
});
  }
})

router.get('/getdata', (req, res) => {
 let sql = `Select * from report`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    res.end(JSON.stringify(result));
  });
});

router.get('/singledata/:id', (req, res) => {
  const id = req.params.id;
  let sql = `Select * from report where id = ${id}`;
   let query = db.query(sql, (err, result) => {
     if (err) throw err;
     res.end(JSON.stringify(result[0]));
   });
 });
 



module.exports = router;