/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 2.0
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
						  
	How to use?			: 1. Go to the episode ith page
						  2. Press F12 and to open the Browser's console
						  3. Copy this script and press enter
						  4. Wait till all the results page appears
	References			: 1. "https://kissanime.to/Scripts/asp.js" for getting video links
							

-----------------------------------------------------------------------------------------------------------*/

//General Selectors
var TITLE_SELECTOR = "#navsubbar > p > a";
var DWN_SCRIPT_SEL = "#divDownload script";
var NEXT_BUTTON_ID = "#btnNext";
var QUALITY_SELECT = 0;				//Select which video file you want to download

//Global variables
var dwnlLinks = [];
var isComplete = false;
var nextPage = document.location.href;
var episodeTitle = nextPage
						.split("/")[4]
						.split("-")
						.join(" ") + " -.mp4";

function documentReady(data) {
	
	//Get the document of the from the downloaded data
	var tempDoc = document.createElement("html");
	tempDoc.innerHTML = data;

	if (!isComplete) {
		//Get the episode number
		var episodeId = nextPage
							.split("/")[5]
							.split("?")[0]
							.split("-")[1];
		
		//Get the download links and select the quality
		var dwnlLink = document.createElement("li");
		dwnlLink.innerHTML = asp.wrap(tempDoc
										.querySelector(DWN_SCRIPT_SEL)
										.innerHTML
										.split('"')[1]);
		dwnlLink.getElementsByTagName("a")[0].innerHTML = episodeTitle.replace("-", episodeId);
		dwnlLink.innerHTML = dwnlLink.getElementsByTagName("a")[QUALITY_SELECT].outerHTML;
		dwnlLinks.push(dwnlLink);
		
		//Traverse to the next page if available
		//Otherwise navigate to the title page
		if (tempDoc.querySelector(NEXT_BUTTON_ID) != null) {
			nextPage = tempDoc
							.querySelector(NEXT_BUTTON_ID)
							.parentElement
							.getAttribute("href");
		} else {
			isComplete = true;
			nextPage = tempDoc.querySelector(TITLE_SELECTOR).href;
		}
		
		//Get the next page
		$.get(nextPage, documentReady);
	} else {
		//Create a new HTML document for displaying the results
		writeDoc(dwnlLinks, tempDoc);
	}
};

function writeDoc(episodeList, tempDoc) {
	//Document Printer's Selectors
	var LFT_ADS_DIVS = "#leftside > center";
	var COMMENT_DIV1 = "#leftside > div:nth-child(7)";
	var COMMENT_DIV2 = "#leftside > div:nth-child(8)";
	var EPISODE_LIST = "#leftside > div:nth-child(4) > div.barContent.episodeList > div:nth-child(2)";
	var RIT_ADS_DIVS = "#rightside > div:nth-child(5)";
	
	//Create a new container to hold the new list of episodes
	var divEpisodes = document.createElement("div");
	var episodeHTML = "<ul>";
	for (var i in episodeList) {
		episodeHTML += episodeList[i].outerHTML;
	}
	episodeHTML += "</ul>";
	divEpisodes.innerHTML = episodeHTML;
	tempDoc.querySelector(EPISODE_LIST).appendChild(divEpisodes);
	
	//Remove the unwanted contents
	try {
		tempDoc.querySelector(COMMENT_DIV1).innerHTML = "";
		tempDoc.querySelector(EPISODE_LIST).innerHTML = divEpisodes.outerHTML;
		tempDoc.querySelector(LFT_ADS_DIVS).innerHTML = "";
		tempDoc.querySelector(RIT_ADS_DIVS).innerHTML = "";
		tempDoc.querySelector(COMMENT_DIV2).innerHTML = "";	
	} catch (error) {
		console.log("Error: Change the Print Selectors to suit this website");
	}
	
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

//Start grabbing the download link
$.get(nextPage, documentReady);