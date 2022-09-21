const myForm = document.querySelector('#my-form');
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let phoneInput = document.querySelector('#phone');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

async function onSubmit(e){
    e.preventDefault();
    
    if(nameInput.value == '' || emailInput.value == '' || phoneInput.value == ''){
        
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all the fields';

        setTimeout(() => msg.remove(), 3000);
    }else{
      try {
        let userDetails = {
          name : nameInput.value,
          email : emailInput.value,
          phone: phoneInput.value
        };
  
        //console.log(userDetails);
        await axios.post("http://localhost:5000/add-user", userDetails);
        
        displayDetails();
  
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
      } catch (error) {
        console.log(error);
      }
    }
}

window.addEventListener('DOMContentLoaded', displayDetails);

async function displayDetails(){
  try {
    userList.innerHTML = '';
    let temp =await axios.get("http://localhost:5000/get-users");
    // userArr = temp;
    console.log('data from backend: ',temp.data);

    temp.data.forEach((ele) => {
      const li = document.createElement('li');
      
      li.appendChild(document.createTextNode(`name: ${ele.name}, email: ${ele.email}, phone: ${ele.phone}`));
      li.setAttribute('id', ele.id);

      
      let deleteBtn = document.createElement('button');
      let editBtn = document.createElement('button');

      deleteBtn.appendChild(document.createTextNode('Delete'));
      editBtn.appendChild(document.createTextNode('Edit'));

      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      //console.log('element id: ',deleteBtn.parentElement.id);
      deleteBtn.addEventListener('click', () => {
        deleteFunction(deleteBtn.parentElement.id);
      });
      editBtn.addEventListener('click', () => {
        editFunction(editBtn.parentElement.id)
      });
      
      userList.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }    
}

async function editFunction(id){
   console.log(id);
    let toEditURL = `http://localhost:5000/edit-user/${id}`;

    let res = await axios.get(`${toEditURL}`);

    console.log(res);
    
    let newName = res.data.name;
    let newEmail = res.data.email;
    let newPhone = res.data.phone;

    displayDetails();

    nameInput.value = newName;
    emailInput.value = newEmail;
    phoneInput.value = newPhone;
}

async function deleteFunction(id){
    let toDeleteURL = `http://localhost:5000/delete-user/${id}`;
    //console.log(toDeleteURL);

    let res = await axios.get(`${toDeleteURL}`);
    console.log('deleted user: ', res.data);

    await displayDetails();
}
