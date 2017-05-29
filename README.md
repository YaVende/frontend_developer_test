# YaVende.com test for frontend developers

This repo hosts the skeleton for a tested HTML5 app, meant to be completed by frontend developers wanting to work with us.

It's built with [brunch][1] and [vue.js 2.0][2] and tested with [nightwatch.js][3].
These software choices are meant for you to start quick and go through the test assigments rapidly, but you may use whatever framework or library you see fit.

You may for example dump the app itself but want to keep the tests.
In that case you can keep the `nightwatch.json` file and the `test` folder,
and ensure this npm packages are in your `pagackage.json`'s `devDependencies`:

    "lodash": "^4.17.4",
    "mock-http-server": "^0.1.0",
    "nightwatch": "^0.9.15",
    "threads": "^0.7.3",
    "selenium-standalone": "^6.4.1",

More info below.

## Assignment

### Topic

You will be required to replicate the most basic features of our car listing list and detail pages,
available at https://yavende.com/avisos and https://yavende.com/avisos/<carListingId> respectively.

For this purpose you will have to make usage of our API hosted at https://api.yavende.com, the same we use for powering https://yavende.com.

Aditionally, to enable automated testing of your page, some arbitrary requirements must be met.
These will be marked with __*bold and italic*__

### Requirements

#### `/avisos`

- Should list carlistings

For each car listing in the response from the API endpoint ([/v1/car_listings][104], 8 cars per page),
you must show the car listing's id, image, brand, model, year.
*__Each element in the list must have the id property set to "car-listing-${carListing.id}", for example: "car-listing-5792"__*.

- Should allow pagination

The page must have a button named "Next Page", *__with an id "next-page-button"__*,
which loads the next page from the API using the `page` param. For example, [/v1/car_listings?page=2][105]. First page is 1.

- Should allow filtering by brand

There must be a select for car brands *__with id "car-brand-select"__*.
These brands are available at the API endpoint [/v1/car_brands][106].
If a brand is selected, listings are updated to show filtered carListings.
Use the param `car_brand_id` to filter the API results.
For example, this query returns Chevrolet cars: [/v1/car_listings?car_brand_id=45][107].

- Should allow filtering by brand and model:

There must be a select for car models *__with id "car-model-select"__*.
There models are available at [/v1/car_models?car_brand_id=x][108].
Each time a car brand is selected, the select for models should be populated with the proper models.
If a model is choosen, update car listings to show them filtered by the selected brand and model.
To do this use the [/v1/car_listings][104] API endpoint with params `car_brand_id` and `car_model_id`.
For example, to get all Chevrolet Agile you can use [/v1/car_listings?car_brand_id=45?car_model_id=674][110].

- Should link to /avisos/:id

Given a car listing card is clicked, you should redirect to the detail page for the given car using the path "/avisos/:id".
For testing purposes, *__each car listing in the list must have the id property set to "car-listing-${carListing.id}, and trigger the redirect on click__*.

#### `/avisos/:id`

- Should be navigatable

If I open the browser directly on `/avisos/:id`, the detail for the carListing with that id should be shown.
You must show the car listing's id, image, brand, model, year.

---

You also must enforce this points:

  1. **The page must be a [single page application][109]:**
    This means the page may consist of a single file index.html,
    and clicking on a link must not trigger a page reload.
    Instead, all needed data must be loaded via AJAX and used to render the page.

  2. **Tests must pass:**
    If your site fulfills the requirements, automated tests should pass.
    If you feel like you completed the requirements but tests don't give you the green light,
    feel free to edit the tests, open an issue, or even [email us](mailto:nicolas@yavende.com).

## Support and documentation

You can find a full documentation for our API at https://api.yavende.com/docs

## Getting started
* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * Brunch plugins and app dependencies: `npm install`
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io), [Getting started guide](https://github.com/brunch/brunch-guide#readme)

## Running tests
Ensure you have installed [nightwatch.js][3].

Before running the tests, replace the API base url on your source files from `https://api.yavende.com` to `http://localhost:1234`.
This is a mocked service that mimics our API for testing.

### Using brunch built in static server
The test suite will try to run the brunch server by default and perform the automated tests against that server that runs on localhost:3333.

~~~bash
$ # run the tests
$ nightwatch
~~~

The test runner will run the brunch compile and server command `brunch watch --server` with the env var `API_URL` set to `http://localhost:1234`.
The brunch app comes with [process-env-brunch](https://github.com/mikeedwards/process-env-brunch) plugin installed, so the env var `API_URL` be replaced.

### Using a custom server
If you decide not to go with brunch, pass `DISABLE_APP_SERVER=true` and `APP_HOST=http://localhost:<your_port>` to tell the test suite where to run the tests against.
Here is a simple example of running a static assets server using nodejs [node-static][6]:

~~~bash
$ static --spa -a 0.0.0.0 ./public
$ DISABLE_APP_SERVER=true APP_HOST=http://localhost:8080 nightwatch
~~~

As mentioned before, *__tests should pass__*.
If your site fulfills the requirements, automated tests should pass.
If you feel like you completed the requirements but tests don't give you the green light,
feel free to edit the tests, open an issue, or even [email us](mailto:nicolas@yavende.com).

[1]: https://brunch.io
[2]: https://vuejs.org
[3]: http://nightwatchjs.org
[4]: https://github.com/mikeedwards/process-env-brunch
[5]: https://stackoverflow.com/questions/14155596/how-to-substitute-shell-variables-in-complex-text-files/21265156#21265156
[6]: https://github.com/cloudhead/node-static

[104]: https://api.yavende.com/v1/car_listings
[105]: https://api.yavende.com/v1/car_listings?page=2
[106]: https://api.yavende.com/v1/car_brands
[107]: https://api.yavende.com/v1/car_listings?car_brand_id=45
[108]: https://api.yavende.com/v1/car_models?car_brand=45
[109]: https://en.wikipedia.org/wiki/Single-page_application
[110]: https://api.yavende.com/v1/car_listings?car_brand_id=45?car_model_id=674
