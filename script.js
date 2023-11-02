
//-----------Recent Movie Carasol---------------
let loader=document.querySelector(".loader");
async function fecthData(movie, pg) {
  //------------Fetching Data from Api------------
  let url = `https://api.themoviedb.org/3/movie/${movie}?api_key=b9c5d80678310e66fee6f5306dbdb8b9&page=${pg}`;
  let data = await fetch(url);
  let res = await data.json();
  appendCarasoulData(res.results);
}

let newarr = [];
function appendCarasoulData(result) {
  // -----------Filtering On The Basis of Language-------------------------------
  result.forEach((ele) => {
    if (ele.original_language == "en") {
      newarr.push(ele);
    }
  });
  if (newarr.length < 15) {
    fecthData("upcoming", Math.floor(Math.random() * 20 + 1));
  } else {
    // ---------------Calling function to create and append Data to Carasol------------
    createAndAppendData(newarr);
    // newarr=[];
  }
}

function createAndAppendData(movieArr) {
  //  Creating Element And Appending Data fetched from API
  movieArr.forEach((ele, idx) => {
    if (idx <= 10) {
      let div1 = document.createElement("div");
      let poster = ele.poster_path;
      let title = ele.original_title;
      div1.classList.add("rec-Movie");
      div1.innerHTML = `
        <img src=https://www.themoviedb.org/t/p/w220_and_h330_face${poster} alt="">
        <p class="rec-title">${title}</p>
        `;
      document.querySelector(".carasuol").appendChild(div1);
    }
  });
}
fecthData("upcoming", Math.floor(Math.random() * 20 + 1));

let carasoul = document.querySelector(".carasuol");
let lftPos = 0;
setInterval(() => {
  carasoul.style.left = `-${lftPos}px`;
  lftPos += 172;
  //   console.log(newarr.length);
  if (lftPos >= 172 * 5) {
    lftPos = 0;
  }
}, 2000);

let searchIcon = document.querySelector(".searchBar i");
let searchInput = document.querySelector(".searchBar input");
let searchBar = document.querySelector(".searchBar");
searchIcon.addEventListener("click", () => {
  searchInput.focus();
  // searchBar.style.width ="200px"
  searchInput.style.left = "-700%";
  searchBar.style.overflow = "visible";
});

// All buttons
let page = 1;
//------------------------------ EVENT ON BUTTON-------------------
let allFilterButton = document.querySelectorAll(".filter-movie button");
allFilterButton[0].classList.add("activeBtn");

allFilterButton.forEach((ele, idx) => {
  ele.addEventListener("click", (e) => {
    for (let i = 0; i < allFilterButton.length; i++) {
      if (i == idx) {
        allFilterButton[i].classList.add("activeBtn");
      } else {
        allFilterButton[i].classList.remove("activeBtn");
      }
    }

    page = 1;
    // console.log(e.target.value);
    movieArray = [];
    showMovie.innerHTML = "";
    fecthDataAgain(e.target.value, page);
  });
});

let movieArray = [];
let showMovie = document.querySelector(".showMovie");
async function fecthDataAgain(movie, pg) {
  //------------Fetching Data from Api------------
  try {
    let url = `https://api.themoviedb.org/3/movie/${movie}?api_key=b9c5d80678310e66fee6f5306dbdb8b9&page=${pg}`;
    let data = await fetch(url);
    let res = await data.json();
    loader.style.display="flex"
    // console.log(pg);
    appendMainData(res.results, movie);
  } catch (error) {
    if (page == 2000) {
      page = 1;
    }
    // console.log("error");
    fecthDataAgain(`${movie}`, page++);
  }
}

function appendMainData(result, movie) {
    loader.style.display="none"
  // -----------Filtering On The Basis of Language-------------------------------
  result.forEach((ele) => {
    if (ele.original_language == "en") {
      movieArray.push(ele);
    }
  });
  // console.log(movieArray.length);
  if (movieArray.length <= 20) {
    fecthDataAgain(`${movie}`, page++);
  } else {
    // ---------------function to create and append Data to Main------------
    createEleAppendToMain(movieArray);
  }
}
let allItems=document.querySelectorAll(".showMovieItem");

function createEleAppendToMain(movieArray) {
  movieArray.forEach((ele, idx) => {
    if (idx < 20) {
      // console.log(ele);
      let div1 = document.createElement("div");
      let poster = ele.poster_path;
      let title = ele.original_title;
      div1.classList.add("showMovieItem");
      div1.innerHTML = `
              <img src=https://www.themoviedb.org/t/p/w220_and_h330_face${poster} alt="">
              <p class="main-title">
              <span >${title}</span>
              <span>,${ele.Year}</span>
              </p>
              `;
      showMovie.appendChild(div1);
      allMovieCard=document.querySelectorAll(".showMovieItem")
      addEventonBtn( allMovieCard)
      // showMovieDetails(allItems);

    }
  });
}

// function showMovieDetails(allItems){
//   allItems.forEach(ele=>{
//     ele.addEventListener("click", showDetailCallBack)
//   })
// }
// async function showDetailCallBack(e){
// let t=(e.target.parentElement.children[1].innerText);
// t=t.split(" ").join("+");
// let data= await fetch(`http://www.omdbapi.com/?apikey=340ca97e&t=${t}&plot=full`);
// let res= await data.json();
// console.log(res)

// }

fecthDataAgain("popular", 1);
// Deboucing concept
let searchBtn = document.querySelector(".searchBtn");

function betterFunc(callFunc, delay){
    let timer;
    return ()=>{
        if(timer){
            clearTimeout(timer);
        }
       timer = setTimeout(()=>{
            callFunc();
        },delay)
    }
}

searchBtn.addEventListener("input", (e) => {
  e.preventDefault()
  showMovie.innerHTML="";
  loader.style.display="flex"
     myDebounce();
     
    });

let myDebounce=betterFunc(getData, 500);

async function getData() {
  loader.style.display="none"
  let val = searchInput.value.split(" ").join("+");
  try {
    let data = await fetch(
      `http://www.omdbapi.com/?&apikey=340ca97e&s=${searchInput.value}&page=1`
    );
    let data2=await fetch("http://www.omdbapi.com/?&apikey=340ca97e&id=tt8110330")
    let res2= await data2.json();
    // console.log(res2);
    let res = await data.json();
    console.log(res);
    showMovie.innerText = "";
    res.Search.forEach((ele) => {
      let div1 = document.createElement("div");
      div1.classList.add("showMovieItem");
      div1.innerHTML = `
                <img src=${ele.Poster} alt="">
                <p class="main-title">
                <span >${ele.Title}</span>
                <span>,${ele.Year}</span></p>
                `;
      showMovie.appendChild(div1);
      
      
    });
    allMovieCard=document.querySelectorAll(".showMovieItem")
      addEventonBtn(allMovieCard);
  } catch (error) {
    if(searchInput.value==""){
      showMovie.innerHTML="<h1>Please Enter Movie Name</h1>"
    }else{
      showMovie.innerHTML="<h1>Movie Not Found!!!</h1>"
    }
    
  }

}



let allMovieCard;

function addEventonBtn(allMovieCard){
  // allMovieCard=document.querySelectorAll(".showMovieItem")
  allMovieCard.forEach(ele=>{
    ele.addEventListener("click",movieDetail)
  })
}

let showDetailPopUp=document.querySelector(".background");
async function movieDetail(e){
  let movieClicked= e.target.parentElement.children[1].children[0].innerText;
  // console.log(movieClicked);
  let val=movieClicked.split(" ").join("+");
  let data= await fetch(`http://www.omdbapi.com/?apikey=340ca97e&t=${val}&plot=full`);
  let res= await data.json();
  let div1=document.createElement("div");
  div1.classList.add("showMovieDetails");
  div1.innerHTML=
  `
  <i class="fa-solid fa-xmark"></i>
  <div class="imgD">
      <img src=${res.Poster} alt="">
  </div>
  <div class="detailsRight">
      <div class="detailsRight-sub">
          <!-- <div class="detailsRight-heading"> -->
          <p><span>${res.Title}</span>
              <spna>${res.Year}</spna>
          </p>
          <p>
              <span class="rated">${res.Rated}</span>
              <span class="date">10/20/2023</span>.
              <span>${res.Genre}</span>
              <span class="hr">${res.Runtime}</span>
          </p>
          <div class="icons">
              <i class="fa-solid fa-list"></i>
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-bookmark"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-download"></i>
              <i class="fa-regular fa-circle-play"></i>
          </div>
          <h3>Overview</h3>
          <p class="description">${res.Plot}</p>
          <div class="directors">
              <p>${res.Director}<br><span>Director</span></p>
              <p>${res.Writer} <br><span>Writer</span></p>
          </div>
          <!-- </div> -->
      </div>
  </div>
  
  `
  
  // console.log("hh");
  showDetailPopUp.replaceChildren(div1);
  showDetailPopUp.style.display="flex"
  document.querySelector(".showMovieDetails").classList.add("animate__zoomIn")
  // showDetailPopUp.classList.add("animate__lightSpeedInRight")
  closePopbtn=document.querySelector(".fa-xmark")
  closePopUp(closePopbtn)
}

function closePopUp(closePopbtn){
  closePopbtn.addEventListener("click",()=>{
    showDetailPopUp.style.display="none"
  })
}