<?php

require_once('utils.php');
require_once('Tree.php');

class PlayerClass {

    private $json;
    private $className;
    private $archetype;
    private $trees = array();

    public function __construct($json) {
        $this->json = $json;

        $this->className = $this->json["name"];
        $this->lineage = $this->json["lineage"];

        foreach ($this->json["trees"] as $treeType => &$treeJson) {
            $this->trees[$treeType] = new Tree($treeJson);
        }
    }

    public function getTreeByType($type) {
        $lookupKey = "";

        if ($this->className == $type) {
            $lookupKey = "Class";
        } else if ($this->lineage["archetype"] == $type) {
            $lookupKey = "Archetype";
        } else {
            $lookupKey = $type;
        }

        return $this->trees[$lookupKey];
    }

    public function getTreeBySonyId($treeSonyId) {
        foreach ($this->trees as $tree) {
            if ($tree->getSonyId() == $treeSonyId) {
                return $tree;
            }
        }
    }

    public function spendPoints($treeSonyId, $aaSonyId, $amount) {
        $tree = $this->getTreeBySonyId($treeSonyId);
        if ($tree != null) {
            $tree->spendPoints($aaSonyId, $amount);
        }
    }

    public function buildHash() {
        $idBase36 = base36_encode($this->json["id"]);
        
        $hash = "$idBase36";
        foreach ($this->trees as $tree) {
            $hash .= $tree->buildHash();
        }

        return $hash;
    }

    public function saveToFile($baseDir) {
        $filepath = $baseDir . "/" . $this->className . ".json";

        $handle = fopen($filepath, "w");
        if ($handle != null) {
            if (fwrite($handle, json_encode($this->json))) {
                echo "$filepath written successfully.<br>";
            }
        }
    }

}

?>
