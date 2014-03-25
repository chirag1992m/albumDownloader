/* Javascript to download photographs from a facebook album */

/* copy the script (compressed one) and paste it in the browser
 * (only start the script after loading the whole album
 * in the browser else it may download else images),
 * javascript: <script>
 * and click "GO"
 */

// get all the elements with the thumbnails

var	thumbClass = "uiMediaThumbImg", parentDivClass = "tagWrapper", 
	downloadUrlPre = "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-snc7/",
	downloadUrlSuf = "?dl=1";
var thumbs = document.getElementsByClassName(thumbClass);
var finalThumbs = new Array(),
	finalUrls = new Array();

for(var i=0, j=0; i < thumbs.length; i++) {
	if(thumbs[i].parentNode.getAttribute("class") == parentDivClass) {
		finalThumbs[j] = thumbs[i];
		j++;
	}
}

var url, lastindex;
var newIframe, _body = document.getElementsByTagName("body")[0];

for(var j=0; j<finalThumbs.length; j++) {
	url = finalThumbs[j].style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '').replace(/_a/, '_n');
	lastindex = url.lastIndexOf('/');
	finalUrls[j] = downloadUrlPre+url.substring(lastindex+1)+downloadUrlSuf;
//	console.log(finalUrls[j]);
}

var j=0;

function downloadImage(imageUrl) {
	//console.log(imageUrl);
	newIframe = document.createElement("iframe");
	newIframe.style.display = "hidden";
	_body.appendChild(newIframe);
	newIframe.setAttribute('src', imageUrl);
	j++;
	if(j<finalUrls.length)
		setTimeout(function() {downloadImage(finalUrls[j]);}, 15000);
}

if(j<finalUrls.length)
	setTimeout(function() {downloadImage(finalUrls[j]);}, 100);

/*for(var j=0; j<finalUrls.length; j++) {
	setTimeout(function() {downloadImage(finalUrls[j]);}, (j+1)*1000);
}

/*var j=0;
var newIframe = document.createElement("iframe"),
_body = document.getElementsByTagName("body")[0];

function downloadImage() {
	console.log("Image "+(j+1)+"downloaded!");
	this.removeEventListener('load', arguments.callee, false);
	j++;
	if(j < finalUrls.length)
		this.setAttribute('src', finalUrls[j]);
	console.log("here");
	this.addEventListener('load', downloadImage, false);
}
newIframe.style.display = "hidden";

newIframe.addEventListener('load', downloadImage, false);

_body.appendChild(newIframe);
newIframe.setAttribute('src', finalUrls[j]);*/