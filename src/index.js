dogURL = "http://localhost:3000/dogs";
const tableId = document.querySelector("#table-body");
let form = document.getElementById("dog-form");

function getDogs() {
	return fetch(dogURL)
		.then((response) => response.json())
		.then((dogs) => {
			dogs.forEach(function (dog) {
				let tr = document.createElement("tr");
				tr.className = "dog-row";
				tr.dataset.dogId = dog.id;
				tr.innerHTML = `
                <td id="name">${dog.name}</td> 
                <td id="breed">${dog.breed}</td> 
                <td id="sex">${dog.sex}</td>
                <td><button data-id=${dog.id} class="dog-button">Edit</button></td>
             `;

				tableId.appendChild(tr);
			});
		});
}

tableId.addEventListener("click", (event) => {
	if (event.target.className === "dog-button") {
		let dog = event.target.closest("tr");
		let name = dog.querySelector("#name");
		let breed = dog.querySelector("#breed");
		let sex = dog.querySelector("#sex");
		let id = event.target.dataset.id;

		form.name.value = name.innerHTML;
		form.breed.value = breed.innerHTML;
		form.sex.value = sex.innerHTML;
		form.name.id = id;
	}
});

form.addEventListener("submit", (event) => {
	event.preventDefault();
	let dogObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({
			name: form.name.value,
			breed: form.breed.value,
			sex: form.sex.value,
		}),
	};
	fetch(dogURL + `/${form.name.id}`, dogObj)
		.then((response) => response.json())
		.then((data) => {
			let id = document.querySelector(`[data-dog-id = "${data.id}"]`);
			let name = id.querySelector("#name");
			let breed = id.querySelector("#breed");
			let sex = id.querySelector("#sex");

			name.innerHTML = data.name;
			breed.innerHTML = data.breed;
			sex.innerHTML = data.sex;
		});
});

getDogs();
