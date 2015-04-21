'use strict';

angular.module('angularGamut')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      },
      {
        'title': 'Less',
        'url': 'http://lesscss.org/',
        'description': 'Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.',
        'logo': 'less.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });
  })
  .directive('gamutImage', function () {
    "use strict";
    return {
      restrict : 'EAC',
      replace : true,
      scope :{
      },
      template: "<div><img id='slika' src='http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg' alt='Image preview' style='display:none'/><canvas width='600' height='400'></canvas><canvas width='400' height='400'></canvas></div>",
      link: function (scope, element, attribute) {

        function rgbToHsl(r, g, b){
          r /= 255, g /= 255, b /= 255;
          var max = Math.max(r, g, b), min = Math.min(r, g, b);
          var h, s, l = (max + min) / 2;

          if(max == min){
            h = s = 0; // achromatic
          }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
              case r: h = (g - b) / d + (g < b ? 6 : 0); break;
              case g: h = (b - r) / d + 2; break;
              case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
          }

          return [h, s, l];
        }

        function hslToRgb(h, s, l){
          var r, g, b;

          if(s == 0){
            r = g = b = l; // achromatic
          }else{
            var hue2rgb = function hue2rgb(p, q, t){
              if(t < 0) t += 1;
              if(t > 1) t -= 1;
              if(t < 1/6) return p + (q - p) * 6 * t;
              if(t < 1/2) return q;
              if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
              return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
          }

          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        function rgb2hsv (r,g,b) {
          var rr, gg, bb,
            r = r / 255,
            g = g / 255,
            b = b / 255,
            h, s,
            v = Math.max(r, g, b),
            diff = v - Math.min(r, g, b),
            diffc = function(c){
              return (v - c) / 6 / diff + 1 / 2;
            };

          if (diff == 0) {
            h = s = 0;
          } else {
            s = diff / v;
            rr = diffc(r);
            gg = diffc(g);
            bb = diffc(b);

            if (r === v) {
              h = bb - gg;
            }else if (g === v) {
              h = (1 / 3) + rr - bb;
            }else if (b === v) {
              h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
              h += 1;
            }else if (h > 1) {
              h -= 1;
            }
          }
          return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
          };
        }

        function rgbToHex(r, g, b) {
          return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        var setPixel = function (ctxx, x, y, c, size) {
          ctxx.beginPath();
          ctxx.fillStyle = rgbToHex(c.r, c.g, c.b);
          ctxx.arc(x, y, size*1.2, 0, 2*Math.PI, false);
          ctxx.fill();
          ctxx.closePath();

        };

        console.log(element.children());

        var img = new Image();
        img.src = 'assets/rarita.jpg';

        var c =  element.children()[1];
        var ctx = c.getContext('2d');
        var ctx2 = element.children()[2].getContext('2d');

        img.onload = function(){
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.drawImage(img, 0, 0);

          ctx2.fillStyle='black';
          ctx2.fillRect(0,0,400,400);

          var imgHeight = img.height;
          var imgWidth = img.width;

          var data = ctx.getImageData(0, 0, imgWidth, imgHeight).data;

          console.log('data', imgWidth, imgHeight, ctx.getImageData(0, 0, imgWidth, imgHeight).data.length);

          for (var pixel_index = 0; pixel_index < data.length; pixel_index = pixel_index + 4) {
            if (pixel_index === 0) {
              console.log('creating', data[pixel_index], data[pixel_index+1], data[pixel_index+2]);
              console.log('color', rgbToHsl(data[pixel_index], data[pixel_index+1], data[pixel_index+2]));
            }

            var hsl = rgbToHsl(data[pixel_index], data[pixel_index+1], data[pixel_index+2]);
            var x = 200 + hsl[1] * 150 * Math.cos(hsl[0] * 2 * Math.PI) ;
            var y = 200 + hsl[1] * 150 * Math.sin(hsl[0] * 2 * Math.PI);
            var rgb = hslToRgb(hsl[0], hsl[1], 0.5);
            setPixel(ctx2, x, y, {r: rgb[0], g: rgb[1], b: rgb[2]}, hsl[1]);
          }
        };
      }
    }
  });
