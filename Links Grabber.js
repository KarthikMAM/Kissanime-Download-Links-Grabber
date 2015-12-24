/*-----------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 1.0
	Websites Supported	: *http://www.kissanime.com
						  *http://www.kisscartoon.me
						  *http://www.kissasian.com
							

-----------------------------------------------------------------------------------*/

//Volatile variables that might change depending on the condition
QUALITY = 3;


//Create a new frame from where we can navigate to the successive pages
tempFrame = document.createElement("iframe");
tempFrame.src = document.location;
tempFrame.height = 0;
tempFrame.width = 0;
document.getElementsByTagName("body")[0].appendChild(tempFrame);


//When the iframe loads the page get the download links from ita
dwnlLinks = [];
tempFrame.onload = function() {
	//The document of the temporary iframe 
	//It is used to get the anchor tag's href links
	//Push it to the dwnlLinks list
	tempDoc = tempFrame.contentWindow.document;
	dwnlHref = tempDoc.getElementById("divDownload").childNodes[QUALITY].getAttribute("href");
	dwnlLinks.push(dwnlHref);
	
	//If there is a next page traverse to it
	//Otherwise print the links
	if(tempDoc.getElementById("btnNext") != null) {
		tempDoc.getElementById("btnNext").click();
	} else {
		//Get the title from the webpage
		titleTag = document.getElementById("navsubbar").childNodes[1].childNodes[1];
		document.write("<center><h1><a target='_blank' href='" + titleTag.href + "'>" + titleTag.innerHTML.replace("information", "").replace(/ +(?= )/g,'') + "</a><br></h1></center>");
		
		//Append the download links as an unordered list
		document.write("<ul>");
		for(i in dwnlLinks) {
			document.write("<li><a target='_blank' href='" + dwnlLinks[i] + "'>" + dwnlLinks[i] + "</a><br>");
		}
		document.write("</ul>");
		print();
	}
	
	console.log(dwnlHref);
};