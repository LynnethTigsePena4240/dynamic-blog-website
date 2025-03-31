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
                ${post.image ? `<img src="${post.image}"style="max-width: 100px">`:""}
                <br>
                <button onclick="editPost(${post.id})">Edit</button>
                <button onclick="deletePost(${post.id})">Delete</button>
                </div>
                <br>`
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
            document.getElementById("blog_title").value = post.title
            document.getElementById("content").value = post.content
            //this is to set the title and content of the post from the post id 
            
        }

    document.getElementById("edit_post").addEventListener("submit", function(event)
{
    const titleInput = document.getElementById("blog_title")
    const contentInput = document.getElementById("content")
    const submitbtn = document.getElementById("submit_btn")
    let postID = document.getElementById("postID").value
    
    const titleErr = document.getElementById("title_error")
    const contentErr = document.getElementById("content_error")

    const imageInput = document.getElementById("Image")


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

    let updatePosts = posts.map(post =>
    {
        if (post.id === parseInt(postID))
        {
            post.title = titleInput.value
            post.content = contentInput.value
            post.image = imageInput.value
        }
        return post
    })

    localStorage.setItem("blogPosts", JSON.stringify(updatePosts))

})

})

function editPost(postId)
{
    window.location.href = `post.html?id=${postId}`
}

function deletePost(postId)
{
    let posts = JSON.parse(localStorage.getItem("blogPosts")) || []
    let updatePosts = posts.filter(post => post.id !== postId)

    localStorage.setItem("blogPosts", JSON.stringify(updatePosts))

    location.reload();
}