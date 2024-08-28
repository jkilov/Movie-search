const container = document.getElementById("container");
const input = document.getElementById("input");
const findShowBtn = document.getElementById("generate-btn");
const showMoreBtm = document.getElementById("show-more-results");
const filterBtn = document.getElementById("filter-dropdown");

let showArr = [];
let startingIndex = 0;
let endingIndex = 3;

const displayShows = (arr) => {
  arr.forEach((el) => {
    // Create media container div
    const mediaContainer = document.createElement('div');
    mediaContainer.classList.add('media-container');

    // Create image container div
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    // Create and append img element
    const img = document.createElement('img');
    img.classList.add('img-size');
    img.src = el.show.image ? el.show.image.medium : ''; // Handle missing images
    imgContainer.appendChild(img);

    // Create text container div
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Create and append text elements
    const name = document.createElement('p');
    name.innerHTML = `<strong>Name: </strong>${el.show.name}`;
    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Summary: </strong>${
      el.show.summary.length > 1 ? el.show.summary.slice(0, 50) + "..." : el.show.summary
    }`;
    const rating = document.createElement('p');
    rating.innerHTML = `<strong>Rating: </strong>${el.show.rating.average || 'N/A'}`;

    textContainer.appendChild(name);
    textContainer.appendChild(summary);
    textContainer.appendChild(rating);

    // Append image container and text container to media container
    mediaContainer.appendChild(imgContainer);
    mediaContainer.appendChild(textContainer);

    // Append media container to the main container
    container.appendChild(mediaContainer);
  });

  showMoreBtm.classList.remove("hidden");
  filterBtn.classList.remove("hidden");
};

const showMoreResults = () => {
  startingIndex += 3;
  endingIndex += 3;
  displayShows(showArr.slice(startingIndex, endingIndex));

  if (showArr.length < endingIndex) {
    alert("No More Resuls")
  }
};

const displayShow = () => {
  let userInput = input.value;

startingIndex = 0;
endingIndex = 3;

  fetch(`https://api.tvmaze.com/search/shows?q=${userInput}`)
    .then((res) => res.json())
    .then((data) => {
      showArr = data;
      container.innerHTML = ''; // Clear previous results
      displayShows(showArr.slice(startingIndex, endingIndex));
    });
};

// Event listeners
findShowBtn.addEventListener('click', () => {
  filterBtn.value = "sort-by"
  displayShow();
});

showMoreBtm.addEventListener('click', () => {
  showMoreResults();
});

filterBtn.addEventListener('change', () => {
  const selectedFilter = filterBtn.value; // Get the selected value
  
  if (selectedFilter === "highest-rating") {
    console.log("Filtering by highest rating");

    // Sort by highest rating
    const filteredResults = showArr.sort((a, b) => {
      return (b.show.rating.average || 0) - (a.show.rating.average || 0);
    })
    container.innerHTML = ''; // Clear previous results
    displayShows(filteredResults.slice(startingIndex, endingIndex)); // Display filt
  }

    else if (selectedFilter === "lowest-rating"){

      const filteredResults = showArr.sort((a,b) => {
        return (a.show.rating.average || 0) - (b.show.rating.average || 0);
      }
      )
      container.innerHTML = ''; // Clear previous results
      displayShows(filteredResults.slice(startingIndex, endingIndex)); // Display filt
    }
  }
);
