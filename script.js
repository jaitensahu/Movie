
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
function createEleAppendToMain(movieArray) {
  movieArray.forEach((ele, idx) => {
    if (idx < 20) {
      let div1 = document.createElement("div");
      let poster = ele.poster_path;
      let title = ele.original_title;
      div1.classList.add("showMovieItem");
      div1.innerHTML = `
              <img src=https://www.themoviedb.org/t/p/w220_and_h330_face${poster} alt="">
              <p class="main-title">${title}</p>
              `;
      showMovie.appendChild(div1);
    }
  });
}

fecthDataAgain("popular", 1);

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
     myDebounce();
    });

let myDebounce=betterFunc(getData, 2000);

async function getData() {
  let val = searchInput.value.split(" ").join("+");
  let data = await fetch(
    `http://www.omdbapi.com/?&apikey=340ca97e&s=${searchInput.value}&page=1`
  );
  let data2=await fetch("http://www.omdbapi.com/?&apikey=340ca97e&id=tt8110330")
  let res2= await data2.json();
  console.log(res2);
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
    addEventonBtn();
}

let allMovieCard;

function addEventonBtn(){
  allMovieCard=document.querySelectorAll(".showMovieItem")
  allMovieCard.forEach(ele=>{
    ele.addEventListener("click",movieDetail)
  })
}


async function movieDetail(e){
  let movieClicked= e.target.parentElement.children[1].children[0].innerText;
  console.log(movieClicked);
  let data= await fetch(`http://www.omdbapi.com/?apikey=340ca97e&t=dil&plot=full`);
  let res= await data.json();
  console.log(res);

  
  
}