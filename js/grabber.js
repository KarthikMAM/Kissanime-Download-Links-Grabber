/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 2.3
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
						  
	How to use?			: 1. Go to the episode ith page
						  2. Press F12 and to open the Browser's console
						  3. Copy this script and press enter
						  4. Wait till all the results page appears
							

-----------------------------------------------------------------------------------------------------------*/

//domain identifier
var IS_KISSANIME = document.location.href.includes("kissanime");
var IS_KISSASIAN = document.location.href.includes("kissasian");
var IS_KISSCARTN = document.location.href.includes("kisscartoon"); 

//global Selectors
var TITLE_SELECTOR = "#navsubbar > p > a";
var DWN_SCRIPT_SEL = IS_KISSANIME ? "#divDownload" : "#divDownload script";
var NEXT_BUTTON_ID = "#btnNext";
var MESSAGE_SELECT = "grabberProgress";

//stop the script if the script is already running
if (document.getElementById(MESSAGE_SELECT) != null) {
    window.alert("Script is already running");
    throw new Error("Error: Script is already running");
}

//global variables
var episodeLinks = [];
var isComplete = false;
var nextPage = document.location.href;                        

//logic to grab the download links          
function documentReady(data) {
	
	//get the document of the from the downloaded data
	var tempDoc = document.createElement("html");
	tempDoc.innerHTML = data;

	if (!isComplete) {
		//get the episode number and log the progress 
		var episodeId = nextPage
							.split("/")[5]
							.split("?")[0]
							.split("-")[1];
        console.log("Current Episode : " + episodeId);
        document.getElementById(MESSAGE_SELECT).innerHTML = "Grabbed " + (episodeLinks.length + 1) + " Episodes... ( <b>Current Episode : " + episodeId + "</b> )";
		
		//get the download links and store it as a list
        try {
            var episodeLink = document.createElement("li");
			episodeLink.style = "padding-top:3px"

			//links to different resolutions
			episodeLink.innerHTML = IS_KISSANIME ? 
										tempDoc.querySelector(DWN_SCRIPT_SEL).innerHTML  
										: $kissenc.decrypt(tempDoc
																.querySelector(DWN_SCRIPT_SEL)
																.innerHTML
																.split('"')[1]);

			//add them to the episode list
			episodeLink.childNodes[0].textContent = "Episode " + episodeId + ": ";
            episodeLinks.push(episodeLink);
			document.getElementById("episodeList").appendChild(episodeLink);
			$("a").attr("target", "blank");
        } catch (error) {
			console.log(error);
            document.getElementById(MESSAGE_SELECT).innerHTML = "Not all the links were grabbed due to robot test... ☹";
            return;
        }
		
		//traverse to the next page if available otherwise to the title page
		if (tempDoc.querySelector(NEXT_BUTTON_ID) != null) {
			nextPage = tempDoc
							.querySelector(NEXT_BUTTON_ID)
							.parentElement
							.getAttribute("href");
		} else {
			isComplete = true;
			nextPage = tempDoc.querySelector(TITLE_SELECTOR).href;
		}
		
		//get the next page
        //have a random timeout to prevent the website from discovering you as a script
		setTimeout( function() { $.get(nextPage, documentReady); }, Math.floor(Math.random() * 5000) + 5000);
	} else {
		//create a new HTML document for displaying the results
		writeDoc(episodeLinks, tempDoc);
	}
};

function writeDoc(episodeList, tempDoc) {

	//document editor's selectors
	var COMMENTS_DIV = "#leftside > div:last-child";
	var EPISODE_LIST = "#leftside > div > div.barContent.episodeList";
	var RIT_ADS_DIVS = "#rightside > div:nth-child(5)";
	var LFT_ADS_DIVS = "#leftside > center";
	
	//create a new container to hold the new list of episodes
	var divEpisodes = document.createElement("div");
	var episodeHTML = "<ul><h3>";
	for (var i in episodeList) {
		episodeHTML += episodeList[i].outerHTML;
	}
	episodeHTML += "</h3></ul>";
	divEpisodes.innerHTML = "<div class='arrow-general'>&nbsp;</div>" + episodeHTML;
	
	//remove the unwanted contents and add the required contents
	if (tempDoc.querySelector(EPISODE_LIST) != null) tempDoc.querySelector(EPISODE_LIST).innerHTML = divEpisodes.outerHTML;
	if (tempDoc.querySelector(COMMENTS_DIV) != null) tempDoc.querySelector(COMMENTS_DIV).outerHTML = "";
	if (tempDoc.querySelector(LFT_ADS_DIVS) != null) tempDoc.querySelector(LFT_ADS_DIVS).outerHTML = "";
	if (tempDoc.querySelector(RIT_ADS_DIVS) != null) tempDoc.querySelector(RIT_ADS_DIVS).outerHTML = "";

	//create the html document using the original document as a template
	var docHTML = "<html>"
					+tempDoc.getElementsByTagName("head")[0].outerHTML
					+"<body>"
						+"<style>"
							+"li > a:visited { opacity: 0.6 }"
						+"</style>"
                        +"<br><br>"
			 			+tempDoc.querySelector("#container").outerHTML
                        +"<div style='height:85%'></div>"
                        +"<br> <br> <div id='footer' style='position:relative; width:100%'> <div id='footcontainer'> <p>"
							+"Extension Developed by <a href='http://github.com/KarthikMAM'>Karthik M A M</a>. "
							+"View this repository on <a href='https://github.com/KarthikMAM/Kissanime-Download-Links-Grabber'>GitHub</a>. "
							+"You can also request features <a href='https://github.com/KarthikMAM/Kissanime-Download-Links-Grabber/issues'>@Github Issues</a>"
						+"</p> </div> </div>"
                        +"</script>"
					+"</body>"
				 +"</html>";
    document.documentElement.innerHTML = docHTML;
    
    //make all the links open in a new tab
    $("a").attr("target", "_blank");
}

//add a loading animation page to indicate the progress
var loadPage =  "<body style='background-color:whitesmoke'>"
					+"Developed by <span><a href='https://github.com/KarthikMAM' target='_blank'>Karthik M A M</a></span>"
                    +"<div style='margin-top:150px;'>"
                        +"<center>"
                            +"<img style='margin-top:150px' src='" + chrome.extension.getURL("img/preloader.gif") + "'>"
                            +"<p id='grabberProgress'>Grabbing Episodes. . .</p>"
							+"<div style='display:table;'>"
								+"<h4 align='left'>Download Links:</h4>"
								+"<ul align='left' id='episodeList' style='color:040404;padding-left:30px;'/>"
							+"</div>"
                        +"</center>"
                    +"</div>"
                +"</body";
document.head.innerHTML = "<title> KissAnime | KissCartoon | KissAsian Download Links Grabber </title>"
							+"<style>"
								+"* { font-family:Arial, Helvetica, sans-serif !important; color: #737373; }"
								+"a { text-decoration: none !important; font-weight: bolder; color: blue; }"
								+"a:visited { color: #8A2BE2; }"
								+"a:hover { color: orange; }"
							+"</style>";
document.body.outerHTML = loadPage;

//start the links grabbing
$.get(nextPage, documentReady);