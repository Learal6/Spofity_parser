const xhr = new XMLHttpRequest();

let songs = null;

//retrieve search paramaters
async function search(){
  // value from dropdown1
  const searchBy = document.getElementById("search-by").value;
 
  const sortBy = document.getElementById("sort-by").value;
 
  const checkbox = document.getElementById('checkbox').checked;
  
  const songSearch = document.getElementById('songSearch').value;

  //Request  
  let url = `http://127.0.0.1:5000/2023songs?searchBy=${encodeURIComponent(searchBy)}&sortBy=${encodeURIComponent(sortBy)}&checkbox=${encodeURIComponent(checkbox)}&songSearch=${encodeURIComponent(songSearch)}`;
  let prom = await fetch(url);
  let result = await prom.json();
  songs = result;

  //sort returned songs
  sortSongs(songs, sortBy);
}

//This function sorts the returned song list by the desiered parameter
//cite fellow student for info on the sort the funciton
function sortSongs(songs, status){

  if (status == 'popularity'){
    sorted_songs = songs.sort((a, b) => b.popularity - a.popularity);
  } 
  else if(status == 'duration'){
    sorted_songs = songs.sort((a, b) => b.duration_mins - a.duration_mins);
  }

  //call display funciton
  display_songs(sorted_songs)
}

//this funciton displays the songs by iterating through the filtered json data
function display_songs(songs){

  //clear old songs
  let divs = document.querySelectorAll('div'); 
  divs.forEach(div => div.remove());

  //display error if no results
  if (songs.length == 0){
    let wrap = document.createElement('div')

    let error = document.createElement('p');
    error.innerText = "No results"

    wrap.appendChild(error)
    document.body.appendChild(wrap)
  }

  //display returned songs
  for (let i = 0; i < songs.length; i++){

    //create needed dom elements for each song
    let container = document.createElement('div');
   
    let name = document.createElement('p');
    name.innerText = songs[i].title
    container.appendChild(name)

    let genres = document.createElement('p');
    let genreString = "Genres: "
    for (g of songs[i].genres){
      genreString += g + ", "
    }
    genres.innerText = genreString.slice(0,-1);
    container.appendChild(genres)

    let popularity = document.createElement('p');
    popularity.innerText = songs[i].popularity
    container.appendChild(popularity)

    let duration = document.createElement('p');
    duration.innerText = "Duration: " + songs[i].duration_mins + " mins"
    container.appendChild(duration)

    let link =  document.createElement('a')
    link.href = songs[i].url, link.innerText = "Listen on Spotify";
    container.appendChild(link)

    let line = document.createElement('hr')
    container.appendChild(line)

    document.body.appendChild(container)
  }
}