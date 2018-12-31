1. Read the sample file as arraybuffer from
http://demo.castlabs.com/tmp/text0.mp4
2. Iterate through the file and print the size and type of each box found to the console. The following assumptions can be made:
a. A box of type ​moof​ only contains other boxes
b. A box of type ​traf​ only contains other boxes
c. All other boxes don’t contain other boxes.
3. If the box of type ​mdat​ is found, extract and print the content of that box. It can be assumed that the content is a UTF­8 encoded XML string.
