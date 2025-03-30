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
})

document.addEventListener("DOMContentLoaded", function()
{
    const params = new URLSearchParams(window.location.search)
    const postID = parseInt(params.get("id"))

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || []
    let post = posts.find(p=>p.id === postID)

    if(!post)
    {
        
    }
})