let email = document.querySelector('input[name=email]');
let nome = document.querySelector('input[name=name]');
let username = document.querySelector('input[name=username]');
let password = document.querySelector('input[name=password]');

let formRegister = document.querySelector('.form-register');

let emailValidator = false;
let nomeValidator = false;
let usernameValidator = false;
let passwordValidator = false;

// Parar o evento do formulário.
formRegister.addEventListener('submit', (e)=>{
    
    e.preventDefault();

    if(emailValidator == true && nomeValidator == true && usernameValidator == true && passwordValidator == true){
        formRegister.submit();
    }else{
        [email, nome, username, password].forEach((input)=>{
            if(input.value.length == 0){
                input.style.border = '1px solid red';
                document.querySelector(`.${input.name}-error`).style.display = 'block';
                document.querySelector(`.${input.name}-error`).textContent = 'Preencha o campo corretamente!';
            }
        });
    }

})

email.addEventListener('input', ()=>{

    if(validateEmail(email.value)){
        document.querySelector('.email-error').style.display = 'none';
        email.style.border = '1px solid green';
        emailValidator = true;
    }else{
        document.querySelector('.email-error').style.display = 'block';
        document.querySelector('.email-error').textContent = 'O e-mail digitado não é válido ou não é permitido!';
        email.style.border = '1px solid red';
        emailValidator = false;
    }

    if(email.value.length == 0){
        document.querySelector('.email-error').style.display = 'block';
        document.querySelector('.email-error').textContent = 'Preencha o campo de e-mail!';
        email.style.border = '1px solid red';
        emailValidator = false;
    }

});

nome.addEventListener('input', ()=>{

    
    if(nome.value.length == 0){
        nome.style.border = '1px solid red';
        document.querySelector('.name-error').style.display = 'block';
        document.querySelector('.name-error').textContent = 'Nome inválido!';
        nomeValidator = false;
    }else{
        nome.style.border = '1px solid green';
        document.querySelector('.name-error').style.display = 'none';
        nomeValidator = true;
    }
});

username.addEventListener('input', ()=>{

    if(username.value.length == 0){
        username.style.border = '1px solid red';
        document.querySelector('.username-error').style.display = 'block';
        document.querySelector('.username-error').textContent = 'Nome de usuário inválido!';
        usernameValidator = false;
    }else{
        username.style.border = '1px solid green';
        document.querySelector('.username-error').style.display = 'none';
        usernameValidator = true;
    }   

    let usernameInnerValidator = [];
    if(username.value.length >= 1){

        if(username.value.match(/[^a-zA-Z0-9. ]/g)){
            username.style.border = '1px solid red';
            document.querySelector('.username-error').style.display = 'block';
            document.querySelector('.username-error').textContent = 'O nome de usuário não pode incluir caracteres especiais!';
            usernameValidator = false;
        }else{
            username.style.border = '1px solid green';
            document.querySelector('.username-error').style.display = 'none';
            usernameInnerValidator.push(1)
        }

        if(username.value[0].match(/[0-9]/i)){
            username.style.border = '1px solid red';
            username.setAttribute('maxlength', 1);
            document.querySelector('.username-error').style.display = 'block';
            document.querySelector('.username-error').textContent = 'O primeiro caractere não pode ser um número!';
            usernameValidator = false;
        }else if(username.value[0] == username.value.match(/[^a-zA-Z0-9. ]/g)){
            username.style.border = '1px solid red';
            username.setAttribute('maxlength', 1);
            document.querySelector('.username-error').style.display = 'block';
            document.querySelector('.username-error').textContent = 'O primeiro caractere não pode ser especial!';
            usernameValidator = false;
        }else{
            usernameInnerValidator.push(3)
            username.setAttribute('maxlength', 255);
        }

        if(usernameInnerValidator.length == 3){
            usernameValidator = true;
        }

    }else{
        usernameValidator = false;
    }

});

password.addEventListener('input', ()=>{
    if(password.value.length < 8){
        password.style.border = '1px solid red';
        document.querySelector('.password-error').style.display = 'block';
        document.querySelector('.password-error').textContent = 'A senha deve conter 8 caracteres.'
        passwordValidator = false;
    }else{
        password.style.border = '1px solid green';
        document.querySelector('.password-error').style.display = 'none';
        passwordValidator = true;
    }
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}