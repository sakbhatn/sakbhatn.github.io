var isFormValid;

function validateForm() {
	var myName = document.getElementById('username')
	var myEmail = document.getElementById("email");
	var myPasswd = document.getElementById("password");
	var myDob = document.getElementById("dob");
	var myMobile = document.getElementById("mobile");
		
	// Clear existing errors if any before evaluating
	clearErrors();
	
	verifyName(myName);
	verifyEmail(myEmail);
	verifyPassword(myPasswd);
	verifyMobile(myMobile);
	verifyDOB(myDob);
	
	// Save to local storage if form is valid
	if(isFormValid) {
		var userObject = {'name': myName.value, 'mobile': myMobile.value, 'password': myPasswd.value, 'dob': myDob.value};
		var myValue = JSON.stringify(userObject);
		localStorage.setItem(myEmail.value, myValue);
		document.getElementById('formsuccess').className = "bg-success";
		document.getElementById('myForm').reset();
	}

	return false;
}

function verifyName(myName) {
	if (!myName.value) {
		displayError(myName, "Name cannot be blank");
	}
}

function verifyEmail(myEmail) {
	var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

	if (!myEmail.value ) {
		displayError(myEmail, "Email cannot be blank");
	}
	else if (!emailPattern.test(myEmail.value)) {
		displayError(myEmail, "Please enter a valid email");
	} 
	else if (localStorage.getItem(myEmail.value)) {
		displayError(myEmail, "Email already exists");
	}
}

function verifyPassword(myPasswd) {
	if (!myPasswd.value) {
		displayError(myPasswd, "Password cannot be blank");
	}
	else if (myPasswd.value.length < 8) {
		displayError(myPasswd, "Password must have at least 8 characters");
	}
}

function verifyMobile(myMobile) {
	var mobilePattern = /^[1-9][0-9]{9}$/;
	if (!myMobile.value) {
		displayError(myMobile, "Mobile no cannot be blank");
	}
	else if (!mobilePattern.test(myMobile.value)) {
		displayError(myMobile, "Mobile no must be 10 digits & cannot start with 0");
	}
}

function verifyDOB(myDob) {
	var currDate = new Date();
	if (!myDob.value) {
		displayError(myDob, "Date of birth cannot be blank");
	}
	else if (Date.parse(myDob.value) > Date.parse(currDate)) {
		displayError(myDob, "Invalid date");
	}
}

function displayError(node, message) {
	isFormValid = false;
	var myError = document.createElement("span");
	myError.setAttribute("class","help-block");
	myError.innerHTML = message;
	node.parentNode.insertBefore(myError,node.nextSibling);
	node.parentNode.className += " has-error";
}

function clearErrors() {
	isFormValid = true;
	var span = document.getElementsByClassName("help-block");
	for(i=0;i<span.length;i++) {
		span[i].innerHTML = "";
	}
	var span = document.getElementsByClassName("form-group");
	for(i=0;i<span.length-1;i++) {
		span[i].className = "form-group";
	}
}