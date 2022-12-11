async function deleteWarning(button){
  Swal.fire({
    title: 'Você tem certeza ?',
    text: "Você não vai poder reverter isso!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, deletar postagem!',
    cancelButtonText: 'Não!',
  }).then((result) => {
    if (result.isConfirmed) {

      // Deletar postagem por FETCH.
      console.log(document.querySelector('.user-profile-image').dataset.token);
      fetch('https://socialnetwork-production.up.railway.app/post/delete/', {
        method: 'POST',
        headers: new Headers({
          'Authorization': 'Token ' + document.querySelector('.user-profile-image').dataset.token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({'id': button.dataset.id})
      }).then((response)=>{
        if(response.status == 200){
          // Remover a DIV que está englobando o botão.
          Swal.fire(
            'Sucesso!',
            'A postagem foi deletada com sucesso!',
            'success'
          )
          button.parentNode.parentNode.remove();
        }
      })

    }
  })

}