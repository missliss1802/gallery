
let img = document.getElementById('img-review');
const gallery = ['img/img1.jpg', 'img/img2.jpg', 'img/img3.jpg', 'img/img4.jpg', 'img/img5.jpg', 'img/img6.jpg', 'img/img7.jpg', 'img/img8.jpg', 'img/img9.jpg', 'img/img10.jpg', 'img/img11.jpg']
let gallery_mini = document.getElementsByClassName('gallery-mini');
let img_mini = document.getElementsByClassName('img-mini');
let button = document.getElementById('button');
let gallery_box = document.getElementsByClassName('gallery-wrap');
let exit = document.querySelectorAll('[data-button="button"]');
let left_change = document.getElementById('left');
let right_change = document.getElementById('right');

button.addEventListener('click', () => {
    gallery_box[0].style.zIndex = '2';
    gallery_box[0].style.opacity = '1';

})

exit[0].addEventListener('click', () => {
    gallery_box[0].style.zIndex = '-1';
    gallery_box[0].style.opacity = '0';
    // element.parentNode.removeChild(element);
})

const right = () => {
    let ind = gallery.findIndex((item) => {return item == img.dataset.src})
    if (ind >= gallery.length - 1) {
        img.src = gallery[0];
        img.dataset.src = gallery[0];
    } else {
        img.src = gallery[ind + 1]
        img.dataset.src = gallery[ind + 1];
    }
}

const left = () => {
    let ind = gallery.findIndex((item) => {return item == img.dataset.src})
    if (ind <= 0) {
        img.src = gallery[gallery.length - 1];
        img.dataset.src = gallery[gallery.length - 1];
    } else {
        img.src = gallery[ind - 1]
        img.dataset.src = gallery[ind - 1];
    }
}
window.addEventListener('click', () => {
    setTimeout(() => {
        for (let i of img_mini) {
            if (img.dataset.src == i.dataset.source) {
                i.style.width = '96px';
                i.style.marginTop = '2px';
            } else {
                i.style.width = '100px';
                i.style.marginTop = '0';
            }
        }
    }, 601)
})


left_change.addEventListener('click', (e) => {
    setTimeout(() => {
        img.style.opacity = '0';
    }, 50)
    setTimeout(() => {
        left();
        img.style.opacity = '1';
    }, 600)
})

right_change.addEventListener('click', (e) => {
    setTimeout(() => {
        img.style.opacity = '0';
    }, 50)
    setTimeout(() => {
        right();
        img.style.opacity = '1';
    }, 600)
})

for (let i of gallery) {
    let img = document.createElement('img');
    let div = document.createElement('div');
    img.src = i;
    img.dataset.source = i;
    img.className = 'img-mini';
    div.className = 'img-mini-box';
    gallery_mini[0].appendChild(div);
    div.appendChild(img);
}

for (let i of img_mini) {
    i.addEventListener('click', (e) => {
        setTimeout(() => {
            img.style.opacity = '0';
            e.target.style.width = '96px';
            e.target.style.marginTop = '2px';
        }, 50)
        setTimeout(() => {
            img.src = e.target.dataset.source;
            img.dataset.src = e.target.dataset.source;
            img.style.opacity = '1';
        }, 600)
    });
    i.addEventListener('mouseover', () => {
        i.style.width = '96px';
        i.style.height = '131.3px';
        i.style.marginTop = '2px';
        i.style.transition = '0.2s';
    })

    i.addEventListener('mouseout', () => {
        if (img.dataset.src != i.dataset.source) {
            i.style.width = '100px';
            i.style.height = '133.3px';
            i.style.marginTop = '0';
            i.style.transition = '0.2s';
        }
    })
}