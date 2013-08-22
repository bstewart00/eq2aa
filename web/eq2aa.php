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
    <link rel="stylesheet" type="text/css" href="css/sprites.css">
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
        <div id="gameVersion">Version: GU65</div>
        <div id="topAd">
            <!-- Beetny - 728x90 - Game Advertising Online -->
            <iframe marginheight="0" marginwidth="0" scrolling="no" frameborder="0" width="728" height="90"
                    src="http://www3.game-advertising-online.com/process/serve-f.php?section=serve&id=1971"
                    target="_blank"></iframe>
            <noframes>
                Game advertisements by <a href="http://www.game-advertising-online.com" target="_blank">Game Advertising
                Online</a> require iframes.
            </noframes>
            <!-- END GAO 728x90 -->
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
                <!-- Beetny - 300x250 - Game Advertising Online -->
                <iframe marginheight="0" marginwidth="0" scrolling="no" frameborder="0" width="300" height="250"
                        src="http://www3.game-advertising-online.com/process/serve-f.php?section=serve&id=1972"
                        target="_blank"></iframe>
                <noframes>
                    Game advertisements by <a href="http://www.game-advertising-online.com" target="_blank">Game
                    Advertising Online</a> require iframes.
                </noframes>
                <!-- END GAO 300x250 -->
            </div>
        </div>
        <div id="footer">
            <span class="version">Everquest 2 AA Calculator (Version 1.0.10 2013-01-26)</span>
            <span class="copy">&copy; 2012 Brett Stewart</span>
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
<form id="export-xml-form" method="POST" action="Export.php">
<input type="hidden" name="export-xml-data">
<input type="submit" value="DoExport">
</form>
<script>
$(function() {
$('#export-xml-form input:submit').on('click', function () {
var xml = ''
+ '<aa game="eq2">'
  + '<alternateadvancements typenum="0">'
    + '<alternateadvancement order="1" treeID="7" id="2632580594"/>'
    + '<alternateadvancement order="2" treeID="7" id="3491713348"/>'
    + '<alternateadvancement order="3" treeID="7" id="3491713348"/>'
    + '<alternateadvancement order="4" treeID="7" id="3491713348"/>'
    + '<alternateadvancement order="5" treeID="7" id="3491713348"/>'
    + '<alternateadvancement order="6" treeID="7" id="381910263"/>'
    + '<alternateadvancement order="7" treeID="7" id="381910263"/>'
    + '<alternateadvancement order="8" treeID="7" id="381910263"/>'
    + '<alternateadvancement order="9" treeID="7" id="381910263"/>'
    + '<alternateadvancement order="10" treeID="7" id="3018061881"/>'
    + '<alternateadvancement order="11" treeID="7" id="3018061881"/>'
    + '<alternateadvancement order="12" treeID="7" id="3018061881"/>'
    + '<alternateadvancement order="13" treeID="7" id="3018061881"/>'
    + '<alternateadvancement order="14" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="15" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="16" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="17" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="18" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="19" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="20" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="21" treeID="7" id="2803392978"/>'
    + '<alternateadvancement order="22" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="23" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="24" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="25" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="26" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="27" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="28" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="29" treeID="7" id="1640254561"/>'
    + '<alternateadvancement order="30" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="31" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="32" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="33" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="34" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="35" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="36" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="37" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="38" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="39" treeID="7" id="3303327919"/>'
    + '<alternateadvancement order="40" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="41" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="42" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="43" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="44" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="45" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="46" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="47" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="48" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="49" treeID="7" id="964490353"/>'
    + '<alternateadvancement order="50" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="51" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="52" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="53" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="54" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="55" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="56" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="57" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="58" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="59" treeID="7" id="4288731586"/>'
    + '<alternateadvancement order="60" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="61" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="62" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="63" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="64" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="65" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="66" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="67" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="68" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="69" treeID="7" id="1518361868"/>'
    + '<alternateadvancement order="70" treeID="7" id="1316734183"/>'
    + '<alternateadvancement order="71" treeID="7" id="2292705620"/>'
    + '<alternateadvancement order="72" treeID="7" id="763850138"/>'
    + '<alternateadvancement order="73" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="74" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="75" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="76" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="77" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="78" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="79" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="80" treeID="7" id="653334909"/>'
    + '<alternateadvancement order="81" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="82" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="83" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="84" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="85" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="86" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="87" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="88" treeID="7" id="1187043903"/>'
    + '<alternateadvancement order="89" treeID="7" id="3823132401"/>'
    + '<alternateadvancement order="90" treeID="7" id="3823132401"/>'
    + '<alternateadvancement order="91" treeID="7" id="3823132401"/>'
    + '<alternateadvancement order="92" treeID="7" id="3823132401"/>'
    + '<alternateadvancement order="93" treeID="7" id="3823132401"/>'
    + '<alternateadvancement order="94" treeID="7" id="1620691517"/>'
    + '<alternateadvancement order="95" treeID="7" id="1620691517"/>'
    + '<alternateadvancement order="96" treeID="20" id="3262311298"/>'
    + '<alternateadvancement order="97" treeID="20" id="3262311298"/>'
    + '<alternateadvancement order="98" treeID="20" id="3262311298"/>'
    + '<alternateadvancement order="99" treeID="20" id="3262311298"/>'
    + '<alternateadvancement order="100" treeID="20" id="3262311298"/>'
    + '<alternateadvancement order="101" treeID="20" id="3283124661"/>'
    + '<alternateadvancement order="102" treeID="20" id="3283124661"/>'
    + '<alternateadvancement order="103" treeID="20" id="3283124661"/>'
    + '<alternateadvancement order="104" treeID="20" id="3283124661"/>'
    + '<alternateadvancement order="105" treeID="20" id="3283124661"/>'
    + '<alternateadvancement order="106" treeID="20" id="1534835256"/>'
    + '<alternateadvancement order="107" treeID="20" id="1534835256"/>'
    + '<alternateadvancement order="108" treeID="20" id="1534835256"/>'
    + '<alternateadvancement order="109" treeID="20" id="1534835256"/>'
    + '<alternateadvancement order="110" treeID="20" id="1534835256"/>'
    + '<alternateadvancement order="111" treeID="20" id="686945820"/>'
    + '<alternateadvancement order="112" treeID="20" id="686945820"/>'
    + '<alternateadvancement order="113" treeID="20" id="686945820"/>'
    + '<alternateadvancement order="114" treeID="20" id="686945820"/>'
    + '<alternateadvancement order="115" treeID="20" id="686945820"/>'
    + '<alternateadvancement order="116" treeID="20" id="1571846355"/>'
    + '<alternateadvancement order="117" treeID="20" id="1571846355"/>'
    + '<alternateadvancement order="118" treeID="20" id="1522126863"/>'
    + '<alternateadvancement order="119" treeID="20" id="1522126863"/>'
    + '<alternateadvancement order="120" treeID="20" id="1522126863"/>'
    + '<alternateadvancement order="121" treeID="20" id="1522126863"/>'
    + '<alternateadvancement order="122" treeID="20" id="1522126863"/>'
    + '<alternateadvancement order="123" treeID="20" id="3342728455"/>'
    + '<alternateadvancement order="124" treeID="20" id="3342728455"/>'
    + '<alternateadvancement order="125" treeID="20" id="3342728455"/>'
    + '<alternateadvancement order="126" treeID="20" id="3342728455"/>'
    + '<alternateadvancement order="127" treeID="20" id="3342728455"/>'
    + '<alternateadvancement order="128" treeID="20" id="716654661"/>'
    + '<alternateadvancement order="129" treeID="20" id="716654661"/>'
    + '<alternateadvancement order="130" treeID="20" id="716654661"/>'
    + '<alternateadvancement order="131" treeID="20" id="716654661"/>'
    + '<alternateadvancement order="132" treeID="20" id="716654661"/>'
    + '<alternateadvancement order="133" treeID="20" id="691248171"/>'
    + '<alternateadvancement order="134" treeID="20" id="691248171"/>'
    + '<alternateadvancement order="135" treeID="20" id="691248171"/>'
    + '<alternateadvancement order="136" treeID="20" id="691248171"/>'
    + '<alternateadvancement order="137" treeID="20" id="691248171"/>'
    + '<alternateadvancement order="138" treeID="20" id="767484057"/>'
    + '<alternateadvancement order="139" treeID="20" id="767484057"/>'
    + '<alternateadvancement order="140" treeID="20" id="767484057"/>'
    + '<alternateadvancement order="141" treeID="20" id="767484057"/>'
    + '<alternateadvancement order="142" treeID="20" id="767484057"/>'
    + '<alternateadvancement order="143" treeID="20" id="746359470"/>'
    + '<alternateadvancement order="144" treeID="20" id="746359470"/>'
    + '<alternateadvancement order="145" treeID="20" id="746359470"/>'
    + '<alternateadvancement order="146" treeID="20" id="746359470"/>'
    + '<alternateadvancement order="147" treeID="20" id="746359470"/>'
    + '<alternateadvancement order="148" treeID="20" id="1580510397"/>'
    + '<alternateadvancement order="149" treeID="20" id="1580510397"/>'
    + '<alternateadvancement order="150" treeID="20" id="1580510397"/>'
    + '<alternateadvancement order="151" treeID="20" id="1580510397"/>'
    + '<alternateadvancement order="152" treeID="20" id="1580510397"/>'
    + '<alternateadvancement order="153" treeID="20" id="3285511536"/>'
    + '<alternateadvancement order="154" treeID="20" id="3285511536"/>'
    + '<alternateadvancement order="155" treeID="20" id="3017438522"/>'
    + '<alternateadvancement order="156" treeID="20" id="3017438522"/>'
    + '<alternateadvancement order="157" treeID="20" id="3017438522"/>'
    + '<alternateadvancement order="158" treeID="20" id="3017438522"/>'
    + '<alternateadvancement order="159" treeID="20" id="3017438522"/>'
    + '<alternateadvancement order="160" treeID="20" id="3302835628"/>'
    + '<alternateadvancement order="161" treeID="20" id="3302835628"/>'
    + '<alternateadvancement order="162" treeID="20" id="3302835628"/>'
    + '<alternateadvancement order="163" treeID="20" id="3302835628"/>'
    + '<alternateadvancement order="164" treeID="20" id="3302835628"/>'
    + '<alternateadvancement order="165" treeID="20" id="2987925261"/>'
    + '<alternateadvancement order="166" treeID="20" id="3075934600"/>'
    + '<alternateadvancement order="167" treeID="20" id="1574179862"/>'
    + '<alternateadvancement order="168" treeID="20" id="720330737"/>'
    + '<alternateadvancement order="169" treeID="20" id="720330737"/>'
    + '<alternateadvancement order="170" treeID="20" id="720330737"/>'
    + '<alternateadvancement order="171" treeID="20" id="720330737"/>'
    + '<alternateadvancement order="172" treeID="20" id="720330737"/>'
    + '<alternateadvancement order="173" treeID="20" id="1382950115"/>'
    + '<alternateadvancement order="174" treeID="20" id="1382950115"/>'
    + '<alternateadvancement order="175" treeID="20" id="1382950115"/>'
    + '<alternateadvancement order="176" treeID="20" id="1382950115"/>'
    + '<alternateadvancement order="177" treeID="20" id="1382950115"/>'
    + '<alternateadvancement order="178" treeID="20" id="3412555097"/>'
    + '<alternateadvancement order="179" treeID="20" id="3412555097"/>'
    + '<alternateadvancement order="180" treeID="20" id="3412555097"/>'
    + '<alternateadvancement order="181" treeID="20" id="1186873563"/>'
    + '<alternateadvancement order="182" treeID="20" id="1186873563"/>'
    + '<alternateadvancement order="183" treeID="20" id="1186873563"/>'
    + '<alternateadvancement order="184" treeID="20" id="1186873563"/>'
    + '<alternateadvancement order="185" treeID="20" id="1186873563"/>'
    + '<alternateadvancement order="186" treeID="20" id="2468106369"/>'
    + '<alternateadvancement order="187" treeID="20" id="2468106369"/>'
    + '<alternateadvancement order="188" treeID="20" id="2468106369"/>'
    + '<alternateadvancement order="189" treeID="20" id="2468106369"/>'
    + '<alternateadvancement order="190" treeID="20" id="2468106369"/>'
    + '<alternateadvancement order="191" treeID="20" id="544147240"/>'
    + '<alternateadvancement order="192" treeID="20" id="544147240"/>'
    + '<alternateadvancement order="193" treeID="20" id="544147240"/>'
    + '<alternateadvancement order="194" treeID="20" id="3917403665"/>'
    + '<alternateadvancement order="195" treeID="38" id="36137580"/>'
    + '<alternateadvancement order="196" treeID="38" id="36137580"/>'
    + '<alternateadvancement order="197" treeID="38" id="36137580"/>'
    + '<alternateadvancement order="198" treeID="38" id="36137580"/>'
    + '<alternateadvancement order="199" treeID="38" id="36137580"/>'
    + '<alternateadvancement order="200" treeID="38" id="1384387557"/>'
    + '<alternateadvancement order="201" treeID="38" id="1384387557"/>'
    + '<alternateadvancement order="202" treeID="38" id="1384387557"/>'
    + '<alternateadvancement order="203" treeID="38" id="1384387557"/>'
    + '<alternateadvancement order="204" treeID="38" id="1384387557"/>'
    + '<alternateadvancement order="205" treeID="38" id="1807264923"/>'
    + '<alternateadvancement order="206" treeID="38" id="1807264923"/>'
    + '<alternateadvancement order="207" treeID="38" id="1807264923"/>'
    + '<alternateadvancement order="208" treeID="38" id="1807264923"/>'
    + '<alternateadvancement order="209" treeID="38" id="1807264923"/>'
    + '<alternateadvancement order="210" treeID="38" id="1831461374"/>'
    + '<alternateadvancement order="211" treeID="38" id="1831461374"/>'
    + '<alternateadvancement order="212" treeID="38" id="1831461374"/>'
    + '<alternateadvancement order="213" treeID="38" id="1831461374"/>'
    + '<alternateadvancement order="214" treeID="38" id="1831461374"/>'
    + '<alternateadvancement order="215" treeID="38" id="4253685053"/>'
    + '<alternateadvancement order="216" treeID="38" id="3948842784"/>'
    + '<alternateadvancement order="217" treeID="38" id="3948842784"/>'
    + '<alternateadvancement order="218" treeID="38" id="3948842784"/>'
    + '<alternateadvancement order="219" treeID="38" id="3948842784"/>'
    + '<alternateadvancement order="220" treeID="38" id="3948842784"/>'
    + '<alternateadvancement order="221" treeID="38" id="4082249671"/>'
    + '<alternateadvancement order="222" treeID="38" id="4082249671"/>'
    + '<alternateadvancement order="223" treeID="38" id="4082249671"/>'
    + '<alternateadvancement order="224" treeID="38" id="4082249671"/>'
    + '<alternateadvancement order="225" treeID="38" id="4082249671"/>'
    + '<alternateadvancement order="226" treeID="38" id="3885936727"/>'
    + '<alternateadvancement order="227" treeID="38" id="3885936727"/>'
    + '<alternateadvancement order="228" treeID="38" id="3885936727"/>'
    + '<alternateadvancement order="229" treeID="38" id="3885936727"/>'
    + '<alternateadvancement order="230" treeID="38" id="3885936727"/>'
    + '<alternateadvancement order="231" treeID="38" id="564585791"/>'
    + '<alternateadvancement order="232" treeID="38" id="564585791"/>'
    + '<alternateadvancement order="233" treeID="38" id="564585791"/>'
    + '<alternateadvancement order="234" treeID="38" id="564585791"/>'
    + '<alternateadvancement order="235" treeID="38" id="564585791"/>'
    + '<alternateadvancement order="236" treeID="38" id="977428455"/>'
    + '<alternateadvancement order="237" treeID="38" id="2143743387"/>'
    + '<alternateadvancement order="238" treeID="38" id="3326435077"/>'
    + '<alternateadvancement order="239" treeID="38" id="3326435077"/>'
    + '<alternateadvancement order="240" treeID="38" id="3326435077"/>'
    + '<alternateadvancement order="241" treeID="38" id="385028943"/>'
    + '<alternateadvancement order="242" treeID="38" id="385028943"/>'
    + '<alternateadvancement order="243" treeID="38" id="385028943"/>'
    + '<alternateadvancement order="244" treeID="38" id="385028943"/>'
    + '<alternateadvancement order="245" treeID="38" id="385028943"/>'
    + '<alternateadvancement order="246" treeID="38" id="1683795279"/>'
    + '<alternateadvancement order="247" treeID="38" id="1683795279"/>'
    + '<alternateadvancement order="248" treeID="38" id="1683795279"/>'
    + '<alternateadvancement order="249" treeID="38" id="1683795279"/>'
    + '<alternateadvancement order="250" treeID="38" id="1683795279"/>'
    + '<alternateadvancement order="251" treeID="38" id="4250270965"/>'
    + '<alternateadvancement order="252" treeID="38" id="4250270965"/>'
    + '<alternateadvancement order="253" treeID="38" id="4250270965"/>'
    + '<alternateadvancement order="254" treeID="38" id="4250270965"/>'
    + '<alternateadvancement order="255" treeID="38" id="4250270965"/>'
    + '<alternateadvancement order="256" treeID="38" id="3841282146"/>'
    + '<alternateadvancement order="257" treeID="38" id="3841282146"/>'
    + '<alternateadvancement order="258" treeID="38" id="3841282146"/>'
    + '<alternateadvancement order="259" treeID="38" id="3841282146"/>'
    + '<alternateadvancement order="260" treeID="38" id="3841282146"/>'
    + '<alternateadvancement order="261" treeID="38" id="306521941"/>'
    + '<alternateadvancement order="262" treeID="38" id="2337044207"/>'
    + '<alternateadvancement order="263" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="264" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="265" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="266" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="267" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="268" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="269" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="270" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="271" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="272" treeID="67" id="1023175616"/>'
    + '<alternateadvancement order="273" treeID="67" id="3127384430"/>'
    + '<alternateadvancement order="274" treeID="67" id="3127384430"/>'
    + '<alternateadvancement order="275" treeID="67" id="3127384430"/>'
    + '<alternateadvancement order="276" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="277" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="278" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="279" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="280" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="281" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="282" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="283" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="284" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="285" treeID="67" id="593578196"/>'
    + '<alternateadvancement order="286" treeID="67" id="1416001602"/>'
    + '<alternateadvancement order="287" treeID="67" id="1416001602"/>'
    + '<alternateadvancement order="288" treeID="67" id="1416001602"/>'
    + '<alternateadvancement order="289" treeID="67" id="1416001602"/>'
    + '<alternateadvancement order="290" treeID="67" id="1416001602"/>'
    + '<alternateadvancement order="291" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="292" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="293" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="294" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="295" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="296" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="297" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="298" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="299" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="300" treeID="67" id="274451393"/>'
    + '<alternateadvancement order="301" treeID="67" id="1613840206"/>'
    + '<alternateadvancement order="302" treeID="67" id="1613840206"/>'
    + '<alternateadvancement order="303" treeID="67" id="1613840206"/>'
    + '<alternateadvancement order="304" treeID="67" id="1613840206"/>'
    + '<alternateadvancement order="305" treeID="67" id="1613840206"/>'
    + '<alternateadvancement order="306" treeID="67" id="3264671721"/>'
  + '</alternateadvancements>'
  + '<alternateadvancements typenum="2">'
    + '<alternateadvancement order="1" treeID="114" id="1969426571"/>'
    + '<alternateadvancement order="2" treeID="114" id="1969426571"/>'
    + '<alternateadvancement order="3" treeID="114" id="1969426571"/>'
    + '<alternateadvancement order="4" treeID="114" id="3206380310"/>'
    + '<alternateadvancement order="5" treeID="114" id="3206380310"/>'
    + '<alternateadvancement order="6" treeID="114" id="3206380310"/>'
    + '<alternateadvancement order="7" treeID="114" id="3518020670"/>'
    + '<alternateadvancement order="8" treeID="114" id="3518020670"/>'
    + '<alternateadvancement order="9" treeID="114" id="3518020670"/>'
    + '<alternateadvancement order="10" treeID="114" id="1606692268"/>'
    + '<alternateadvancement order="11" treeID="114" id="1606692268"/>'
    + '<alternateadvancement order="12" treeID="114" id="1606692268"/>'
    + '<alternateadvancement order="13" treeID="114" id="4074101277"/>'
    + '<alternateadvancement order="14" treeID="114" id="4023446181"/>'
    + '<alternateadvancement order="15" treeID="114" id="4023446181"/>'
    + '<alternateadvancement order="16" treeID="114" id="1177529623"/>'
    + '<alternateadvancement order="17" treeID="114" id="2206765977"/>'
    + '<alternateadvancement order="18" treeID="114" id="2206765977"/>'
    + '<alternateadvancement order="19" treeID="114" id="613169408"/>'
    + '<alternateadvancement order="20" treeID="114" id="637507629"/>'
  + '</alternateadvancements>'
  + '<alternateadvancements typenum="3">'
    + '<alternateadvancement order="1" treeID="73" id="792845086"/>'
    + '<alternateadvancement order="2" treeID="73" id="792845086"/>'
    + '<alternateadvancement order="3" treeID="73" id="792845086"/>'
    + '<alternateadvancement order="4" treeID="73" id="792845086"/>'
    + '<alternateadvancement order="5" treeID="73" id="792845086"/>'
    + '<alternateadvancement order="6" treeID="73" id="45709490"/>'
    + '<alternateadvancement order="7" treeID="73" id="45709490"/>'
    + '<alternateadvancement order="8" treeID="73" id="45709490"/>'
    + '<alternateadvancement order="9" treeID="73" id="45709490"/>'
    + '<alternateadvancement order="10" treeID="73" id="45709490"/>'
    + '<alternateadvancement order="11" treeID="73" id="1348243269"/>'
    + '<alternateadvancement order="12" treeID="73" id="1348243269"/>'
    + '<alternateadvancement order="13" treeID="73" id="1348243269"/>'
    + '<alternateadvancement order="14" treeID="73" id="1348243269"/>'
    + '<alternateadvancement order="15" treeID="73" id="1348243269"/>'
    + '<alternateadvancement order="16" treeID="73" id="2307414680"/>'
    + '<alternateadvancement order="17" treeID="73" id="2307414680"/>'
    + '<alternateadvancement order="18" treeID="73" id="2307414680"/>'
    + '<alternateadvancement order="19" treeID="73" id="2307414680"/>'
    + '<alternateadvancement order="20" treeID="73" id="2307414680"/>'
    + '<alternateadvancement order="21" treeID="73" id="3132272618"/>'
    + '<alternateadvancement order="22" treeID="73" id="3132272618"/>'
    + '<alternateadvancement order="23" treeID="73" id="3132272618"/>'
    + '<alternateadvancement order="24" treeID="73" id="3132272618"/>'
    + '<alternateadvancement order="25" treeID="73" id="3132272618"/>'
    + '<alternateadvancement order="26" treeID="73" id="2746983298"/>'
    + '<alternateadvancement order="27" treeID="73" id="2746983298"/>'
    + '<alternateadvancement order="28" treeID="73" id="2746983298"/>'
    + '<alternateadvancement order="29" treeID="73" id="2746983298"/>'
    + '<alternateadvancement order="30" treeID="73" id="2746983298"/>'
    + '<alternateadvancement order="31" treeID="73" id="1091506549"/>'
    + '<alternateadvancement order="32" treeID="73" id="1091506549"/>'
    + '<alternateadvancement order="33" treeID="73" id="1091506549"/>'
    + '<alternateadvancement order="34" treeID="73" id="1091506549"/>'
    + '<alternateadvancement order="35" treeID="73" id="1091506549"/>'
    + '<alternateadvancement order="36" treeID="73" id="3713704186"/>'
    + '<alternateadvancement order="37" treeID="73" id="3713704186"/>'
    + '<alternateadvancement order="38" treeID="73" id="3713704186"/>'
    + '<alternateadvancement order="39" treeID="73" id="3713704186"/>'
    + '<alternateadvancement order="40" treeID="73" id="3713704186"/>'
  + '</alternateadvancements>'
  + '<alternateadvancements typenum="4">'
    + '<alternateadvancement order="1" treeID="121" id="1946889240"/>'
    + '<alternateadvancement order="2" treeID="121" id="4196800423"/>'
    + '<alternateadvancement order="3" treeID="121" id="4196800423"/>'
    + '<alternateadvancement order="4" treeID="121" id="4196800423"/>'
    + '<alternateadvancement order="5" treeID="121" id="4196800423"/>'
    + '<alternateadvancement order="6" treeID="121" id="4196800423"/>'
    + '<alternateadvancement order="7" treeID="121" id="4182715633"/>'
    + '<alternateadvancement order="8" treeID="121" id="4182715633"/>'
    + '<alternateadvancement order="9" treeID="121" id="4182715633"/>'
    + '<alternateadvancement order="10" treeID="121" id="4182715633"/>'
    + '<alternateadvancement order="11" treeID="121" id="4182715633"/>'
    + '<alternateadvancement order="12" treeID="121" id="3131968773"/>'
    + '<alternateadvancement order="13" treeID="121" id="3131968773"/>'
    + '<alternateadvancement order="14" treeID="121" id="3131968773"/>'
    + '<alternateadvancement order="15" treeID="121" id="1190980514"/>'
    + '<alternateadvancement order="16" treeID="121" id="1190980514"/>'
    + '<alternateadvancement order="17" treeID="121" id="1190980514"/>'
    + '<alternateadvancement order="18" treeID="121" id="1190980514"/>'
    + '<alternateadvancement order="19" treeID="121" id="1190980514"/>'
    + '<alternateadvancement order="20" treeID="121" id="491072059"/>'
    + '<alternateadvancement order="21" treeID="121" id="491072059"/>'
    + '<alternateadvancement order="22" treeID="121" id="491072059"/>'
    + '<alternateadvancement order="23" treeID="121" id="491072059"/>'
    + '<alternateadvancement order="24" treeID="121" id="491072059"/>'
    + '<alternateadvancement order="25" treeID="121" id="2300958846"/>'
  + '</alternateadvancements>'
+ '</aa>';

$('input[name="export-xml-data"]').val(xml);
return true;
});
});

</script>
</body>
</html>
