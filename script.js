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