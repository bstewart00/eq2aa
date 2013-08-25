<?php
$content = $_POST['export-xml-data'];
$filename = $_POST['export-xml-filename'];
$length = strlen($content);

header('Content-Description: File Transfer');
header('Content-Type: text/xml');
header("Content-Disposition: attachment; filename=$filename.xml");
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . $length);
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Expires: 0');
header('Pragma: public');

echo $content;
exit;

?>