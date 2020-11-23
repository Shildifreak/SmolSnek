#! /usr/bin/env bash

strip-json-comments minify_config.json > build/minify_config.json

FILES=src/*
for f in $FILES
do
	url='data:text/html;base64,'$(html-minifier-terser --config-file build/minify_config.json $f | base64 -w0)
	
	echo -n "$f: "
	echo $url | wc -c
	
	fn=$(basename -- "${f%%.html}")
	echo -n $url > "build/${fn}.url"
	echo -n $url | qrencode -o "dist/${fn}.png"

done
