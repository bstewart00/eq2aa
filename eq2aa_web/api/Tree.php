<?php

require_once('utils.php');
require_once('AA.php');

class Tree {

    private $json;
    private $totalPointsSpent = 0;
    private $treeHashToken = "t";
    private $repeatHashToken = "@";

    public function __construct(&$json) {
        $this->json = &$json;
    }

    public function getAAByName($name) {
        foreach ($this->json["aa"] as &$aaJson) {
            if (strcasecmp($aaJson["name"], $name) === 0) {
                return new AA($aaJson);
            }
        }
    }

    public function getAABySonyId($sonyId) {
        foreach ($this->json["aa"] as &$aaJson) {
            if ($aaJson["soe_id"] == $sonyId) {
                return new AA($aaJson);
            }
        }
    }

    public function getSonyId() {
        return $this->json["soe_id"];
    }

    public function setSonyId($id) {
        $this->json["soe_id"] = $id;
    }

    public function spendPoints($aaSonyId, $amount) {
        $aa = $this->getAABySonyId($aaSonyId);
        if ($aa != null) {

            $aa->spendPoints($amount);

            $this->totalPointsSpent += $aa->getPointsSpent();
        }
    }

    private function prependWithZeroes($string, $minLength) {
        while (strlen($string) < $minLength) {
            $string = "0" . $string;
        }

        return $string;
    }

    private function getTotalPointsSpent() {
        return $this->totalPointsSpent;
    }
    
    private function createAAHash($aa) {
        return base36_encode($aa["level"]);
    }

    public function buildHash() {
        $hash = "";

        if ($this->getTotalPointsSpent() === 0) {
            return $hash;
        }

        $hash .= $this->treeHashToken . base36_encode($this->json["id"]);
        
        $aaHash = collateAdjacentDuplicates(array_map(array($this, "createAAHash"), $this->json["aa"]));
        if (strpos(end($aaHash), "0")) {
            $aaHash.pop();
        }

        foreach ($aaHash as &$value) {
            $repeatedChar = $value[0];
            $numRepeats = strlen($value);
            if ($numRepeats >= 3) {
                $value = $repeatedChar . $this->repeatHashToken . base36_encode($numRepeats);
            }
        }

        $hash .= implode($aaHash);

        return $hash;
    }
}

?>
