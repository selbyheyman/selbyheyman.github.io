async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) return;

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Unable to load ${file}`);
        }

        element.innerHTML = await response.text();
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Load shared components
    loadComponent("head-placeholder", "components/head.html");
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");

    // Load recent posts only if this page has the section
    loadRecentPosts();
});

async function loadRecentPosts() {
    const container = document.getElementById("recent-posts");

    // Only run on pages that have Recent Posts
    if (!container) return;

    try {
        const response = await fetch("assets/data/posts.json");

        if (!response.ok) {
            throw new Error("Unable to load posts.json");
        }

        const posts = await response.json();

        // Sort newest first
        posts.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        // Display newest 3 posts
        posts.slice(0, 3).forEach(post => {
            container.innerHTML += createPostCard(post);
        });

    } catch (err) {
        console.error(err);
    }
}


function createPostCard(post) {
    return `
        <div class="col-md-4">

            <div class="card mb-4 h-100 shadow-sm">

                ${post.image ? `
                <img src="${post.image}"
                     class="card-img-top"
                     alt="">
                ` : ""}

                <div class="card-body">

                    <small class="text-muted">
                        ${formatCategory(post.category)}
                    </small>

                    <h5 class="card-title mt-2">
                        ${post.title}
                    </h5>

                    <p class="card-text">
                        ${post.description}
                    </p>

                    <a href="${post.url}"
                       class="btn btn-primary">
                        Read More
                    </a>

                </div>

                <div class="card-footer text-muted">
                    ${post.date}
                </div>

            </div>

        </div>
    `;
}


function formatCategory(category) {
    if (!category) return "";

    return category
        .replace("-", " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}
