.pragma library

var jsexports = {};

var exports = jsexports;




(function() {
  var foo;
  foo = function() {
    return console.log("Another func");
  };
}).call(this);
(function() {
  var EasyXhr, ImageSearcher, TwitterSearch, YahooPipe, lgg, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  lgg = function(s) {
    return console.log(JSON.stringify(s).substr(0, 5000));
  };
  _ = exports.js;
  EasyXhr = (function() {
    function EasyXhr(method, url, is_json) {
      this.method = method;
      this.url = url;
      if (is_json == null) {
        is_json = true;
      }
      this.is_json = is_json;
    }
    EasyXhr.prototype.go = function(donecallback, headerscallback) {
      var doc;
      doc = new XMLHttpRequest();
      lgg("XHR to " + this.url);
      doc.onreadystatechange = __bind(function() {
        var obj;
        lgg("stch");
        if (doc.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          lgg("headers");
          lgg(doc.getAllResponseHeaders());
          if (headerscallback != null) {
            headerscallback(doc);
          }
        }
        if (doc.readyState === XMLHttpRequest.DONE) {
          lgg("DONE" + this.is_json);
          lgg(doc.responseText);
          if (this.is_json) {
            lgg("json parsing");
            obj = JSON.parse(doc.responseText);
          } else {
            obj = doc.responseText;
          }
          return donecallback(obj);
        }
      }, this);
      doc.open(this.method, this.url);
      return doc.send();
    };
    return EasyXhr;
  })();
  TwitterSearch = (function() {
    function TwitterSearch() {}
    TwitterSearch.prototype.search = function(term, callback) {
      var cb, xhr;
      xhr = new EasyXhr("GET", "http://search.twitter.com/search.json?q=" + encodeURI(term), true);
      cb = callback;
      return xhr.go(function(res) {
        return cb(res);
      });
    };
    return TwitterSearch;
  })();
  YahooPipe = (function() {
    function YahooPipe() {}
    YahooPipe.prototype.fetch = function(url, callback) {
      var xhr;
      xhr = new EasyXhr("GET", url, true);
      return xhr.go(function(res) {
        var i, items, simplified;
        lgg(typeof res);
        items = res["value"]["items"];
        simplified = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            i = items[_i];
            _results.push([i.title, i.link]);
          }
          return _results;
        })();
        lgg(simplified);
        lgg(items.length);
        return callback(res);
      });
    };
    return YahooPipe;
  })();
  ImageSearcher = (function() {
    function ImageSearcher() {
      this.appid = "E33F36E0F72AFE95EA1BC0090F72EC360A0E440E";
      this.myq = "";
      this.offset = 0;
      this.imgcount = 30;
    }
    ImageSearcher.prototype.search = function(term, callback) {
      this.myq = encodeURIComponent(term);
      this.offset = 0;
      return this.doInvoke(callback);
    };
    ImageSearcher.prototype.populateModel = function(lmodel, images) {
      var r, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = images.length; _i < _len; _i++) {
        r = images[_i];
        _results.push(lmodel.append(r));
      }
      return _results;
    };
    ImageSearcher.prototype.doInvoke = function(callback) {
      var url, xhr;
      url = "http://api.search.live.net/json.aspx?AppId=" + this.appid + "&query=" + this.myq + "&sources=image&Image.Count=" + this.imgcount + "&Image.Offset=" + this.offset;
      xhr = new EasyXhr("GET", url, true);
      return xhr.go(__bind(function(res) {
        var results;
        results = res.SearchResponse.Image.Results;
        return callback(results);
      }, this));
    };
    ImageSearcher.prototype.more = function(callback) {
      this.offset = this.offset + this.imgcount + 1;
      return this.doInvoke(callback);
    };
    return ImageSearcher;
  })();
  jsexports.TwitterSearch = TwitterSearch;
  jsexports.YahooPipe = YahooPipe;
  jsexports.ImageSearcher = ImageSearcher;
  /*
  
  
  Misc notes:
  
      {
         "Title":"Coloring page Abrahm's tank - img 10142.",
         "MediaUrl":"http://www.edupics.com/photo-abrahms-tank-p10142.jpg",
         "Url":"http://www.edupics.com/coloring-page-abrahms-tank-i10142.html",
         "DisplayUrl":"http://www.edupics.com/coloring-page-abrahms-tank-i10142.html",
         "Width":620,
         "Height":875,
         "FileSize":52060,
         "ContentType":"image/jpeg",
         "Thumbnail":{
            "Url":"http://ts2.mm.bing.net/images/thumbnail.aspx?q=1344563779773&id=fd89507f72be62153a3e7009b03fff40",
            "ContentType":"image/jpeg",
            "Width":113,
            "Height":160,
            "FileSize":2407
         }
      }
      
  */
}).call(this);
