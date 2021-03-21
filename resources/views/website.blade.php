<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel React Blog</title>

    <link rel='stylesheet' href="{{ asset('assets/website')}}/css/default.css">
    <link rel='stylesheet' href="{{ asset('assets/website')}}/css/fonts.css">
    <link rel='stylesheet' href="{{ asset('assets/website')}}/css/layout.css">
    <link rel='stylesheet' href="{{ asset('assets/website')}}/css/media-queries.css">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

</head>
<body>

    <div id="app"></div>

    <script src="{{ asset('js/website.js') }}" type="text/javascript"></script>

</body>
</html>