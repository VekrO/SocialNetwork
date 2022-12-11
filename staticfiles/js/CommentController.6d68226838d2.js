const form = document.querySelector('.comment-form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    // Pegar os dados digitados no campo description.
    let description = document.querySelector('textarea[name=description]');

    if(description.value.replace(/\s/g, '').length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você digitar algo no campo marcado!',
          })
        description.style.border = '1px solid red';
    }else{

        if(description.style.border == '1px solid red'){
            description.style.border = '1px solid green';
        }

        // Fazer requisição para criar o comentário!
        
        let id = document.querySelector('input[name=post_id]').value; // ID da postagem.
        let user_token = document.querySelector('.user-profile-image').dataset.token;
        
        fetch('https://socialnetwork-production.up.railway.app/post/comment/control/', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Token ' + user_token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({'id': id, 'description': description.value})
        }).then((response)=>{
            response.json().then((data)=>{
                if(data.message == 'Comentário realizado com sucesso!'){
                    window.location.reload();
                }
            })
        })

    }

})