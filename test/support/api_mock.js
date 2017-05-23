const _                = require('lodash');
const CustomServerMock = require('./custom_server_mock');

module.exports =
  new CustomServerMock()
    .on({
      path: '/car_brands',
      jsonFile: 'car_brands_index.json'
    })

    .on({
      path: '/car_models',
      matchParams: [{
        params: {car_brand_id: "45"},
        jsonFile: 'car_models_index_car_brand_id_45.json'
      }]
    })

    .on({
      path: '/v1/car_listings',
      matcher: req => {
        if (_.keys(req.query).length === 1 && req.query.page == "1")
          return 'car_listings_index_page_1.json';
        else if (_.keys(req.query).length === 1 && req.query.page == "2")
          return 'car_listings_index_page_2.json';
        else if (req.query.car_brand_id === "45")
          return 'car_listings_index_car_brand_id_45.json';
      }
    });
