# SmolSnek #

Snake made to fit on a QR Code  
  
The versions in src/ are self contained and should work as is.  
  
Using included `toolchain.bash` script all versions can be turned into a QR Code.  
This will automatically perform the following steps:

- inline the js and css into the html,
- minify the bundled html,
- convert html to base64,
- add data url prefix, and
- encode data url into QR code.

Prebuilt QR Codes can be found at https://github.com/Shildifreak/SmolSnek/releases

### dependencies of toolchain.bash ###
- `apt install qrencode`
- `apt install npm`
- `npm install -g html-minifier-terser`
- `npm install -g strip-json-comments-cli`
- `npm install -g inline-scripts`


### versions ###

|version| noticeable features                                                      |
|-------|--------------------------------------------------------------------------|
|   1   | working snake                                                            |
|   2   | smaller snake                                                            |
|   3   | smallest snake                                                           |
|   4   | added touch controls                                                     |
|   5   | added highscore                                                          |
|   6   | added smoother animations                                                |