

   
document.addEventListener('DOMContentLoaded', () => {
let table = document.getElementById("table-body");
const form=document.getElementById("dog-form")

fetchDog()



function fetchDog(){

    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(dogs => dogs.forEach(function(dog){
        renderDogs(dog)
    })
    )
}


function renderDogs(dog){

 
    table.innerHTML +=`
    <tr id=${dog.id} class="table">
        <td>${dog.name}</td> 
        <td>${dog.breed}</td>
        <td>${dog.sex}</td> 
        <td><button id=${dog.id}>Edit</button></td>
    </tr>
    `

}

document.addEventListener("click",function(e){
    if(e.target.innerText==="Edit"){

        let val=e.target.parentNode.parentNode.firstElementChild
        form.name.value=val.innerText
        form.breed.value=val.nextElementSibling.innerText
        form.sex.value=val.nextElementSibling.nextElementSibling.innerText


        submitDog(e.target)
    }
})


function submitDog(btn){
           

            form.addEventListener("submit", function (e){
                e.preventDefault();
                let id=btn.id

            fetch(`http://localhost:3000/dogs/${id}`,{
                method: "PATCH",
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: form.name.value,
                    breed: form.breed.value,
                    sex: form.sex.value
                })
            })
            .then(resp => resp.json())
            .then(data => {
                // let dog=document.querySelector(`[data-id="${data.id}"]`)
                let dog=document.querySelector(".table")

                dog.innerHTML =`
                <tr data-id=${data.id}>
                <td>${data.name}</td> 
                <td>${data.breed}</td>
                <td>${data.sex}</td> 
                <td><button id=${data.id}>Edit</button></td>
                </tr>
                `
            })


            })  
         
        }

});