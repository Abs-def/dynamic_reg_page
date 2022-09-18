const myForm = document.querySelector('#my-form');
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

let userArr = [];


myForm.addEventListener('submit', onSubmit);


function onSubmit(e){
    e.preventDefault();
    
    if(nameInput.value == '' || emailInput.value == '' || phoneInput.value == ''){
        
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all the fields';

        setTimeout(() => msg.remove(), 3000);
    }else{
      
      // if(localStorage.getItem(id) !== null){
        
      //   removeFromScreen(emailInput.value);
        
      // }
      let userDetails = {
        name : nameInput.value,
        email : emailInput.value,
        phone: phoneInput.value
      };

      //console.log(userDetails);
    
      if (userArr == null) userArr =[];
       userArr.push(userDetails); 
      console.log(userArr);

      localStorage.setItem('allUsers', JSON.stringify(userArr)); 
      axios
        .post("http://localhost:5000/add-user", userDetails)
        .then((res) => {
            console.log('response data: ', res.data);
            displayDetails();
        })
        .catch((err) => console.log(err));

      nameInput.value = '';
      emailInput.value = '';
      phoneInput.value = '';
    }
}



function removeFromScreen(mail){
  let childNodeToBeDeleted = document.getElementById(mail);
  if(childNodeToBeDeleted){
    userList.removeChild(childNodeToBeDeleted);
  }
}

window.addEventListener('DOMContentLoaded', displayDetails);

async function displayDetails(){
    userList.innerHTML = '';
    let temp =await axios.get("https://crudcrud.com/api/0e34e419aa1648a082244bbfdec69df7/appointmentData");
    // userArr = temp;
    console.log('data from crudcrud: ',temp.data);

  
    temp.data ? temp.data.forEach((ele) => {
        const li = document.createElement('li');
        
        li.appendChild(document.createTextNode(`name: ${ele.name}, email: ${ele.email}`));
        li.setAttribute('id', ele._id);

        
        let deleteBtn = document.createElement('button');
        let editBtn = document.createElement('button');

        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.appendChild(document.createTextNode('Edit'));

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        //console.log('element id: ',deleteBtn.parentElement.id);
        deleteBtn.addEventListener('click', () => deleteFunction(deleteBtn.parentElement.id));
        editBtn.addEventListener('click', () => editFunction(editBtn.parentElement.id));
        
        userList.appendChild(li);
    }) : '' ;
    
}

async function editFunction(id){
  // console.log(id);
    let toEditURL = `https://crudcrud.com/api/0e34e419aa1648a082244bbfdec69df7/appointmentData/${id}`;

    let newName;
    let newEmail;
    let res = await axios.get(`${toEditURL}`);
    
    newName = res.data.name;
    newEmail = res.data.email;

    axios.delete(`${toEditURL}`)
        .then(() => {
            displayDetails();
        })
        .catch(err => console.log(err));

}

function deleteFunction(id){
    let toDeleteURL = `https://crudcrud.com/api/0e34e419aa1648a082244bbfdec69df7/appointmentData/${id}`;
    //console.log(toDeleteURL);

    axios.delete(`${toDeleteURL}`)
        .then(() => {
            displayDetails();
        })
        .catch(err => console.log(err));
}
