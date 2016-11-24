/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 1.0
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
	Purpose             : This script is used to inject the grabber script into the website
							

-----------------------------------------------------------------------------------------------------------*/

//Add a listener to inject the grabber script
//whenever the extension button is clicked
chrome.browserAction.onClicked.addListener(
    function(tab) {
        //The include required scripts for running the built script
        chrome.tabs.executeScript({ file: "Scripts/jquery.js" });
        switch(tab.url.split("/")[2].split(".")[0]) {
            case "kissanime":
                chrome.tabs.executeScript({ file: "Scripts/kissanime-asp.js" });
                break;
            case "kisscartoon":
                chrome.tabs.executeScript({ file: "Scripts/kisscartoon-asp.js" });
                break;
            case "kissasian":
                chrome.tabs.executeScript({ file: "Scripts/kissasian-asp.js" });
                break;   
            default:
                chrome.tabs.executeScript({ file: "Scripts/nosupport.js" });
                return;
        }
        
        //Run the built script to capture the download links
        if (tab.url.includes("?id=")) {
            chrome.tabs.executeScript({ file: "Scripts/grabber.js" });
        } else {
            chrome.tabs.executeScript({ file: "Scripts/nosupport.js" });
        }
    }
);