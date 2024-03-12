const accessKey = "wTXUW-ZW8ZTBmrP5mcXKDuV3HE3SNdIKt7YRTcnw_Vw";

let loadMore = $(".show-more-btn");
let searchResults = $("#search-results .container .gray");
let searchForm = $(".keyword_user");
let searchBtn = $(".user_search");
let rightBox = $(".right-side-top");

let keyword;
let page = 1;

async function searchImg() {
  let url = "";
  try {
    if (searchForm.val() === "") {
      keyword = "random things";
      url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=24`;
    } else {
      keyword = searchForm.val();
      url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=24`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.map((result) => {
      let insta_handle;
      if (result.user.social.instagram_username) {
        insta_handle = result.user.social.instagram_username;
      } else {
        insta_handle = "n/a";
      }

      const imgContainer = $(`
        <div class="img-cont">
          <img src="${result.urls.small}" alt="${result.alt_description}" />
          <a href="#" class="downld" download>
            <i class="fa-solid fa-arrow-down"></i>
          </a>
          <div class="creator">
            <div class="creator-img">
              <img src="${result.user.profile_image.small}" alt="" />
            </div>
            <div class="creator-name">
              <span>${result.user.first_name}</span>
              <p>${insta_handle}</p>
            </div>
          </div>
          <div class="heart">
            <i class="fa-solid fa-heart"></i> 
          </div>
        </div>
      `);

      const smallBelowSection = $(
        `<div class="below-img-cont">
          <button class="heart-second">
            <i class="fa-solid fa-heart"></i> 
          </button>
          <button class="download-second">
            <a href="${result.urls.small}" download><p>Download</p>
            <i class="fa-solid fa-chevron-down"></i>
            </a>
          </button>
        </div>`
      );

      $(".heart-second").on("click",function () {
        // Toggle class and styles
        $(this).toggleClass("clik");
        if ($(this).hasClass("clik")) {
          $(this).find("i").css("color", "white");
          $(this).css("background", "red");
          $(this).css("border", "1px solid transparent");
        } else {
          $(this).find("i").css("color", "gray");
          $(this).css("background", "white");
          $(this).css("border", "1px solid rgba(128, 128, 128, 0.352)");
        }
      });

      $(".heart").on("click",function () {
        // Toggle class and styles
        $(this).toggleClass("clik");
        if ($(this).hasClass("clik")) {
          $(this).find("i").css("color", "white");
          $(this).css("background", "red");
          $(this).css("border", "1px solid transparent");
        } else {
          $(this).find("i").css("color", "gray");
          $(this).css("background", "white");
          $(this).css("border", "1px solid rgba(128, 128, 128, 0.352)");
        }
      });

      const smallAboveSection = $(`
        <div class="creator-second">
          <img src="${result.user.profile_image.small}" alt="" class="creator-img-second">
          <p class="creator-name-second">${result.user.first_name}</p>
        </div>
      `);

      searchResults.append(smallAboveSection);
      searchResults.append(imgContainer);
      searchResults.append(smallBelowSection);
    });

    console.log(url);
  } catch (error) {
    console.log("error is listed here");
    console.error(error);
  }
}

searchBtn.on("click", () => {
  searchResults.empty();
  page = 1;
  searchImg();
});

searchForm.keypress(function (event) {
  if (event.which === 13) {
    searchResults.empty();
    page = 1;
    searchImg();
  }
});

loadMore.on('click', loadMoreImages);

function loadMoreImages() {
  page++;
  searchImg();
}

searchImg();

$(document).on("click", ".downld", function(e) {
  e.preventDefault(); // Prevent default action (opening blank tab)

  const imageUrl = $(this).closest(".img-cont").find("img").attr("src");
  const fileName = "image.jpg"; // Set default file name or extract from URL

  // Convert image to base64
  fetch(imageUrl)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        const base64data = reader.result;
        // Download the base64 data
        downloadBase64Image(base64data, fileName);
      }
    });
});

$(".heart ").on("click", () => {
  $(".heart").addClass(".clicked");
  console.log("hello");
});

$(".heart.clicked").on("click", () => {
  $(".heart.clicked").removeClass(".clicked");
});

var leftSideElement = $(".left-side-top");
var computedHeight = leftSideElement.css("height");
console.log("Computed height of left-side-top:", computedHeight);

var rightSideBox = $(".right-side-box");
rightBox.css("height", computedHeight);

function isTopSectionVisible() {
  var topSection = $("#top-section");
  var topSectionBounds = topSection[0].getBoundingClientRect();
  return (
    topSectionBounds.top >= 0 &&
    topSectionBounds.left >= 0 &&
    topSectionBounds.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    topSectionBounds.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

function toggleTopSectionReach() {
  var topSectionReach = $("#top-reach-button");
  if (isTopSectionVisible()) {
    topSectionReach.css("scale", "0");
  } else {
    topSectionReach.css("scale", "1");
  }
}

toggleTopSectionReach();

$(window).scroll(function () {
  toggleTopSectionReach();
});

window.addEventListener('scroll', function() {
  // Check if the end of search results is visible
  var searchResults = document.getElementById('search-results');
  var rect = searchResults.getBoundingClientRect();
  if (rect.bottom <= window.innerHeight) {
    // If end of search results is visible, trigger the alert
    // alert('Hello! You have reached the end of search results.');
    loadMoreImages();
  }
});

function downloadBase64Image(base64data, filename) {
  const link = document.createElement('a');
  link.href = base64data;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
