#!/bin/bash
python ./makesite.py
cd _site
../../scripts/deploy.sh
echo 'site deployed'
