#!/bin/bash

echo Counting files of current directory

shopt -s extglob
FILES=.
foldernb=0
filenb=0
linenb=0
wordnb=0
charnb=0

searchin() {
    for f in $1/*
    do
        echo $f
        if [[ -f "$f" ]]
        then
            let filenb++
            let linenb+=`wc -l $f` 2>/dev/null
            let wordnb+=`wc -w $f` 2>/dev/null
            let charnb+=`wc -m $f` 2>/dev/null
        fi

        if [[ -d "$f" && "$f" != *"node_modules"* ]]
        then
            let foldernb++
            searchin $f
        fi
    done
}

searchin $FILES;

echo -ne "
============= SUM UP =============

$foldernb folders
$filenb files
$linenb lines
$wordnb words
$charnb characters

Size : `du -sh --exclude='node_modules'`\n"
