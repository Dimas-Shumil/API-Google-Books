// import { main } from('./catalog')


const entities = [
  {
    img: 'site/img/banner_1.png'
  },
  {
    img: 'site/img/banner_2.png'
  },
  {
    img: 'site/img/banner_3.png'
  }
]

const img = document.querySelector('.sl_img')

const sl = [document.querySelector('.sl1'), document.querySelector('.sl2'), document.querySelector('.sl3')]

let currentIndex = 0

const setEntity = (index) => {
  //console.log('ci= '+currentIndex, 'i= '+index);
  if (index == '-') {
    currentIndex = (currentIndex==0) ? 2 : currentIndex-1 //учтем переход по кругу влево     
  } else if (index == '+') {
    currentIndex = (currentIndex==2) ? 0 : currentIndex+1 //учтем переход по кругу вправо
  } else {
    currentIndex = index
  }

  for (i=0; i<=2; i++) {
    //sl1[i].style = (i==currentIndex) ? "color: #FFF; text-decoration: underline" : "color: rgba(255, 255, 255, 0.30)"; //font-size: 1.25em;
    //sl[i].style  = (i==currentIndex) ? "text-decoration: underline" : "";
    if (i==currentIndex) {
      sl[i].classList.add('activedot')
    } else {
      sl[i].classList.remove('activedot')
    }
  }
  img.setAttribute('src', entities[currentIndex].img)

  //img.style.backgroundImage = `url(${entities[currentIndex].img})`
}

// prev.addEventListener('click', () => {
//   setEntity('-')
// })
// next.addEventListener('click', () => {
//   setEntity('+');
// })

sl[0].addEventListener('click', () => {setEntity(0)});
sl[1].addEventListener('click', () => {setEntity(1)});
sl[2].addEventListener('click', () => {setEntity(2)});
// sl1[0].addEventListener('click', () => {setEntity(0)});
// sl1[1].addEventListener('click', () => {setEntity(1)});
// sl1[2].addEventListener('click', () => {setEntity(2)});

function showSliders() {
  currentIndex += 1
  if (currentIndex == 3) {
    currentIndex = 0
  }
  setEntity(currentIndex)
}

setEntity(0) //по дефолту покажем 1-ый слайд
document.addEventListener('DOMContentLoaded', () => {setInterval (showSliders, 5000)})