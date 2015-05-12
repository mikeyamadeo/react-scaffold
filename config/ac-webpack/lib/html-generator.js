module.exports = {
  dev: defaultHtml,
  prod: productionHtml
}

/**
 * Dev environment HTML
 */
function defaultHtml (data) {
  var result = ['<!doctype html>']
	result.push('<meta charset="utf-8"/>')
	if (data.htmlConfig.googleFonts) {
  	result.push(_googleFontScripts(data.htmlConfig.googleFonts))
  }
  //gets rid of annoying ga doesnt exist error
  result.push("<script>" + _gaSnippet('') + "</script>")
  result.push(_reactHook(data.htmlConfig.reactHook))
	result.push('<script src="/' + data.main + '"></script>')
	return result.join('')
}

/**
 * Production environment HTML
 * Looks like:

  <!doctype html>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AstroPanda</title>
    <link href="http://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet" type="text/css">
    <link rel="icon" href="/assets/icons/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="/style.786b8c0dbab4ea82eeec.css">
    <script>
    // google analytics snippet
    </script>
  <body>
    <div id="app"></div>
    <script src="/vendors.js"></script>
    <script src="/app.786b8c0dbab4ea82eeec.js"></script>
  </body>
 */
function productionHtml (data) {
	var htmlConfig = data.htmlConfig;

  var result = ['<!doctype html>']
  result.push('<meta charset="utf-8"/>')
  result.push('<meta name="viewport" content="width=device-width, initial-scale=1">')
  if (htmlConfig.title) {
  	result.push('<title>' + htmlConfig.title + '</title>')
  }
  if (htmlConfig.googleFonts) {
  	result.push(_googleFontScripts(htmlConfig.googleFonts))
  }
  if (htmlConfig.favicon) {
  	result.push('<link rel="icon" href="' + htmlConfig.favicon + '" type="image/x-icon" />')
  }
  if (data.css) {
    result.push('<link rel="stylesheet" href="/' + data.css + '"/>')
  }
  result.push('<script>' + _errorceptionSnippet() + '</script>')
  if (htmlConfig.gaId) {
  	result.push("<script>" + _gaSnippet(htmlConfig.gaId) + "</script>")
  }
  result.push('<body>')
  result.push(_reactHook(htmlConfig.reactHook))
  if (data.vendors) {
	  result.push('<script src="/' + data.vendors + '"></script>')
	}
  result.push('<script src="/' + data.app + '"></script>')
  result.push('</body>')
  return result.join('')
}



/////////////////////////////////////////////////////////////////////
// Helper functions

function _reactHook(spec) {
	if (!spec) { throw new Error('no react hook provided!') }
	return '<div ' + spec.attr + '="' + spec.value + '"></div>' 
}

function _gaSnippet(id) {
	return (
		"(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
    "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
    "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
    "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');" +

    "ga('create', '" + id + "', 'auto');"
	)
}

function _googleFontScripts(fonts) {
	return fonts.map(function(font) {
		return '<link href="http://fonts.googleapis.com/css?family=' + font + '" rel="stylesheet" type="text/css">'
	}).join('')
}

function _errorceptionSnippet() {
  return (
    '(function(_,e,rr,s){_errs=[s];var c=_.onerror;_.onerror=function(){var a=arguments;_errs.push(a);' +
    'c&&c.apply(this,a)};var b=function(){var c=e.createElement(rr),b=e.getElementsByTagName(rr)[0];' +
    'c.src="//beacon.errorception.com/"+s+".js";c.async=!0;b.parentNode.insertBefore(c,b)};' +
    '_.addEventListener?_.addEventListener("load",b,!1):_.attachEvent("onload",b)})' +
    '(window,document,"script","5530474fa1b3d516090018ea");' 
  )
}
