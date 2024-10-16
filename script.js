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

  sortSongs(songs, sortBy);
}

//sort the songs
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

function display_songs(songs){
  if (songs.length == 0){
    console.log("empty")
  }
}