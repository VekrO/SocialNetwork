let email = document.querySelector('input[name=email]');
let password = document.querySelector('input[name=password]');

let formLogin = document.querySelector('.form-login');
let validatorArray = [];

formLogin.addEventListener('submit', (e)=>{
    
    e.preventDefault();

    if(validatorArray.length >= 2){
        formLogin.submit();
    }

});

email.addEventListener('input', ()=>{

    if(email.value.length == 0){
        email.style.border = '1px solid red';
        document.querySelector(`.email-error`).style.display = 'block';
        document.querySelector(`.email-error`).textContent = 'Preencha o campo corretamente!';
    }else{
        email.style.border = '1px solid green';
        document.querySelector(`.email-error`).style.display = 'none';
        validatorArray.push(1);
    }

});

password.addEventListener('input', ()=>{

    if(password.value.length == 0){
        password.style.border = '1px solid red';
        document.querySelector(`.password-error`).style.display = 'block';
        document.querySelector(`.password-error`).textContent = 'Preencha o campo corretamente!';
    }else{
        password.style.border = '1px solid green';
        document.querySelector(`.password-error`).style.display = 'none';
        validatorArray.push(2);
    }

})
