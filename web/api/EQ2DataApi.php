<?php

class EQ2DataApi {
    private $trees = array();

    public function __construct() {
    }

    public function getClassList() {
        $classMap = array();
        $classData = json_decode(file_get_contents('http://census.daybreakgames.com/s:eq2aa/json/get/eq2/constants/?c:show=adventureclass_list'), true);
        if ($classData["returned"] == 1) {
            $adventureclass_list = $classData["constants_list"][0]["adventureclass_list"];

            foreach ($adventureclass_list as $adventureclass) {
                if (strcmp($adventureclass["issubclass"], "false")) {

                    $treeIds = array();
                    foreach ($adventureclass["alternateadvancementtree_list"] as $treeId) {
                        array_push($treeIds, $treeId["id"]);
                    }

                    $classMap[ucfirst($adventureclass["name"])] = $treeIds;
                }
            }
        }

        return $classMap;
    }

    private function fetchTree($treeId) {
        $treeData = json_decode(file_get_contents("http://census.daybreakgames.com/s:eq2aa/json/get/eq2/alternateadvancement/$treeId"), true);
        if ($treeData["returned"] == 1) {
            $tree = $treeData["alternateadvancement_list"][0];

            return $tree;
        }
    }
    
    private function fetchPlayer($playerId) {
        $playerData = json_decode(file_get_contents("http://census.daybreakgames.com/s:eq2aa/json/get/eq2/character/$playerId?c:show=alternateadvancements,type.class,alternateadvancements.alternateadvancement_list"), true);
        if ($playerData["returned"] == 1) {
            return $playerData["character_list"][0];
        }
    }
    
    public function getPlayerById($id) {
        return $this->fetchPlayer($id);
    }

    public function getTreeById($id) {
        if (!array_key_exists($id, $this->trees)) {
            $this->trees[$id] = $this->fetchTree($id);
        }

        return $this->trees[$id];
    }

}

?>
