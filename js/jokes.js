document.querySelector('.get-jokes').addEventListener('click', getJokes);
function getJokes(e){
	var number = document.querySelector('input[type="number"').value;
	if(number === ''){
		alert("Please Enter a Valid Number!");
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET' , `http://api.icndb.com/jokes/random/${number}`, true);
	xhr.onload = function() {
		if(this.status === 200){
			const response = JSON.parse(this.responseText);
			let output = '';
			if(response.type === 'success'){
				response.value.forEach(function(joke){
					output += `<li>${joke.joke}</li>`;
				});
			}
			else{
				output += '<li>Something went wrong!';
			}
			console.log(response);
			document.querySelector('.jokes').innerHTML = output;
		}
	}
	xhr.send();

	e.preventDefault();
}