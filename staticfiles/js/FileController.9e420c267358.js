function changeInputFileText(){

    if(document.querySelector('input[name=image]').files.length == 1){
        if(document.querySelector('.file-label-text').parentNode.childNodes.item(0).nodeName == 'I'){
            document.querySelector('.file-label-text').parentNode.childNodes.item(0).remove()
        }
        document.querySelector('.file-label-text').parentNode.style.backgroundColor = 'green'
        document.querySelector('.file-label-text').textContent = 'Arquivo selecionado com sucesso';
    }

}

function ImageController(){

    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("image").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").style.width = '200px';
        document.getElementById("uploadPreview").style.height = '200px';
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };

    ImageControllerText();

}

function ImageControllerText(){
    if(document.querySelector('input[name=image]').files.length == 1){
        document.querySelector('.file-label-text').style.backgroundColor = 'green'
        document.querySelector('.file-label-text').textContent = 'Arquivo selecionado!';
    }
}