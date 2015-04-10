/* bArrangeTextSize - v0.1.0 - 2015-04-10
* https://github.com/bons/b-arrange-text-size
* Copyright (c) 2015 Bons; Licensed MIT */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MODULE_NAME = 'bArrangeTextSize';

var angular = require('angular');

function isNumber(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function css(elm, attr)
{
  return window.getComputedStyle(elm, null).getPropertyValue(attr);
}

angular .module(MODULE_NAME, [])
        .directive('bArrangeTextSize',
        function()
        {
          return {
            scope: true,
            transclude: true,
            template: "<div arrange-text-inner ng-transclude></div>",
            link: function(scp, elm, atr)
            {
              var minFontSize = atr.fontMin && isNumber(atr.fontMin) && parseFloat(atr.fontMin) || 1;
              var maxFontSize = atr.fontMax && isNumber(atr.fontMax) && parseFloat(atr.fontMax) || 100;
              var paddingHeigth = parseFloat(css(elm[0], "padding-top")) + parseFloat(css(elm[0], "padding-bottom"));
              var paddingWidth = parseFloat(css(elm[0], "padding-left")) + parseFloat(css(elm[0], "padding-right"));
              var inner = elm[0].querySelector("div[arrange-text-inner]");
              var fontSize = parseFloat(css(elm[0], "font-size"));

              scp.resizeFont = function ()
              {
                 if(fontTooBig())
                 {
                    reduceFont();
                 }
                 else if (fontTooSmall())
                 {
                    increaseFont();
                 }
              };

              scp.resizeFont();

              //TEXT IS TOO BIG FUNCTION
              function fontTooBig()
              {
                return (inner.offsetWidth > elm[0].offsetWidth - paddingWidth || inner.offsetHeight > elm[0].offsetHeight - paddingHeigth);
              }

              function reduceFont()
              {
                while(fontSize > minFontSize && fontTooBig())
                {
                  fontSize--;
                  elm[0].style.fontSize = fontSize + "px";
                }

                if(fontSize < minFontSize)
                {
                  elm[0].style.fontSize = minFontSize + "px";
                }
              }

              //TEXT IS TOO SMALL FUNCTION
              function fontTooSmall()
              {
                return (inner.offsetWidth < elm[0].offsetWidth - paddingWidth || inner.offsetHeight < elm[0].offsetHeight - paddingHeigth);
              }

              function increaseFont()
              {
                while(fontSize < maxFontSize && fontTooSmall())
                {
                  fontSize++;
                  elm[0].style.fontSize = fontSize + "px";
                }

                if(fontSize > maxFontSize)
                {
                  elm[0].style.fontSize = maxFontSize + "px";
                }
              }
            }
          };
        });

module.exports = MODULE_NAME;

},{"angular":"angular"}]},{},[1]);
