let btnFollow = document.querySelector('.btn-follow');
let btnUnfollow = document.querySelector('.btn-unfollow');

if(btnFollow){
    btnFollow.addEventListener('click', ()=>{
        let token = btnFollow.dataset.token;
        let username = btnFollow.dataset.username;
    
        if(token && username){
            follow(token, username)
        }
    })
}

if(btnUnfollow){
    btnUnfollow.addEventListener('click', ()=>{
        let token = btnUnfollow.dataset.token;
        let username = btnUnfollow.dataset.username;
    
        if(token && username){
            unfullow(token, username)
        }
    })
}

// Função para seguir.
async function follow(token, username){

    fetch(`https://socialnetwork-production.up.railway.app/user/follow/${username}/`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Token ${token}`
        })
    }).then((response)=>{
        if(response.status == 200){
            // Trocar o botão no front-end.
            window.location.reload();

        }
    })

}

// Função para deixar de seguir.
async function unfullow(token, username){

    fetch(`https://socialnetwork-production.up.railway.app/user/unfollow/${username}/`, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Token ${token}`
        })
    }).then((response)=>{
        if(response.status == 200){
            // Trocar o botão no front-end.
            window.location.reload();
        }
    })

}