<?php
require_once '../lib/restler/restler.php';
require_once("CharacterUrlMapper.php");
require_once("PlayerDataUrlMapper.php");

#set autoloader
#do not use spl_autoload_register with out parameter
#it will disable the autoloading of formats
spl_autoload_register('spl_autoload');

$r = new Restler();
$r->setSupportedFormats('JsonFormat');
$r->addAPIClass('CharacterUrlMapper', "get/character_url/");
$r->addAPIClass('PlayerDataUrlMapper', "post/get_url_from_data/");
$r->handle();
?>