

const avgallery = {};

avgallery.__create_gallery = (e) => {
    let wrap = document.createElement('div');
    wrap.classList.add('gallery-wrap');
    wrap.insertAdjacentHTML('afterbegin', `<div class="gallery">
                    <div class="exit" data-button="button">
                        <img src="avgallery/clear.png" alt="">
                    </div>
                    <div class="gallery-body">
                        <span id="left">
                            <img src="avgallery/arrow_left.png" alt="">
                        </span>
                        <div class="big-img">
                            <img src=${e.target.src} data-src=${e.target.src} alt="" id="img-review">
                        </div>
                        <span id="right">
                            <img src="avgallery/arrow_right.png" alt="">
                        </span>
                    </div>
                    <div class="gallery-box">
                        <span id="button-right">
                            <img src="avgallery/arrow_right.png" alt="">
                        </span>
                        <span id="button-left">
                            <img src="avgallery/arrow_left.png" alt="">
                        </span>
                        <div class="gallery-mini"></div>
                    </div>
                </div>`
    )
    document.body.appendChild(wrap);
}

let images = [];

const load = () => {
    let data_avgallery = document.querySelectorAll('[data-avgallery="images"]');
    for (let i of data_avgallery) {
        images.push(i.src || i.href);
    }

    for (let i of data_avgallery) {
        i.addEventListener('click', (e) => {
            setTimeout(() => {
                avgallery.__create_gallery(e);
                document.getElementsByClassName('gallery-wrap')[0].style.zIndex = '2';
                document.getElementsByClassName('gallery-wrap')[0].style.opacity = '1';
                listeners(e);
            }, 200)
        })
    }
}



const listeners = (e) => {
    let img = document.getElementById('img-review');
    let img_mini = document.getElementsByClassName('img-mini-box');
    let exit = document.querySelectorAll('[data-button="button"]');
    let left_change = document.getElementById('left');
    let right_change = document.getElementById('right');
    let gallery_mini = document.getElementsByClassName('gallery-mini');
    

    document.getElementById('button-right').addEventListener('click', () => {
        let width_gallery = parseInt(screen.width) / 100
        if (parseInt(gallery_mini[0].style.marginLeft) < (parseInt(getComputedStyle(document.getElementsByClassName('gallery-mini')[0]).width) - parseInt(screen.width)) * -1) {
            gallery_mini[0].style.marginLeft = (parseInt(getComputedStyle(document.getElementsByClassName('gallery-mini')[0]).width) - parseInt(screen.width)) * -1 + 'px';
        } else {
            gallery_mini[0].style.marginLeft = (parseInt(gallery_mini[0].style.marginLeft) || 0) - 100 + 'px';
        }
        gallery_mini[0].style.transition = '0.2s';
    })

    document.getElementById('button-left').addEventListener('click', () => {
        if (parseInt(gallery_mini[0].style.marginLeft) >= 0 || gallery_mini[0].style.marginLeft == '') {
            gallery_mini[0].style.marginLeft = '0px';
        } else {
            gallery_mini[0].style.marginLeft = (parseInt(gallery_mini[0].style.marginLeft) || 0) + 100 + 'px';
        }
        gallery_mini[0].style.transition = '0.2s';
    })


    for (let i of images) {
        let div = document.createElement('div');
        div.style.backgroundImage = 'url(' + i +')';
        div.dataset.source = i;
        div.className = 'img-mini-box';
        gallery_mini[0].appendChild(div);
    }



    exit[0].addEventListener('click', () => {
        document.body.removeChild(document.getElementsByClassName('gallery-wrap')[0]);
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
                    i.style.outline = '3px solid #00DA78'
                } else {
                    i.style.outline = 'none'
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
            }, 50)
            setTimeout(() => {
                img.src = e.target.dataset.source;
                img.dataset.src = e.target.dataset.source;
                img.style.opacity = '1';
            }, 500)
        });
        i.addEventListener('mouseover', () => {
            i.style.transition = '0.2s';
            i.style.outline = '3px solid #00DA78'
        })

        i.addEventListener('mouseout', () => {
            if (img.dataset.src != i.dataset.source) {
                i.style.transition = '0.2s';
                i.style.outline = 'none'
            }
        })
    }
}
setTimeout(() => {
    load();
}, 200)

