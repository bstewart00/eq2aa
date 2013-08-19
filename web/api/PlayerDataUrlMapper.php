<?php

require_once 'UrlGenerator.php';

class PlayerDataUrlMapper {

    private function writeJsonResponse($data) {
        header('Content-type: application/json');
        echo json_encode($data);
    }

    public function post($request_data) {
        if (empty($request_data)) {
        throw new RestException(412, "request data is empty");
        }

            $generator = new UrlGenerator(null);
            $url = $generator->GenerateFromData($request_data);
            if ($url != null) {
                $this->writeJsonResponse($url);
                return;
            }

        throw new RestException(400);
    }
}

?>