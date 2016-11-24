/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 0.2
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
	Purpose             : This is used to display the error page.
							

-----------------------------------------------------------------------------------------------------------*/

//set the error message depending on the page in the active tab
var errorMsg;
var errorPage = document.location.href;
if (errorPage.includes("kissanime") || errorPage.includes("kissasian") || errorPage.includes("kisscartoon")) {
    errorMsg =  "<div>"
					+"<h3>Please, Follow these instructions ✌</h3>"
					+"<ul>"
						+"<li>Refresh this page"
						+"<li>Go to the episode stream page"
						+"<li>Click the grabber icon again"
					+"<ul>"
				+"<div>";
} else if (errorPage.includes("?id=") == false) {
	errorMsg = "<center><h3>Sorry, but this site is not supported. ☹</h3></center>";
}

//set the error page using the error message
var loadPage =  "<body style='background-color:whitesmoke'>"
					+"Developed by <span><a href='https://github.com/KarthikMAM'>Karthik M A M</a></span>"
					+"<center>"
						+"<div style='margin-top:150px; display: table;'>"
							+"<img style='margin-top:200px' src='" + chrome.extension.getURL("img/preloader.gif") + "'>"
							+"<div align='left'>"
								+errorMsg
							+"</div>"
						+"</div>"
					+"</center>"
				+"</body";
document.head.innerHTML = "<title> KissAnime | KissCartoon | KissAsian Download Links Grabber </title>"
							+"<style>"
								+"* { font-family:Arial, Helvetica, sans-serif !important; color: #737373; }"
								+"a { text-decoration: none !important; font-weight: bolder; color: blue; }"
								+"a:visited { color: #8A2BE2; }"
								+"a:hover { color: orange; }"
							+"</style>";
document.body.outerHTML = loadPage;

//refresh the page after 7 seconds
setTimeout(function(){
    window.location.reload();
}, 7000);