var redirect_game_html_file = "quiz.html";

var current_user = null;

function load_score(){
	// send a request to the server to get the score
	score = get_score(current_user);
	return score;
}

function display_score(new_score){
	let score_text = document.getElementById("score_text");
	score_text.innerHTML = score.toString();
}

window.onload = () => {
	const retry_button = document.getElementById("submit_but");
	retry_button.addEventListener('click', () => {
		add_username(current_user);
		let old_location = window.location.href;
		let location_base = old_location.split("/").slice(0,-1);
		let new_location = location_base.join("/") + "/" + redirect_game_html_file; 
		window.location.href = new_location;
	});
	current_user = localStorage.getItem('current_username');
	let score = load_score();
	display_score(score);
};