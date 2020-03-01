

const avgallery = {};

avgallery.__create_gallery = (images = []) => {
    let wrap = document.createElement('div');
    wrap.classList.add('gallery-wrap');
    wrap.insertAdjacentHTML('afterbegin', `<div class="gallery">
                    <div class="exit" data-button="button">
                        <img src="img/clear.png" alt="">
                    </div>
                    <div class="gallery-body">
                        <span id="left">
                            <img src="img/arrow_left.png" alt="">
                        </span>
                        <div class="big-img">
                            <img src="img/img1.jpg" data-src=${images[0]} alt="" id="img-review">
                        </div>
                        <span id="right">
                            <img src="img/arrow_right.png" alt="">
                        </span>
                    </div>
                    <div class="gallery-mini"></div>
                </div>`
    )
    document.body.appendChild(wrap);
}

let images = [];
let data_avgallery = document.querySelectorAll('[data-avgallery="images"]');
for (let i of data_avgallery) {
    images.push(i.src || i.href);
}

avgallery.__create_gallery(images);

for (let i of data_avgallery) {
    i.addEventListener('click', () => {
        document.getElementsByClassName('gallery-wrap')[0].style.zIndex = '2';
        document.getElementsByClassName('gallery-wrap')[0].style.opacity = '1';
        listeners();
    })
}



const listeners = () => {
    let img = document.getElementById('img-review');
    let img_mini = document.getElementsByClassName('img-mini');
    let gallery_box = document.getElementsByClassName('gallery-wrap');
    let exit = document.querySelectorAll('[data-button="button"]');
    let left_change = document.getElementById('left');
    let right_change = document.getElementById('right');
    let gallery_mini = document.getElementsByClassName('gallery-mini');


    for (let i of images) {
        let img = document.createElement('img');
        let div = document.createElement('div');
        img.src = i;
        img.dataset.source = i;
        img.className = 'img-mini';
        div.className = 'img-mini-box';
        gallery_mini[0].appendChild(div);
        div.appendChild(img);
    }

    exit[0].addEventListener('click', () => {
        gallery_box[0].style.zIndex = '-1';
        gallery_box[0].style.opacity = '0';
        
    })

    const right = () => {
        let ind = images.findIndex((item) => {return item == img.dataset.src})
        if (ind >= images.length - 1) {
            img.src = images[0];
            img.dataset.src = images[0];
        } else {
            img.src = images[ind + 1]
            img.dataset.src = images[ind + 1];
        }
    }

    const left = () => {
        let ind = images.findIndex((item) => {return item == img.dataset.src})
        if (ind <= 0) {
            img.src = images[images.length - 1];
            img.dataset.src = images[images.length - 1];
        } else {
            img.src = images[ind - 1]
            img.dataset.src = images[ind - 1];
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
        }, 501)
    })


    left_change.addEventListener('click', (e) => {
        setTimeout(() => {
            img.style.opacity = '0';
        }, 50)
        setTimeout(() => {
            left();
            img.style.opacity = '1';
        }, 500)
    })

    right_change.addEventListener('click', (e) => {
        setTimeout(() => {
            img.style.opacity = '0';
        }, 50)
        setTimeout(() => {
            right();
            img.style.opacity = '1';
        }, 500)
    })

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
            }, 500)
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
}

