/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 2.2
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
						  
	How to use?			: 1. Go to the episode ith page
						  2. Press F12 and to open the Browser's console
						  3. Copy this script and press enter
						  4. Wait till all the results page appears
	References			: 1. "https://kissanime.to/Scripts/asp.js" for getting video links
							

-----------------------------------------------------------------------------------------------------------*/

//Domain identifier
var IS_KISSANIME = document.location.href.includes("kissanime");
var IS_KISSASIAN = document.location.href.includes("kissasian");
var IS_KISSCARTN = document.location.href.includes("kisscartoon"); 

//Global Selectors
var TITLE_SELECTOR = "#navsubbar > p > a";
var DWN_SCRIPT_SEL = IS_KISSANIME ? "#divDownload > a:nth-child(1)" : "#divDownload script";
var NEXT_BUTTON_ID = "#btnNext";
var MESSAGE_SELECT = "grabberProgress";

//Stop the script if the script is already running
if (document.getElementById(MESSAGE_SELECT) != null) {
    window.alert("Script is already running");
    throw new Error("Error: Script is already running");
}

//Select the quality
if(IS_KISSANIME) {
    var videoQuality = prompt("Enter the file quality.. (1 is max quality)");
    DWN_SCRIPT_SEL = DWN_SCRIPT_SEL.replace("1", videoQuality);
} else {
    var videoQuality = parseInt(prompt("Enter the file quality.. (0 is max quality)"));
}


//Global variables
var episodeLinks = [];
var isComplete = false;
var nextPage = document.location.href;
var episodeTitle = nextPage
						.split("/")[4]
						.split("-")
						.join(" ") + " Episode -";
                        
                        
function documentReady(data) {
	
	//Get the document of the from the downloaded data
	var tempDoc = document.createElement("html");
	tempDoc.innerHTML = data;

	if (!isComplete) {
		//Get the episode number and log the progress
        //Update the progress page
		var episodeId = nextPage
							.split("/")[5]
							.split("?")[0]
							.split("-")[1];
        console.log("Current Episode : " + episodeId);
        document.getElementById(MESSAGE_SELECT).innerHTML = "Grabbed " + episodeLinks.length + " Episodes... ( <b>Current Episode : " + episodeId + "</b> )";
		
		//Get the download links and select the quality
        //Push it to the download links list
        try {
            var episodeLink = document.createElement("li");
            if (IS_KISSANIME) {
                episodeLink.innerHTML = tempDoc.querySelector(DWN_SCRIPT_SEL).outerHTML;
                episodeLink.getElementsByTagName("a")[0].innerHTML = episodeTitle.replace("-", episodeId);   
            } else {
                episodeLink.innerHTML = asp.wrap(tempDoc
                                                    .querySelector(DWN_SCRIPT_SEL)
                                                    .innerHTML
                                                    .split('"')[1]);
                episodeLink.getElementsByTagName("a")[videoQuality].innerHTML = episodeTitle.replace("-", episodeId);
                episodeLink.innerHTML = episodeLink.getElementsByTagName("a")[videoQuality].outerHTML;
            }
            episodeLinks.push(episodeLink);
        } catch (error) {
            document.getElementById(MESSAGE_SELECT).innerHTML = "Sorry, but you have selected a file that is not avilable ☹";
            setTimeout(function() { document.location.reload(); }, 5000);
            return;
        }
		
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
        //Have a timeout to prevent the website from discovering you as a script
		setTimeout( function() { $.get(nextPage, documentReady); }, 1200);
	} else {
		//Create a new HTML document for displaying the results
		writeDoc(episodeLinks, tempDoc);
	}
};

function writeDoc(episodeList, tempDoc) {
    
	//Document Printer's Selectors
	var COMMENTS_DIV = "#leftside > div:nth-child(" + (IS_KISSASIAN ? "6" : "7") + ")";
	var EPISODE_LIST = "#leftside > div:nth-child(" + (IS_KISSASIAN ? "2" : "4") + ") > div.barContent.episodeList";
	var RIT_ADS_DIVS = "#rightside > div:nth-child(5)";
	var LFT_ADS_DIVS = "#leftside > center";
	
	//Create a new container to hold the new list of episodes
	var divEpisodes = document.createElement("div");
	var episodeHTML = "<ul><h3>";
	for (var i in episodeList) {
		episodeHTML += episodeList[i].outerHTML;
	}
	episodeHTML += "</h3></ul>";
	divEpisodes.innerHTML = "<div class='arrow-general'>&nbsp;</div>" + episodeHTML;
	
	//Remove the unwanted contents and add the required contents
	try {
		tempDoc.querySelector(COMMENTS_DIV).outerHTML = "";
		tempDoc.querySelector(EPISODE_LIST).innerHTML = divEpisodes.outerHTML;
		tempDoc.querySelector(LFT_ADS_DIVS).outerHTML = "";
		tempDoc.querySelector(RIT_ADS_DIVS).outerHTML = "";   
    } catch (error) {
        console.log(error);
    }	
	
	//Create the html document using the original document as a template
	var docHTML = "<html>"
					+tempDoc.getElementsByTagName("head")[0].outerHTML
					+"<body>"
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
    
    //Make all the links open in a new tab
    var links = document.getElementsByTagName("a");
    for ( var i in links ) {
        links[i].target = "_blank";
    }
}

//Add a loading animation page to indicate the progress
var loadPage =  "<body style='background-color:whitesmoke'>"
                    +"<div style='margin-top:150px'>"
                        +"<center>"
                            +"<img style='margin-top:200px' src='http://i2.wp.com/smallenvelop.com/wp-content/uploads/2014/08/Preloader_3.gif?resize=64%2C64'>"
                            +"<p id='grabberProgress' style='font-family:Arial, Helvetica, sans-serif; color: #737373'>Grabbing Episodes. . .</p>"
                        +"</center>"
                    +"</div>"
                +"</body";
document.head.innerHTML = "<title> KissAnime | KissCartoon | KissAsian Download Links Grabber </title>";
document.body.outerHTML = loadPage;

//Start the links grabbing
$.get(nextPage, documentReady);