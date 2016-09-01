<!DOCTYPE html>
<html>
<head>
    <title>Everquest 2 AA Calculator</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="description" content="Everquest 2 AA Calculator"/>
    <meta name="keywords" content="Everquest 2 AA Calculator EQ2"/>
    <meta name="robots" content="index, follow"/>
    <link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/ui-darkness/jquery-ui.css"
          type="text/css" media="all"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <link rel="stylesheet" type="text/css" href="css/eq2aa.css">
    <link rel="stylesheet" type="text/css" href="css/aa-viewer.css">
    <link rel="stylesheet" type="text/css" href="css/sprites/sprites.css">
    <link rel="stylesheet" type="text/css" href="css/sprites/sprites-beastlord.css">
    <script src="js/eq2aa.js" type="text/javascript"></script>
</head>
<body>
<div id="container">
    <div id="header">
        <form id="donate" action="https://www.paypal.com/cgi-bin/webscr" method="post">
            <input type="hidden" name="cmd" value="_s-xclick">
            <input type="hidden" name="hosted_button_id" value="REU9M5GYE5S8G">
            <input type="image" src="https://www.paypal.com/en_AU/i/btn/btn_donate_SM.gif" border="0" name="submit"
                   alt="PayPal - The safer, easier way to pay online.">
            <img alt="" border="0" src="https://www.paypal.com/en_AU/i/scr/pixel.gif" width="1" height="1">
        </form>
        <h1>Everquest 2 AA Calculator</h1>
        <div id="gameVersion">Version: GU68</div>
        <div id="topAd">

        </div>
    </div>
    <div id="content-container">
        <div id="left-bar">
            <ul id="class-list">
            </ul>
        </div>
        <div id="content"></div>
        <div id="right-bar">
            <div id="points-spent">
            </div>
            <ul id="commands">
            </ul>
            <div class="ui-widget">
                <label title="Searches for a character name using EQ2Players data and displays their AA build"
                       for="character-search">Character Search:</label>
                <input id="character-search"/>
            </div>
            <ul id="help">
                <li>
                    LClick/RClick = Spend/Remove 1 Point
                </li>
                <li>
                    LClick + Shift/Alt/Ctrl = Max ranks possible
                </li>
                <li>
                    RClick + Shift/Alt/Ctrl = Reset AA
                </li>
            </ul>
            <div id="rightAd">

            </div>
        </div>
        <div id="footer">
            <span class="version">Everquest 2 AA Calculator (Version 1.0.20 2016-09-01)</span>
            <div class="links">
                <a href="docs/api">api</a>
                | <a
                    href="mailto:&#101;&#113;&#050;&#097;&#097;&#064;&#098;&#101;&#101;&#116;&#110;&#121;&#046;&#099;&#111;&#109;">contact</a>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
    try {
        var pageTracker = _gat._getTracker("UA-11593380-1");
        pageTracker._trackPageview();
    } catch (err) {
    }
</script>
</body>
</html>
