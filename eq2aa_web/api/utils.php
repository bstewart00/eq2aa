<?php

function collateAdjacentDuplicates($array) {
    for ($i = 0; $i < count($array); ++$i) {
        $current = $array[$i];
        $adjacentDuplicateCount = 0;
        
        for ($j = 1; $i + $j < count($array) && $array[$i + $j] == $current; ++$j) {
            ++$adjacentDuplicateCount;
        }

        for ($dupe = 0; $dupe < $adjacentDuplicateCount; ++$dupe) {
            $array[$i] .= $current;
        }

        array_splice($array, $i + 1, $adjacentDuplicateCount);
    }
    
    return $array;
}

function base36_encode($base10) {
    return base_convert($base10, 10, 36);
}

function base36_decode($base36) {
    return base_convert($base36, 36, 10);
}

?>
