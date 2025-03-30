//---------------------------------Homepage-------------------------------------
document.addEventListener("DOMContentLoaded", function(){
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || []
    const postText = document.getElementById("posts-list")

    if (posts.length === 0)
    {
        postText.innerHTML = "<p> No blog post found </p>"
    }
    else
    {
        postText.innerHTML = ""
        posts.posts.forEach(post => {
            postText.innerHTML += `
            <div class="post">
            <h2> ${post.title} </h2>
            <p> ${post.content}</p>
            </div>`
        });
    }
})
//-------------------------------New Post Page----------------------------------
const form = document.getElementById("create_post")
const titleInput = document.getElementById("blog_title")
const contentInput = document.getElementById("content")
const submitbtn = document.getElementById("submit_btn") 

const titleErr = document.getElementById("title_error")
const contentErr = document.getElementById("content_error")


form.addEventListener("submit", function(event)
{

    titleErr.textContent = "";
    contentErr.textContent = "";

    let isVaild = true;
    
    if(titleInput.value.trim() === "")
    {
        titleErr.textContent = "Please enter Blog Title"
        isVaild = false;
    }

    if(contentInput.value.trim() === "")
        {
            contentErr.textContent = "Please Enter Blog Content"
            isVaild = false;
        }

    if (!isVaild)
        {
            event.preventDefault();
        }

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || []
    let newPost = {
        id: posts.length > 0 ? posts[posts.length -1].id + 1: 1,
        title:  titleInput.value,
        content: contentInput.value
    }

    posts.push(newPost)
    localStorage.setItem("blogPosts", JSON.stringify(posts))
})

//---------------------------------Post Page-----------------------------------
