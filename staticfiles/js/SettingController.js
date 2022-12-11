async function changeName() {
  const { value: formValues } = await Swal.fire({
    title: "Alteração de nome",
    html: '<input id="nameInput" class="swal2-input" placeholder="Digite o novo nome">',
    focusConfirm: false,
    showDenyButton: true,
    denyButtonText: 'Cancelar',
    preConfirm: () => {
      return [document.getElementById("nameInput").value];
    },
  });

  if (formValues[0].length != 0) {
    Swal.fire({
      title: "Você tem certeza das mudanças ?",
      showDenyButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        // Realizar as alterações com o fetch.
        fetch('http://localhost:8000/user/settings/', {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': 'Token ' + document.querySelector('.user-profile-image').dataset.token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                'name': formValues[0]
            })
        }).then((response)=>{
            response.json().then((data)=>{
                Swal.fire("Atualizado!", "", "success");
                console.log(data);
            })
        }).catch((err)=>{
            console.log(err);
        })

      } else if (result.isDenied) {
        Swal.fire("Você não realizou as alterações", "", "warning");
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Você precisa digitar algo!",
    });
  }
}

// Função para trocar a senha.
async function changePassword() {
    const { value: formValues } = await Swal.fire({
      title: "Alteração de senha",
      html: `
        <input id="oldPassword" class="swal2-input" type="password" placeholder="Senha atual">
        <input id="newPassword" class="swal2-input" type="password" placeholder="Nova senha">
      `,
      focusConfirm: false,
      showDenyButton: true,
      denyButtonText: 'Cancelar',
      preConfirm: () => {
        return [
            document.getElementById("oldPassword").value,
            document.getElementById("newPassword").value
        ];
      },
    });
  
    if (formValues[0].length != 0) {
      Swal.fire({
        title: "Você tem certeza das mudanças ?",
        showDenyButton: true,
        confirmButtonText: "Sim",
        denyButtonText: `Não`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
  
          // Realizar as alterações com o fetch.
          fetch('http://localhost:8000/user/settings/', {
              method: 'PATCH',
              headers: new Headers({
                  'Authorization': 'Token ' + document.querySelector('.user-profile-image').dataset.token,
                  'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                  'oldPassword': formValues[0],
                  'newPassword': formValues[1],
              })
          }).then((response)=>{
            if(response.status == 200){
                Swal.fire("Atualizado!", "", "success");
              }else{
                Swal.fire("As senhas não coincidem!", "", "error");
              }
          }).catch((err)=>{
              console.log(err);
          })
  
        } else if (result.isDenied) {
          Swal.fire("Você não realizou as alterações", "", "warning");
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Você precisa digitar algo!",
      });
    }
  }
  