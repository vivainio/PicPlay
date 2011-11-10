.pragma library

var jsexports = {};

var exports = jsexports;




foo = () -> console.log("Another func")
lgg = (s) -> console.log JSON.stringify(s).substr(0, 5000)

_ = exports.js

class EasyXhr
  constructor: (@method, @url, is_json = true) ->
    @is_json = is_json
    
  go: (donecallback, headerscallback) ->
    doc = new XMLHttpRequest()
    lgg "XHR to " + @url
    doc.onreadystatechange = =>
      lgg "stch"
      if doc.readyState == XMLHttpRequest.HEADERS_RECEIVED
          lgg "headers"
          lgg doc.getAllResponseHeaders()
          headerscallback doc if headerscallback?
          
      if doc.readyState == XMLHttpRequest.DONE
          lgg "DONE" + @is_json
          lgg doc.responseText 
          if @is_json
              lgg("json parsing")
              obj = JSON.parse doc.responseText
          else
              obj = doc.responseText
          donecallback obj
      
    doc.open(@method, @url)
    doc.send()
    

class TwitterSearch
  constructor: ->
    
  search: (term, callback) ->
    xhr = new EasyXhr("GET", "http://search.twitter.com/search.json?q=" + encodeURI(term), true)
    cb = callback
    xhr.go( (res) -> cb(res))       
       
      
      
class YahooPipe
    constructor: ->
      
    fetch: (url, callback) ->
      
      #http://pipes.yahoo.com/pipes/pipe.run?_id=Zp1RnpFz3RGqWHjy1L3fcQ&_render=json&q=Genelia&safe=on&type=all    
      #url =   "http://pipes.yahoo.com/pipes/pipe.run?_id=" + pipeid + "&_render=json"
      xhr = new EasyXhr("GET", url, true)
      xhr.go (res) ->
        lgg(typeof(res))
        items = res["value"]["items"]
        simplified = ([i.title, i.link] for i in items)
        lgg simplified
        lgg items.length
        callback(res)
                          
      
class ImageSearcher
    constructor: ->
      @appid = "E33F36E0F72AFE95EA1BC0090F72EC360A0E440E"
      @myq = ""
      @offset = 0
      @imgcount = 30
      
      
    search: (term, callback) -> 
      @myq = encodeURIComponent(term)
      @offset = 0
      @doInvoke(callback)

    populateModel: (lmodel, images) ->
      lmodel.append(r) for r in images
 
    doInvoke: (callback) ->
      url = "http://api.search.live.net/json.aspx?AppId=#{@appid}&query=#{@myq}&sources=image&Image.Count=#{@imgcount}&Image.Offset=#{@offset}" 
         
      xhr = new EasyXhr("GET", url, true)
      xhr.go (res) => 
        results = res.SearchResponse.Image.Results
        callback(results)
      
           
    more: (callback) ->
      @offset = @offset + @imgcount + 1
      @doInvoke(callback)
        
      
      
          
              
jsexports.TwitterSearch = TwitterSearch
jsexports.YahooPipe = YahooPipe    
jsexports.ImageSearcher = ImageSearcher


###


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
    
###
