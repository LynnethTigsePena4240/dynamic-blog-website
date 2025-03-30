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
        posts.forEach(post => {
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

document.addEventListener("DOMContentLoaded", function()
{   

    let posts = JSON.parse(localStorage.getItem("blogPosts")) || []
    const view_postText = document.getElementById("view-edit-post")
    const params = new URLSearchParams(window.location.search)
    const postID = parseInt(params.get("id"))

    
    if (posts.length === 0)
        {
            view_postText.innerHTML = "<p> No blog post found </p>"
        }
        else
        {
            view_postText.innerHTML = ""
            posts.forEach(post => {
                view_postText.innerHTML += `
                <div class="post">
                <h2> ${post.title} </h2>
                <p> ${post.content}</p>
                <button onclick="editPost(${post.id})">Edit</button>
                </div>`
            });
        }

        if(postID)
        {
            let post = posts.find(p => p.id === postID)
            if(!post)
            {
                document.getElementById("edit-form-div").innerHTML = "<p> post not found </p>"
                return
            }

            document.getElementById("postID").value = post.id
            document.getElementById("title").value = post.title
            document.getElementById("content").value = post.content
            //this is to set the title and content of the post from the post id 
            
        }
    })

    function editPost(postId)
    {
        window.location.href = `post.html?id=${postId}`
    }

    function updatePost()
    {
        const postID = parseInt(document.getElementById("postID").value)
        let posts = JSON.parse(localStorage.getItem("blogPosts")) || []
        let postIndex = posts.findInxed(p => p.id === postID)

        if(postIndex === -1)
        {
            alert("post not found")
            return
        }

        posts[postIndex].title = document.getElementById("title").value
        posts[postIndex].content = document.getElementById("content").value

        localStorage.setItem("blogPosts", JSON.stringify(posts))
    }
