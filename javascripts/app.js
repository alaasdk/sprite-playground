; (function () {



    var uploader = document.getElementById("uploader");
    var logger = document.getElementById("logger");
    var preview = document.getElementById("preview");
    var width = document.getElementById("width");
    var height = document.getElementById("height");
    var fps = document.getElementById("fps");
    var frames = document.getElementById("frames");
    
    var startBtn = document.getElementById("start");
    var destroyBtn = document.getElementById("destroy");

    width.addEventListener("change", function () {
        logger.log("new width .. " + this.value);
        preview.style.width = this.value + "px";
    });

    height.addEventListener("change", function () {
        logger.log("new height .. " + this.value);
        preview.style.height = this.value + "px";
    });

    uploader.addEventListener("change", function () {
        logInfo();
        handleimg(uploader.files);
    });
    
    startBtn.addEventListener("click", start);

    logger.log = function (msg) {
        var d = new Date();
        logger.innerHTML = d.toJSON() + " . " + msg + "<br>" + logger.innerHTML;
        return logger;
    }
    logger.clear = function () {
        logger.innerHTML = "";
        return logger;
    }



    function logInfo() {
        logger.log("update");
        var nBytes = 0,
            oFiles = uploader.files,
            nFiles = oFiles.length;
        for (var nFileId = 0; nFileId < nFiles; nFileId++) {
            nBytes += oFiles[nFileId].size;
        }
        var sOutput = nBytes + " bytes";
        // optional code for multiples approximation
        for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple] + " (" + nBytes + " bytes)";
        }
        // end of optional code
        logger.log("fileNum .. " + nFiles)
        logger.log("fileSize .. " + sOutput)

    }

    function handleimg(files) {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var imageType = /^image\//;

            if (!imageType.test(file.type)) {
                continue;
            }


            var img = document.createElement("img");
            //img.classList.add("obj");
            img.file = file;
            //document.getElementById("body").appendChild(img); 

            var reader = new FileReader();
            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;


                    //document.body.style.backgroundImage = "url('" +   e.target.result  +   "')";

                    preview.style.backgroundImage = "url('" + e.target.result + "')";

                };
            })(img);
            reader.readAsDataURL(file);
        }
    }



    function start() {
        logger.log("started");
        
        sprite = new Motio(preview, {
            fps: fps.value,
            frames: frames.value,
            vertical: true
        });

        sprite.toEnd();

    }


    logger.clear().log("loaded");
})();