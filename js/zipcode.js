document.querySelector('#zipform').addEventListener('submit', getLocation);
document.querySelector('body').addEventListener('click', deleteLocation);
function getLocation(e){
	const zipcode = document.querySelector('.zip').value;
	var xhr = new XMLHttpRequest();
	xhr.open("GET" , `http://api.zippopotam.us/PK/${zipcode}`, true);
	xhr.onload = function(response){
		if(this.status != 200){
			showIcon('remove');
			document.querySelector('#output').innerHTML = `
			<article class = "message is-danger">
			<div class = "message-body">Invalid Zipcode Please try again!</div>
			</article>
			`;
		}
		else{
			showIcon('check');
			response = JSON.parse(this.responseText);
			var output = '';
			response.places.forEach(place => {
				output += `
				 <article class = "message is-primary">
				 <div class = "message-header">
				 <p>Location Info</p>
				 <button class = "delete" aria-label = "delete"></button>
				 </div>
				 <div class = "message-body">
				 <ul>
				 <li><strong>Place Name :</strong> ${place['place name']} </li>
				 <li><strong>Longitude :</strong> ${place['longitude']} </li>
				 <li><strong>Latitude :</strong> ${place['latitude']} </li>
				 <li><strong>Pstal Code :</strong> ${zipcode} </li>
				 </ul>
				 </div>
				 </article>
				`;
			});
			document.querySelector('#output').innerHTML = output;
			//console.log(response);
		}
	}
	xhr.send();
	e.preventDefault();
}

function showIcon(icon){
	document.querySelector('.icon-remove').style.display = "none";
	document.querySelector('.icon-check').style.display = "none";
	//show icon
	document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

function deleteLocation(e){
	if(e.target.className == 'delete'){
		document.querySelector('.message').remove();
		document.querySelector('.zip').value = '';
		document.querySelector('.icon-check').remove();
	}
}