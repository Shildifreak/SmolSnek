#! /usr/bin/env bash

mkdir -p "build"
mkdir -p "dist"

strip-json-comments minify_config.json > build/minify_config.json

VERSIONS=src/*
for v in $VERSIONS
do
	vn=$(basename -- "$v")
	
	cp -r "src/${vn}" "build/"
	inline-script-tags "build/${vn}/index.html" .
	inline-stylesheets "build/${vn}/index.html" .
	
	url='data:text/html;base64,'$(html-minifier-terser --config-file build/minify_config.json build/${vn}/index.html | base64 -w0)
	
	echo -n $url > "build/${vn}/url.txt"
	echo -n $url | qrencode -o "dist/${vn}.png"

	echo -n "${vn}: "
	echo $url | wc -c
	
	#html-minifier-terser --config-file build/minify_config.json build/${vn}/index.html

done
