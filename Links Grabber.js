/*-----------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 2.0
	Websites Supported	: *http://www.kissanime.com
						  *http://www.kisscartoon.me
						  *http://www.kissasian.com
							

-----------------------------------------------------------------------------------*/

//General Selectors
var QUALITY_SELECTOR = "#divDownload > a:nth-child(2)"; //Change the index to the req. quality
var TITLE_SELECTOR = "#navsubbar > p > a";
var NEXT_BUTTON_ID = "btnNext";

//Global variables
var dwnlLinks = [];
var isComplete = false;

//Create a new frame from where we can navigate to the successive pages
var tempFrame = document.createElement("iframe");
tempFrame.src = document.location.href;
tempFrame.height = "0";
tempFrame.width = "0";
document.getElementsByTagName("body")[0].appendChild(tempFrame);


//When the iframe loads the page get the download links from ita
tempFrame.onload = function () {
	//Get the document of the iFrame
	var tempDoc = tempFrame.contentWindow.document;

	if (!isComplete) {
		//Get the download link
		dwnlLinks.push(tempDoc.querySelector(QUALITY_SELECTOR).href);
		
		//Traverse to the next page if available
		//Otherwise navigate to the title page
		if (tempDoc.getElementById(NEXT_BUTTON_ID) != null) {
			tempDoc.getElementById(NEXT_BUTTON_ID).click();
		} else {
			isComplete = true;
			tempDoc.location = tempDoc.querySelector(TITLE_SELECTOR).href;
		}
	} else {
		//Create a new HTML document for displaying the results
		writeDoc(dwnlLinks, tempDoc);
	}
};

function writeDoc(episodeList, tempDoc) {
	//Document Printer's Selectors
	var LFT_ADS_DIVS = "#leftside > center";
	var COMMENTS_DIV = "#leftside > div:nth-child(7)";
	var EPISODE_LIST = "#leftside > div:nth-child(4) > div.barContent.episodeList > div:nth-child(2)";
	var RIT_ADS_DIVS = "#rightside > div:nth-child(5)";
	
	//Remove the unwanted contents
	try {
		tempDoc.querySelector(COMMENTS_DIV).innerHTML = "";
		tempDoc.querySelector(EPISODE_LIST).innerHTML = "";
		tempDoc.querySelector(LFT_ADS_DIVS).innerHTML = "";
		tempDoc.querySelector(RIT_ADS_DIVS).innerHTML = "";	
	} catch (error) {
		console.log("Error: Change the Print Selectors to suit this website");
	}
	
	//Create a new container to hold the new list of episodes
	var divEpisodes = tempDoc.createElement("div");
	var episodeHTML = "<ol>";
	for (var i in episodeList) {
		episodeHTML += "<li><a target='_blank' href='" + episodeList[i] + "'>" + episodeList[i] + "</a></li>";
	}
	episodeHTML += "</ol>";
	divEpisodes.innerHTML = episodeHTML;
	tempDoc.querySelector(EPISODE_LIST).appendChild(divEpisodes);
	
	
	//Create the html document using the original document as a template
	var docHTML = "<html>"
					+"<br><br>"
					+tempDoc.getElementsByTagName("head")[0].outerHTML
					+"<body>"
			 			+tempDoc.querySelector("#container").outerHTML
					+"</body>"
				 +"</html>";
	document.write(docHTML);	
}