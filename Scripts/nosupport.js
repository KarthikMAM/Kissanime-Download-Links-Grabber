/*-----------------------------------------------------------------------------------------------------------

	Author				: Karthik M A M
	Version				: 0.1
	Websites Supported	: 1. http://www.kissanime.com
						  2. http://www.kisscartoon.me
						  3. http://www.kissasian.com
	Purpose             : This is used to display the error page.
							

-----------------------------------------------------------------------------------------------------------*/

//Set the error message depending on the page in the active tab
var errorMsg;
var errorPage = document.location.href;
if (errorPage.includes("kissanime") || errorPage.includes("kissasian") || errorPage.includes("kisscartoon")) {
    errorMsg =  "<div style='margin-left:50px'>"
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

//Set the error page using the error message
var loadPage =  "<body style='background-color:whitesmoke'>"
                    +"<div style='margin-top:150px'>"
                        +"<center>"
                            +"<img style='margin-top:200px' src='http://i2.wp.com/smallenvelop.com/wp-content/uploads/2014/08/Preloader_3.gif?resize=64%2C64'>"
                            +"<div style='font-family: Arial, Helvetica, sans-serif; color: #737373; text-align: left; width: 500px;'>"
                                +errorMsg
                            +"</div>"
                        +"</center>"
                    +"</div>"
                +"</body";
document.head.innerHTML = "";
document.body.outerHTML = loadPage;

//Refresh the page after 7 seconds
setTimeout(function(){
    window.location.reload();
}, 7000);