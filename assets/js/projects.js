async function loadProjects() {

    try {
        const response = await fetch("assets/data/posts.json");

        if (!response.ok) {
            throw new Error("Unable to load posts.json");
        }

        const posts = await response.json();

        const projects = posts.filter(post =>
            post.type === "project"
        );

        projects.forEach(project => {
            const card = createPostCard(project);

            switch(project.category) {
                case "video-game":
                    document.getElementById("video-game-projects").innerHTML += card;
                    break;

                case "homelab":
                    document.getElementById("homelab-projects").innerHTML += card;
                    break;
            }
        });
        
    } catch(err) {
        console.error(err);
    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadProjects
);
