function likeEvent(button){
    fetch('http://localhost:8000/post/like/', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Token ' + document.querySelector('.user-profile-image').dataset.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({'id': button.dataset.id})
    }).then((response)=>{
        response.json().then((data)=>{
            let likeNumber = document.querySelector('.post-footer-row-like-value');
            if(data.message == 'Removeu o like da postagem!'){
                button.childNodes[1].style.color = '#1DA1F2';
                if(likeNumber){
                    likeNumber.childNodes[0].textContent = eval(likeNumber.childNodes[0].textContent) - 1
                }
            }else{
                if(likeNumber){
                    likeNumber.childNodes[0].textContent = eval(likeNumber.childNodes[0].textContent) + 1
                }
                button.childNodes[1].style.color = 'red';
            }
        })
    })
}

function deleteComment(button){
    let commentNumber = document.querySelector('.post-footer-row-comment-value');
    fetch('http://localhost:8000/post/comment/control/', {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Token ' + document.querySelector('.user-profile-image').dataset.token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({'id': button.dataset.id, 'id_post': button.dataset.post })
    }).then((response)=>{
        response.json().then((data)=>{
            button.parentNode.parentNode.parentNode.parentNode.remove()
            commentNumber.childNodes[0].textContent = eval(commentNumber.childNodes[0].textContent) - 1
        })
    })
}