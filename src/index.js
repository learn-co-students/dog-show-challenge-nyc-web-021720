

   
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
    <tr data-id=${dog.id}>
        <td>${dog.name}</td> 
        <td>${dog.breed}</td>
        <td>${dog.sex}</td> 
        <td><button id=${dog.id}>Edit</button></td>
    </tr>
    `

}

document.addEventListener("click",function(e){
    if(e.target.innerText==="Edit"){

        form.name.value=e.target.parentNode.parentNode.firstElementChild.innerText
        form.breed.value=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.innerText
        form.sex.value=e.target.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText


        submitDog(e.target)
    }
})


function submitDog(btn){
            let id=btn.id
            // const name=btn.parentNode.parentNode.firstElementChild.innerText
            // const breed=btn.parentNode.parentNode.firstElementChild.nextElementSibling.innerText
            // const sex=btn.parentNode.parentNode.firstElementChild.nextElementSibling.nextElementSibling.innerText
            // console.dir(sex)
            
            

            form.addEventListener("submit", function (e){
                e.preventDefault();
            // form.name= name
            // form.breed=breed
            // form.sex=sex


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
                let dog=document.querySelector(`[data-id="${data.id}"]`)

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