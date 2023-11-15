#!/bin/bash
python3 ./makesite.py
cd _site
../../scripts/deploy.sh
echo 'site deployed'
