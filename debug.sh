#!/bin/bash
TOKEN=$( cat ../tk${PWD##*/} ) && export TOKEN && node --trace-warnings index.js