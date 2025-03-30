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
            document.getElementById("blog_title").value = post.title
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
        let postIndex = posts.findIndex(p => p.id === postID)

        if(postIndex === -1)
        {
            alert("post not found")
            return
        }

        posts[postIndex].title = document.getElementById("title").value
        posts[postIndex].content = document.getElementById("content").value

        localStorage.setItem("blogPosts", JSON.stringify(posts))
    }
