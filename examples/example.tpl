<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>


<style>
  pre {
    font-size: 0.8rem;
    line-height: normal;
    padding: .5rem !important;
  }
</style>
<div class="jumbotron" style="padding: 4rem 2rem 2rem;">
  <div class="text-center">
    <h1><%= htmlWebpackPlugin.options.title %></h1>
    <h4>version: <%= htmlWebpackPlugin.options.version %></h4>
    <div>
      <a class="github-button"
         href="https://github.com/edtoken/rvebuilder/subscription"
         data-size="large"
         data-show-count="true"
         aria-label="Watch edtoken/rvebuilder on GitHub">Watch</a>
      &nbsp;
      <a class="github-button"
         href="https://github.com/edtoken/rvebuilder"
         data-size="large"
         data-show-count="true"
         aria-label="Star edtoken/rvebuilder on GitHub">Star</a>
    </div>
    <p><%= htmlWebpackPlugin.options.description %></p>
    <hr>

    <h4>author: <%= htmlWebpackPlugin.options.author %></h4>
    <h4>license: <%= htmlWebpackPlugin.options.license %></h4>
    <h4>github: <a target="_blank" href="<%= htmlWebpackPlugin.options.url %>">rvebuilder</a></h4>

    <hr/>
    <div>
      <ul class="nav justify-content-center">
        <script>
          var examplelinks = '<%= htmlWebpackPlugin.options.examplelinks %>'.split(',')
          examplelinks.forEach(function (linkPath) {
            var exampleName = linkPath.replace('.html', '').replace('/', '')
            document.write(' <li class="nav-item"><a class="nav-link" href="' + linkPath + '">' + exampleName + '</a></li>')
          })
        </script>
      </ul>
    </div>

  </div>

</div>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <header>
        <h2>Result:</h2>
      </header>
      <div id="app-wrapper" style="border:1px solid #888"></div>
    </div>
  </div>
</div>

<div style="background: #eceeef;padding:2rem 0;margin:2rem 0;">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <header>
          <h2>Source code:</h2>
        </header>
        <pre class="prettyprint"><code class="lang-jsx"><%= htmlWebpackPlugin.options.sourcecode %></code></pre>
      </div>
    </div>
  </div>

</div>

<hr/>
<footer class="footer text-center">
  &copy; <%= htmlWebpackPlugin.options.author %>, <b><a target="_blank" href="<%= htmlWebpackPlugin.options.url %>">rvebuilder</a></b>
</footer>

<script async defer src="//buttons.github.io/buttons.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

</body>
</html>
