const { spawn } = require('child_process')
const path = require('path');
const fs = require('fs');

let fileArray=[];
let count=0;

//joining path of directory 
const directoryPath = path.join(__dirname, 'input');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
   
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    fileArray=files;
    addPtxt()
});


function addPtxt(){


const ff2=['-i', 'input/'+fileArray[count]+'', '-i', 'pxtx.png','-filter_complex', "[0:v][1:v] overlay=0:0:enable='between(t,0.5,10)'",'-pix_fmt', 'yuv420p', '-c:a', 'copy','output/'+fileArray[count]+''];

var ffmpeg = spawn('ffmpeg', ff2);
            // input_file.pipe(ffmpeg.stdin);
            // ffmpeg.stdout.pipe(output_stream);

            ffmpeg.stderr.on('data', function (data) {
                console.log(data.toString());
            });

            ffmpeg.stderr.on('end', function () {
                console.log('file has been converted succesfully');
            });

            ffmpeg.stderr.on('exit', function () {
                console.log('child process exited');
            });

            ffmpeg.stderr.on('close', function() {
                
                if(count==fileArray.length){
                    console.log('...closing time! bye');
                }else{
                    console.log('...wuub wuub onemore time');
                    count++
                    
                    addPtxt()
                }
               
            });
            
          
}