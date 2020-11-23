#! /usr/bin/env bash

strip-json-comments minify_config.json > tmp.json

url='data:text/html;base64,'$(html-minifier-terser --config-file tmp.json index5.html | base64 -w0)

rm tmp.json

echo $url
echo
echo $url | wc -c

echo -n $url > index5.url
echo -n $url | qrencode -o index5.png
