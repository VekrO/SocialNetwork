let userBox = document.querySelector('.user-wrapper');
let menuBox = document.querySelector('.profile-menu');
userBox.addEventListener('click', (e)=>{
    if(menuBox.style.visibility == 'visible'){
        menuBox.style.visibility = 'hidden';
        menuBox.style.animation = '';
    }else{
        
        menuBox.style.visibility = 'visible';
        menuBox.style.animation = 'example 2s';
    }
})