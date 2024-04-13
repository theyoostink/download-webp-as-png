chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if (request.message == "downloadWebPAsPNG") {
		var image = new Image();

		// Resolves "Tainted canvases may not be exported" error
		image.crossOrigin = "anonymous";

		image.onload = function() {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);

			// Default type = image/png
			canvas.toBlob(function (blob) {
				var downloadLink = document.createElement("a");
				downloadLink.setAttribute("download", "image.png");
				
				var downloadURL = URL.createObjectURL(blob);
				downloadLink.setAttribute("href", downloadURL);
				downloadLink.click();
			});
		}

		// When the image is fully loaded, trigger `onload` above
		image.src = request.imgURL;
	}
});