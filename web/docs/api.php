<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>EQ2AA API Documentation</title>
    <style>
        .separator {
            margin: 20px;
        }

        .method {
            font-style: italic;
        }

        .code {
            display: block;
            font-family: monospace;
        }

        .code ul {
            list-style-type: none;
        }

        .code li.i1 {
            margin-left: 20px;
        }

        .code li.i2 {
            margin-left: 40px;
        }

        .code li.i3 {
            margin-left: 60px;
        }

        .code li.i4 {
            margin-left: 80px;
        }
    </style>
</head>
<body>
<h1>API Documentation</h1>
<div class="api-doc">
    <div class="method">
        <span>GET get/character_url/:characterId</span>
    </div>
    <div>
        <h2>Description</h2>
        <span>Generates a URL for a given EQ2 player character's AA tree.</span>
    </div>
    <div>
        <h2>Example</h2>
        <span>GET http://beetny.com/eq2aa/api/get/character_url/442381882502</span>
    </div>
    <div>
        <h2>Parameters</h2>
        <span class="paramName">characterId:</span>
        <span class="paramDesc">Character Id as given by the id attribute on the &lt;character&gt; node in the EQ2 Data API</span>
    </div>
    <div>
        <h2>Returns</h2>
        <span>JSON encoded string of the full calculator URL.</span>
        <span class="code">"http:\/\/beetny.com\/eq2aa\/#GU63;4t20@35500550501545055105@30011t53030102010t014@30aa8a04aa00a1100180@310t100500505505@4255052001@45@431t3990aa00a00100"</span>

        <h2>Notes</h2>
        <span>You may also use http://beetny.com/eq2aa/character/:characterId e.g. http://beetny.com/eq2aa/character/442381882502 which will automatically redirect to the generated URL.</span>
    </div>
</div>

<div class="separator">---------------------------------------------------</div>

<div class="api-doc">
    <div class="method">
        <span>POST post/get_url_from_data/</span>
    </div>
    <div>
        <h2>Description</h2>
        <span>Generates a URL from a player class name and a list of spent AA</span>
    </div>
    <div>
        <h2>Example</h2>
        <span>POST http://beetny.com/eq2aa/api/post/get_url_from_data/</span>
        <h4>Request Body:</h4>
        <div class="code">
            <ul>
                <li class="i1">{</li>
                <li class="i2">"type" : {</li>
                <li class="i3">"class" : "Coercer"</li>
                <li class="i2">},</li>
                <li class="i2">"alternateadvancements" : {</li>
                <li class="i3">"alternateadvancement_list" : [{</li>
                <li class="i4">"tier" : 4,</li>
                <li class="i4">"treeID" : 59,</li>
                <li class="i4">"id" : 4098129215</li>
                <li class="i3">}, {</li>
                <li class="i4">"tier" : 5,</li>
                <li class="i4">"treeID" : 59,</li>
                <li class="i4">"id" : 1466100473</li>
                <li class="i3">]</li>
                <li class="i2">}</li>
                <li class="i1">}</li>
            </ul>
        </div>
    </div>
    <div>
        <h2>Request Body</h2>
        <span class="paramDesc">application/json encoded text with the following format:</span>
        <div class="code">
            <ul>
                <li class="i1">{</li>
                <li class="i2">"type" : {</li>
                <li class="i3">"class" : "Classname" // case-sensitive</li>
                <li class="i2">},</li>
                <li class="i2">"alternateadvancements" : {</li>
                <li class="i3">"alternateadvancement_list" : [</li>
                <li class="i4">One or more of { "tier" : AATier, "treeId": treeId, "id": AAId }</li>
                <li class="i3">]</li>
                <li class="i2">}</li>
                <li class="i1">}</li>
            </ul>
        </div>
    </div>
    <div>
        <h2>Returns</h2>
        <span>JSON encoded string of the full calculator URL.</span>
        <span class="code">"http:\/\/beetny.com\/eq2aa\/#GU63;4t20@d540@d"</span>
    </div>
</div>
</body>
</html>
