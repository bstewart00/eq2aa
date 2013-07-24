<?php

class AA {

    private $json;

    public function __construct(&$json) {
        $this->json = &$json;
    }

    public function spendPoints($amount) {
        $this->json["level"] += $amount;
    }

    public function getPointsSpent() {
        return $this->json["level"] * $this->json["cost"];
    }

    public function setSonyId($id) {
        $this->json["soe_id"] = $id;
    }

}

?>
