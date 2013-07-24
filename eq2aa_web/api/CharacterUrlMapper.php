<?php

require_once 'EQ2DataApi.php';
require_once 'UrlGenerator.php';

class CharacterUrlMapper {

    private function writeJsonResponse($data) {
        header('Content-type: application/json');
        echo json_encode($data);
    }

    public function index($characterId) {
        if (is_numeric($characterId)) {
            $dataApi = new EQ2DataApi();
            $generator = new UrlGenerator($dataApi);
            $url = $generator->GenerateForPlayerId($characterId);
            if ($url != null) {
                $this->writeJsonResponse($url);
                return;
            }
        }

        throw new RestException(400);
    }
}

?>
