<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>React Laravel Blog | Admin</title>

    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="{{ secure_asset('assets/admin') }}/bower_components/bootstrap/dist/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ secure_asset('assets/admin') }}/bower_components/font-awesome/css/font-awesome.min.css">

    <!-- Theme style -->
    <link rel="stylesheet" href="{{ secure_asset('assets/admin') }}/dist/css/AdminLTE.min.css">

    <!-- Theme skin -->
    <link rel="stylesheet" href="{{ secure_asset('assets/admin') }}/dist/css/skins/skin-green.css">

    <!-- bootstrap wysihtml5 - text editor -->
    <link rel="stylesheet" href="{{ secure_asset('assets/admin') }}/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

    <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition skin-green sidebar-mini">

    <div id="app"></div>


    <!-- Main app script -->
    <script src="{{ secure_asset('js/admin.js') }}" type="text/javascript"></script>

    <!-- jQuery 3 -->
    <script src="{{ secure_asset('assets/admin') }}/bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap 3.3.7 -->
    <script src="{{ asset('assets/admin') }}/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- Bootstrap WYSIHTML5 -->
    <script src="{{ secure_asset('assets/admin') }}/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- AdminLTE App -->
    <script src="{{ secure_asset('assets/admin') }}/dist/js/adminlte.min.js"></script>
    <!-- AdminLTE for demo purposes
    <script src="{{ secure_asset('assets/admin') }}/dist/js/demo.js"></script> -->
</body>
</html>