<?php

require_once("../api/EQ2DataApi.php");
require_once("../api/UrlGenerator.php");

if ($_GET) {
    $characterId = $_GET['id'];
    if (is_numeric($characterId)) {
        $dataApi   = new EQ2DataApi();
        $generator = new UrlGenerator($dataApi);
        $url       = $generator->GenerateForPlayerId($characterId);
        if ($url != null) {
            header("Location: $url");
        }
    }
    
    echo "Invalid character ID";
}
?>