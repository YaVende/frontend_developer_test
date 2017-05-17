// .vue files are not scanned by the transpiler for imported dependencies,
// so as a workaround we have to import them in a js file.
// See https://github.com/nblackburn/vue-brunch/issues/19
import 'axios';
import 'models/car_listing';

// Another monkeypatch.. see https://github.com/nblackburn/vue-brunch/issues/7
import "vueify/lib/insert-css";
