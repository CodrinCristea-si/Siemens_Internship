var redirect_score_html_file = "score.html";

var answer_selected = null;
var current_index_question = 0;
var max_number_question = get_maximum_nr_questions_session();

var current_question = null;
var displayed_answers = {}

var current_user = null;

function load_next_question(){
	//assume a request to the server is made with the username
	// let answers = [
	// 	new Answer(1,"A dormit ca ultimul taran, la fel ca si tatal lui."),
	// 	new Answer(2,"A scos sabia din teaca si s-a spanzurat cu furtunul de la dus."),
	// 	new Answer(3,"Si-a pus pantalonii de baiat mare. Si-a scos calul de la naftalina. S-a dus sa ii infrunte pe turci. S-a impiedicat de scari si a murit"),
	// 	new Answer(4,"Dracu stie, esti degeaba aici, ar trebui sa fii cu oile si nu pe acest site.")
	// 	]
	// let question = new Question(1, "Stefan cel Mare a fost un mare boier care dormea bine la castel pana au venit turcii peste el. Ce a facut el atunci?", "ISTORIE", answers, 4);
	let question = send_next_question(current_user);
	return question;
}

function display_question(question){
	displayed_answers = {}
	current_question = question;
	answer_selected = null;

	let domain_text = document.getElementById("question_domain");
	domain_text.innerHTML = question.domain.toUpperCase() + ":";

	let question_text = document.getElementById("question_text");
	question_text.innerHTML = question.text;

	let question_number = document.getElementById("question_number_value");
	question_number.innerHTML = current_index_question.toString() + "/" + max_number_question.toString();

	let answer_1_text = document.getElementById("answer1");
	answer_1_text.value = question.get_answer(1).text;
	displayed_answers[1] = question.get_answer(1).id;

	let answer_2_text = document.getElementById("answer2");
	answer_2_text.value = question.get_answer(2).text;
	displayed_answers[2] = question.get_answer(2).id;

	let answer_3_text = document.getElementById("answer3");
	answer_3_text.value = question.get_answer(3).text;
	displayed_answers[3] = question.get_answer(3).id;

	let answer_4_text = document.getElementById("answer4");
	answer_4_text.value = question.get_answer(4).text;
	displayed_answers[4] = question.get_answer(4).id;
}

function select_answer(answer_number){
	answer_selected = answer_number;
}

function submit_answer(){
	if(!answer_selected){
		alert("Pick an answer!");
		return;
	}
	//send answer
	check_question(current_user,displayed_answers[answer_selected])
	//temporary 
	// if(displayed_answers[answer_selected] != current_question.corect_answer_id){
	// 	//console.log("fail");
	// }
	// else{
	// 	//console.log("correct");
	// }

	if (current_index_question < max_number_question){
		let question = load_next_question();
		current_index_question += 1;
		display_question(question);
	}
	else{
		// alert("End of game");
		let old_location = window.location.href;
		let location_base = old_location.split("/").slice(0,-1);
		let new_location = location_base.join("/") + "/" + redirect_score_html_file; 
		window.location.href = new_location;
	}
}

window.onload = () => {
	let answer_but_1 = document.getElementById("answer1");
	answer_but_1.addEventListener('click', () => {
		// console.log('Button 1 clicked!');
		select_answer(1);
	});

	let answer_but_2 = document.getElementById("answer2");
	answer_but_2.addEventListener('click', () => {
		// console.log('Button 2 clicked!');
		select_answer(2);
	});

	let answer_but_3 = document.getElementById("answer3");
	answer_but_3.addEventListener('click', () => {
		// console.log('Button 3 clicked!');
		select_answer(3);
	});

	let answer_but_4 = document.getElementById("answer4");
	answer_but_4.addEventListener('click', () => {
		// console.log('Button 4 clicked!');
		select_answer(4);
	});

	let submit_but = document.getElementById("submit_but");
	submit_but.addEventListener('click', () => {
		// console.log('Button submit clicked!');
		submit_answer();
	});
		
	current_user = localStorage.getItem('current_username');
	console.log(current_user);
	let question = load_next_question();
	current_index_question += 1;
	display_question(question);
}