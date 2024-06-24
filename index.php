<?php
header('Content-Type: text/plain');

function repeatString($str, $num) {
    return str_repeat($str, $num);
}

$fontSizeBig = 40;
$fontSizeSmall = 20;

$spacesBig = repeatString(' ', floor(($fontSizeBig - 4) / 2));
$spacesSmall = repeatString(' ', floor(($fontSizeSmall - 5) / 2));

echo $spacesBig . "Work in progress...\n\n";

echo $spacesSmall . "Work in progress...\n";

echo $spacesSmall . "Work in progress...";
?>
