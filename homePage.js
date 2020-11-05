var baseUrl = "http://localhost:3000/";
var postCategory = false;
$(document).ready(function () {
  console.log("hii");
  getPosts();
  //============Autocomplete=================
  // BindControls();

  //============Search Functionality==========
  $("#search").on("click", (e) => {
    let category = $("#categories").val();
    console.log("category : " + category);
    postCategory = true;
    getPosts(category);
  });

  //===========Post the blog===============
  $("#post").click(function () {
    console.log("Adding posts!");
    addPost();
  })
});

//============Autocomplete Functionality=================
// function BindControls() {
//   var categories = ["Luck", "Team", "Attitude"];

//   $("#categories")
//     .autocomplete({
//       source: categories,
//       minLength: 0,
//       scroll: true,
//     })
//     .focus(function () {
//       $(this).autocomplete("search", "");
//     });
// }

//=============Search Post By Category or Show All post=======================



//=============Template to create the cards=======================

const createBlogCard = (
  coverImg,
  title,
  content,
  likes,
  comments,
  createdAt,
  author
) => {
  return `
  <div class="col-lg-3 col-md-6 col-sm-12 mx-0 mb-4">
  <div class="card mx-0">
  <img class="card-img-top" src="${coverImg}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${content}
    <a href="#">read more...</a></p>
  </div>
  <div class="card-footer">
    <small class="text-muted"><i class="fa fa-thumbs-up"></i>${likes} Likes</small>&nbsp;&nbsp;&nbsp;
    <small class="text-muted"><i class="fa fa-comment"></i>${comments} Comments</small><br>
    <small class="text-muted"> Created on: <span>${createdAt}</span> by ${author}</small><br>
    <small class="text-muted"> Categoery: <span>#Love</span></small>
  </div>
</div>
</div>`;
};

function getPosts(category) {
  //change the url according to category filter
  const url = postCategory
    ? baseUrl + "posts?category=" + category
    : baseUrl + "posts";
  console.log(url);

  console.log("getting post by category...");
  $.ajax({
    type: "GET",
    url: url,
    success: (resp) => {
      console.log(resp);
      resp.forEach((element) => {

        $(".card-deck").append(
          createBlogCard(
            element.url,
            element.postTitle,
            element.content,
            0,

            element.postDate,
            element.userId
          )
        );
      });
    },
    error: function () {
      console.log("error");
    },
  });
}

//==============Add Post=================================================
function addPost() {
  var data = new Object();
  data.postTitle = $("#title").val();
  data.content = ($("#txtEditor").Editor("getText"));
  data.category = $('#selected_option :selected').text();
  console.log(data.postTitle, data.content, data.category);
  $.ajax(
    {
      type: 'POST',
      url: 'http://localhost:3000/posts',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        getAllPost();
        console.log("added succesfully");
      },
      error: function () {
        console.log("error");
      }
    }
  );
}
