<?php
header('Content-Type: text/plain');

function repeatString($str, $num) {
    return str_repeat($str, $num);
}

$fontSizeBig = 40;
$fontSizeSmall = 20;

$spacesBig = repeatString(' ', floor(($fontSizeBig - 4) / 2));
$spacesSmall = repeatString(' ', floor(($fontSizeSmall - 5) / 2));

echo $spacesBig . "Wprk in progress....\n\n";

echo $spacesSmall . "Simple Javascript-php server\n";

echo $spacesSmall . "Work in progress...";
?>
