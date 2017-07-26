module.exports = {
  dev: function (data) {
    return `
    <!doctype html>

    <html>
      <head>
        <title>React Starter</title>
      </head>
      <body>
        <div id='root'/>
        <script src="./${data.main}"></script>
      </body>
    </html>
    `
  },
  prod: function (data) {
    return `
    <!doctype html>

    <html>
      <head>
        <title>React Starter</title>
        <link rel="stylesheet" href="./${data.css}" />
      </head>
      <body>
        <div id='root'/>
        <script src="./${data.main}"></script>
      </body>
    </html>
    `
  }
}
