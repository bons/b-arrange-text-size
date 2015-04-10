'use strict';

require('angular');
require('angular-mocks');
var app = require('../lib/b-arrange-text-size');

describe('Test Suite: bArrangeTextSize', function()
{
  var scope,
      $compile;

  function css(elm, attr)
  {
    return window.getComputedStyle(elm, null).getPropertyValue(attr);
  }

  beforeEach(angular.mock.module('bArrangeTextSize'));

  beforeEach(angular.mock.inject(['$rootScope','$compile',
      function ($rootScope, _$compile_)
      {
        scope = $rootScope.$new();
        $compile = _$compile_;
      }
    ])
  );

  it('should be defined', function()
  {
    expect(app).toBeDefined();
  });

  it("should arrange the text size between 12px and 16px", function() {

    var body  = document.querySelector("body");
    body.innerHTML = '<div b-arrange-text-size style="font-size: 20px; width: 435px; height: 100px; margin-top: 0px; padding-top: 20px; padding-bottom: 20px;"><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div></div>';
    $compile(body)(scope);
    var arrangeText = body.querySelector("[b-arrange-text-size]");
    var fontSize = parseFloat(css(arrangeText, "font-size"));
    // 14 +-1
    expect(fontSize).toBeGreaterThan(12);
    expect(fontSize).toBeLessThan(16);
  });

  it("should be equal to the minFontSize", function() {

    var body  = document.querySelector("body");
    body.innerHTML = '<div b-arrange-text-size data-font-min="17" style="font-size: 10px; width: 100px; height: 100px; margin-top: 0px; padding-top: 20px; padding-bottom: 20px;"><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div></div>';
    $compile(body)(scope);
    var arrangeText = body.querySelector("[b-arrange-text-size]");
    var fontSize = parseFloat(css(arrangeText, "font-size"));
    var dataFontMin = document.querySelector("div[data-font-min]");
    var minFontSize = parseFloat(dataFontMin.getAttribute("data-font-min"));

    expect(fontSize).toEqual(minFontSize);

  });

  it("should be equal to the maxFontSize", function() {

    var body  = document.querySelector("body");
    body.innerHTML = '<div b-arrange-text-size data-font-max="27" style="font-size: 40px; width: 1000px; height: 1000px; margin-top: 0px; padding-top: 20px; padding-bottom: 20px;"><div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div></div>';
    $compile(body)(scope);
    var arrangeText = body.querySelector("[b-arrange-text-size]");
    var fontSize = parseFloat(css(arrangeText, "font-size"));
    var dataFontMax = document.querySelector("div[data-font-max]");
    var maxFontSize = parseFloat(dataFontMax.getAttribute("data-font-max"));

    expect(fontSize).toEqual(maxFontSize);

  });

});
