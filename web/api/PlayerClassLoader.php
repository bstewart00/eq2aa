<?php

require_once('PlayerClass.php');

class PlayerClassLoader {

    public static function loadClassJson($className) {
        $filename = dirname(__FILE__) . "/../js/trees/$className.json";
        $handle = fopen($filename, "r");
        if ($handle) {
            $treeJson = fread($handle, filesize($filename));
            return json_decode($treeJson, true);
        }
    }

}

?>
