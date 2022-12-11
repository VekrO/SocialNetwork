const form = document.querySelector('.form-post');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let description = document.querySelector('textarea[name=description]');
    if(description.value.length == 0){
        description.style.border = '1px solid red';
    }else{
        form.submit();
    }
})