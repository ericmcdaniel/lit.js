'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _templateObject = _taggedTemplateLiteral(['\n  <dt>', '</dt>\n  <dd>', '</dd>\n'], ['\n  <dt>', '</dt>\n  <dd>', '</dd>\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  <dl>', '</dl>\n'], ['\n  <dl>', '</dl>\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n      ', '\n      ', '\n    '], ['\n      ', '\n      ', '\n    ']),
    _templateObject4 = _taggedTemplateLiteral(['\n      <ul>\n        ', '\n      </ul>\n    '], ['\n      <ul>\n        ', '\n      </ul>\n    ']),
    _templateObject5 = _taggedTemplateLiteral(['<li>', '</li>'], ['<li>', '</li>']),
    _templateObject6 = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _lit = lit,
    createRenderer = _lit.createRenderer;

// A simple jQuery component renderer.

var simpleViewRenderer = createRenderer({
  parse: function parse(view) {
    if (view.$el instanceof jQuery) {
      return view;
    }
  },
  render: function render(view) {
    if (view.render) view.render();
    return [].concat(_toConsumableArray(view.$el));
  },
  destroy: function destroy(view) {
    view.$el.remove();
  }
});

var componentRenderer = simpleViewRenderer.componentRenderer,
    chunk = simpleViewRenderer.chunk;


var dlGroup = function dlGroup(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      t = _ref2[0],
      d = _ref2[1];

  return chunk(_templateObject, Red(t), d);
};

var dl = function dl() {
  for (var _len = arguments.length, pairs = Array(_len), _key = 0; _key < _len; _key++) {
    pairs[_key] = arguments[_key];
  }

  return chunk(_templateObject2, pairs.map(dlGroup));
};

var Red = function Red(text) {
  var css = {
    'color': 'red',
    'font-family': 'sans-serif'
  };
  var $el = $('<span/>', { text: text, css: css });
  return { $el: $el };
};

var Clicker = function Clicker(n) {
  var $el = $('<button/>', { text: n });
  var inc = function inc() {
    return $el.text(++n);
  };
  $el.on('click', inc);
  return { $el: $el };
};

var Person = function Person(name, age, money) {
  var $el = $('<div />');
  var render = function render() {
    return componentRenderer($el[0])(_templateObject3, chunk(['<a>', Red('bananas'), '</a>']), dl(['Name', '<strong>' + name + '</strong>'], ['Age', Clicker(age)], ['Money', Clicker(money)]));
  };
  return { $el: $el, render: render };
};

var app = function app(people) {
  var $el = $('<main/>');
  var render = function render() {
    return componentRenderer($el[0])(_templateObject4, people.map(function (d) {
      return chunk(_templateObject5, Person(d.name, d.age, d.money));
    }));
  };
  return { $el: $el, render: render };
};

var people = [];

for (var i = 0; i < 100; i++) {
  people.push({ name: 'Brad', age: 28, money: 9000 });
}

var a = app(people);

a.$el.appendTo(document.body);

a.render();

var test = function test(n) {
  var orig = n;
  var t0 = performance.now();
  while (n-- > 0) {
    a.render();
  }
  var t1 = performance.now();
  console.log(orig + ' renders: ' + (t1 - t0) + 'ms');
};

test(10);

componentRenderer(document.createElement('div'))(_templateObject6, {});
componentRenderer(document.createElement('div'))(_templateObject6, [[[]]]);
componentRenderer(document.createElement('div'))(_templateObject6, {});

