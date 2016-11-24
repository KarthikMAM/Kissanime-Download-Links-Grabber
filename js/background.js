/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 1.1
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
	Purpose             : This script is used to inject the grabber script into the website
							

-----------------------------------------------------------------------------------------------------------*/

//add a listener to inject the grabber script
//whenever the extension button is clicked
chrome.browserAction.onClicked.addListener(
    function (tab) {
        //the include required scripts for running the built script
        chrome.tabs.executeScript({ file: "js/lib/jquery.js" });
        switch (tab.url.split("/")[2].split(".")[0]) {
            case "kissanime":
                //directly get the links from the page
                break;
            case "kissasian":
                chrome.tabs.executeScript({ file: "js/lib/aes.js" });
                chrome.tabs.executeScript({ file: "js/lib/sha256.js" });
                chrome.tabs.executeScript({ file: "js/lib/kissasian-kissenc.js" });
                break;
            case "kisscartoon":
                chrome.tabs.executeScript({ file: "js/lib/aes.js" });
                chrome.tabs.executeScript({ file: "js/lib/sha256.js" });
                chrome.tabs.executeScript({ file: "js/lib/kisscartoon-kissenc.js" });
                break;
            default:
                chrome.tabs.executeScript({ file: "js/nosupport.js" });
                return;
        }

        //run the built script to capture the download links
        if (tab.url.includes("?id=")) {
            chrome.tabs.executeScript({ file: "js/grabber.js" });
        } else {
            chrome.tabs.executeScript({ file: "js/nosupport.js" });
        }
    }
);
