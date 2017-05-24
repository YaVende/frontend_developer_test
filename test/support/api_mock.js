const _                = require('lodash');
const CustomServerMock = require('./custom_server_mock');

module.exports =
  new CustomServerMock()
    .on({
      path: '/car_brands',
      jsonFile: 'car_brands_index'
    })

    .on({
      path: '/car_models',
      matcher: req =>
        req.query.car_brand_id === "45" &&
        'car_models_index_car_brand_id_45'
    })

    .on({
      path: '/v1/car_listings/5792',
      jsonFile: 'car_listings_show_5792'
    })

    .on({
      path: '/v1/car_listings',
      matcher: req => {
        if (
          keyCountIs(req.query, 1) &&
          req.query.page == "1"
        )
          return 'car_listings_index_page_1';

        else if (
          keyCountIs(req.query, 1) &&
          req.query.page == "2"
        )
          return 'car_listings_index_page_2';

        else if (
          req.query.car_brand_id === "45" &&
          req.query.car_model_id === "674"
        )
          return 'car_listings_index_car_brand_id_45_car_model_id_674'

        else if (
          req.query.car_brand_id === "45"
        )
          return 'car_listings_index_car_brand_id_45';
      }
    });

function keyCountIs(obj, n) {
  return _.keys(obj).length === n;
}
