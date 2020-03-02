window.onload = () => {
    let imges = document.getElementsByClassName('imges');
    for (let i = 1; i < 23; i++) {
        let image = document.createElement('img');
        image.src = 'img/img' + i + '.jpg';
        image.dataset.avgallery = "images";
        imges[0].appendChild(image);
    }
}