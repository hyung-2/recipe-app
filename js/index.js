const resultCon = document.querySelector('.result-container')
const resultCard = document.querySelectorAll('.result-card')
const input = document.querySelector('.container .searching input')
const searchBtn = document.querySelector('.container .searching button')
const modal = document.querySelector('.modal')
const modalTitle = document.querySelector('.modal h2')
const modalBtn = document.querySelector('.modal .category')
const modalText = document.querySelector('.modal p')

//데이터 6개 생성
let offset = 0
let numSix = 6
function loadCardbox(arry){
  for(let i=offset; i<offset+numSix; i++){
    let cardBox = document.createElement('div')
    resultCon.appendChild(cardBox)
    cardBox.className = 'result-card'

    let imgBox = document.createElement('div')
    cardBox.appendChild(imgBox)
    imgBox.className = 'img-box'

    let textBox = document.createElement('div')
    cardBox.appendChild(textBox)
    textBox.className = 'text-box'

    let img = document.createElement('img')
    img.src = arry.meals[i].strMealThumb
    imgBox.appendChild(img)

    let title = document.createElement('h2')
    title.innerText = arry.meals[i].strMeal
    textBox.appendChild(title)

    let btn = document.createElement('button')
    btn.innerText = 'Get Recipe'
    textBox.appendChild(btn)
    btn.className = 'openbtn'

    let categroy = document.createElement('div')
    categroy.innerText = arry.meals[i].strCategory
    textBox.appendChild(categroy)
    categroy.classList.add('close')

    let instruction = document.createElement('div')
    instruction.innerText = arry.meals[i].strInstructions
    textBox.appendChild(instruction)
    instruction.classList.add('close')

    let videoLink = document.createElement('a')
    videoLink.href = arry.meals[i].strYoutube
    textBox.appendChild(videoLink)
    videoLink.classList.add('close')
  }
}

//api데이터 가져오기
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=egg';

function loadApi(url){
  return fetch(url)
          .then(response => response.json())
}
function showData(list){
  //6개 리스트 보여주기
  console.log(list)
  loadCardbox(list)

  //스크롤 이벤트
  window.addEventListener('scroll', (event) => {
    //무한스크롤 6개씩
    const cards = document.querySelectorAll('.result-card')
    const scrollHeight = Math.max(   // 전체문서 높이 (스크롤이벤트 내부에 있어야 함)
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        if(Math.abs((window.pageYOffset+ document.documentElement.clientHeight) - scrollHeight > 0)){
          console.log('밑바닥도착')
          offset = offset+numSix
          loadCardbox(list)
        }

  })
  
  //검색한 타이틀만 보이게
  let titles = resultCon.querySelectorAll('.result-card .text-box')
  cardTitles = []
  console.log(input.value)
  titles.forEach(title => {
    cardTitles.push({title: title.firstChild.innerText, img: title.previousElementSibling.innerHTML})
  })
  copyCardTitles = [...cardTitles]
  console.log(cardTitles)
  console.log(copyCardTitles)
    function clickToSearch(){
      if(input.value !== ''){
        const searched = copyCardTitles.filter(cardTitle => cardTitle.title.toLowerCase().includes(input.value.toLowerCase()))
        console.log(searched)
          replace(searched)
      }else{
        console.log(cardTitles)
        replace(cardTitles)
      }
      console.log(cardTitles)
      console.log(copyCardTitles)

      function replace(searched){
        resultCon.innerHTML = ''
          for(i=0; i<searched.length; i++){
            let cardBoxing = document.createElement('div')
            resultCon.appendChild(cardBoxing)
            cardBoxing.className = 'result-card'

            let imgBox = document.createElement('div')
            imgBox.className= 'img-box'
            cardBoxing.appendChild(imgBox)
            imgBox.innerHTML = `${searched[i].img}`

            let textBox = document.createElement('div')
            textBox.className= 'text-box'
            cardBoxing.appendChild(textBox)
            textBox.innerHTML = `<h2>${searched[i].title}</h2>`

            let btn = document.createElement('button')
            btn.innerText = 'Get Recipe'
            textBox.appendChild(btn)
            btn.className = 'openbtn'
          }
      }
  }

  
  
  
  //Get Recipe버튼 클릭시     
  const cardBtns = document.querySelectorAll('.openbtn')

  function openModal(event){
    if(event.target.innerText === 'Get Recipe'){
      event.stopPropagation()
      modal.classList.add('flex')
      resultCon.append(modal)
      modalInner(event)
    }
  }
  //modal창 내부
  
  let modalLink = document.querySelector('.modal .modal-link')
  let modalImg = document.querySelector('.modal .modal-imgbox')
  function modalInner(e){
    modalTitle.innerText = e.target.previousElementSibling.innerText
    modalBtn.innerText = e.target.nextElementSibling.innerText
    modalText.innerText = e.target.nextElementSibling.nextElementSibling.innerText
    modalImg.innerHTML = e.target.parentNode.previousElementSibling.innerHTML
    modalLink.innerHTML = `<a href="${e.target.nextElementSibling.nextElementSibling.nextElementSibling}" target="_blank">Watch Video</a>`
  }
  //modal창 닫기
  const closeBtn = document.querySelector('.closebtn')
  function closeModal(){
    modal.classList.remove('flex')
  }
  
  closeBtn.addEventListener('click',closeModal)
  resultCon.addEventListener('click',openModal)
  
}  

loadApi(url)
        .then(list => showData(list))
        
//다크모드
const icons = document.querySelectorAll('.darkbtn .icon')
const darkBtn = document.querySelector('.darkbtn')
const header = document.querySelector('header')
const mLink = document.querySelector('.modal .modal-link')
darkBtn.addEventListener('click',(evnet) => {

    document.body.classList.toggle('dark')
    header.classList.toggle('dark')
    // resultCard.classList.toggle('dark')
    input.classList.toggle('dark')
    modal.classList.toggle('dark')
    modalBtn.classList.toggle('dark')
    mLink.classList.toggle('dark')

    for(let icon of icons){
      icon.classList.contains('close') ? icon.classList.remove('close') : icon.classList.add('close')
    }

})

        
        
        
        
        
