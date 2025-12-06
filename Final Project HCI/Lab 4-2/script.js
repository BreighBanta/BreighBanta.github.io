const wrapper = document.querySelector('.wrapper')
const image = document.getElementById('image')

const doors = ['galaxy', 'barn', 'lab'];
const images = ['bg.gif', 'barn-in-morning.jpg', 'nursing_skills.jpg']
let currentIndex = 0;

wrapper.classList.add(doors[currentIndex]);

function update() {
    wrapper.classList.remove('open');

    setTimeout(()=> {
        doors.forEach(style => wrapper.classList.remove(style));
        wrapper.classList.add(doors[currentIndex]);
        image.src = './Images/' + images[currentIndex];
        wrapper.classList.add('open');
    }, 300);
}

function nextDoor() {
    currentIndex = (currentIndex + 1) % doors.length;
    update();
}

function lastDoor() {
    currentIndex = (currentIndex - 1 + doors.length) % doors.length;
    update();
}