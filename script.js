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
      keyword = "s";
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
  <a href="${result.links.download}" target="_blank" class="downld">
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

      searchResults.append(imgContainer);
      console.log("hello");
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

loadMore.on("click", (e) => {
  page++;
  searchImg();
});

searchImg();

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

var rightSideBox = $('.right-side-box');
rightBox.css('height',computedHeight);

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
      topSectionReach.css('scale','0');
    } else {
      topSectionReach.css('scale','1');
    }
  }

  toggleTopSectionReach();

  $(window).scroll(function () {
    toggleTopSectionReach();
  });