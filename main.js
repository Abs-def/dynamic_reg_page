        
        const myForm = document.querySelector('#my-form');
        let nameInput = document.querySelector('#name');
        let emailInput = document.querySelector('#email');
        const msg = document.querySelector('.msg');
        const userList = document.querySelector('#users');

        // let userArr = [];
        

        myForm.addEventListener('submit', onSubmit);

        
        function onSubmit(e){
            e.preventDefault();
            
            if(nameInput.value == '' || emailInput.value == ''){
                
                msg.classList.add('error');
                msg.innerHTML = 'Please enter all the fields';

                setTimeout(() => msg.remove(), 3000);
            }else{
              
              // if(localStorage.getItem(id) !== null){
                
              //   removeFromScreen(emailInput.value);
                
              // }
              
              
              let userDetails = {
                name : nameInput.value,
                email : emailInput.value
              };

              //console.log(userDetails);
           
            //   if (userArr == null) userArr =[];
            //    userArr.push(userDetails); 
              //console.log(userArr);

              //localStorage.setItem('allUsers', JSON.stringify(userArr)); 
              axios
                .post("https://crudcrud.com/api/13ab0dd4e1214effb26a92c6b77989c9/appointmentData", userDetails)
                .then((res) => {
                    console.log('response data: ', res.data);
                    displayDetails();
                })
                .catch((err) => console.log(err));

              nameInput.value = '';
              emailInput.value = '';
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
            let temp =await axios.get("https://crudcrud.com/api/13ab0dd4e1214effb26a92c6b77989c9/appointmentData");
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

                
                // deleteBtn.addEventListener('click', () => deleteFunction(element.id));
                // editBtn.addEventListener('click', () => editFunction(element.id));

                
                userList.appendChild(li);
            }) : '' ;
            
        }

        function editFunction(id){
          // console.log(id);
          let toEdit = userArr.filter(element => element.id == id);
          //console.log(toEdit);
          
          let newName = toEdit[0].name;
          let newEmail = toEdit[0].email;

          // console.log(newName);
          // console.log(newEmail);
          // console.log(userArr);
          let newArr = userArr.filter(element => element.id != id);
          //console.log(newArr);
          localStorage.setItem('allUsers', JSON.stringify(newArr));
          displayDetails();
          nameInput.value = newName;
          emailInput.value = newEmail;
        }

        function deleteFunction(id){
          //console.log(id);
          let newArr = userArr.filter(element => element.id != id);
          //console.log(newArr);
          localStorage.setItem('allUsers', JSON.stringify(newArr));
          displayDetails();
        }