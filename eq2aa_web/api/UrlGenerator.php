<?php
require_once ('PlayerClassLoader.php');
require_once ('EQ2DataApi.php');

class UrlGenerator {

    private $dataApi;
    private static $baseUrl = "http://beetny.com/eq2aa/";
    private static $version = "GU65"; //FIXME: include in class definition

    public function __construct($dataApi) {
        $this->dataApi = $dataApi;
    }

    public function GenerateForPlayerId($playerId) {
        $playerData = $this->dataApi->getPlayerById($playerId);
        if ($playerData != null) {
            return $this->GenerateFromData($playerData);
        }
    }

    public function GenerateFromData($playerData) {

            $classJson = PlayerClassLoader::loadClassJson($playerData["type"]["class"]);
            $eq2class = new PlayerClass($classJson);

            foreach ($playerData["alternateadvancements"]["alternateadvancement_list"] as $aa) {
                $eq2class->spendPoints($aa["treeID"], $aa["id"], $aa["tier"]);
            }

            $hash = "#" . self::$version . ";" . $eq2class->buildHash();

   return self::$baseUrl . $hash;

   }
   }
?>
