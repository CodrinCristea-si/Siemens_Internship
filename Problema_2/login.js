//import * from "server.js"

var redirect_game_html_file = "quiz.html";

function validate_username(username){
	if (!username || username.length == 0){
		return -1;
	}
	return 0;
}

function start_new_game(){
	let username_input = document.getElementById("username");
	let username = username_input.value;

	if(validate_username(username) == 0){
		// send user to server
		add_username(username);
		//window.current_username = username;
		localStorage.setItem('current_username', username);
		//console.log(window.current_username)
		//redirect
		let old_location = window.location.href;
		let location_base = old_location.split("/").slice(0,-1);
		let new_location = location_base.join("/") + "/" + redirect_game_html_file; 
		window.location.href = new_location;
	}
	else{
		alert("Username is invalid!");
	}
}

window.onload = () => {
	const start_game_button = document.getElementById("submit_but");
	start_game_button.addEventListener('click', () => {
		start_new_game();
	});
};