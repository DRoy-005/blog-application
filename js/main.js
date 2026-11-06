
// SAMPLE BLOG DATA


// DEFAULT BLOG DATA

const defaultBlogs = [
    {
        id: 1,
        title: "A Day in Kolkata",
        category: "Travel",
        description: "Exploring the culture, food, and vibe of Kolkata."
    },
    {
        id: 2,
        title: "Weekend in the Hills",
        category: "Lifestyle",
        description: "A short escape to the mountains."
    },
    {
        id: 3,
        title: "My Developer Journey",
        category: "Technology",
        description: "From writing my first line of code to building projects."
    },
    {
        id: 4,
        title: "Learning JavaScript",
        category: "Technology",
        description: "My experience learning JavaScript fundamentals."
    },
    {
        id: 5,
        title: "A Healthy Lifestyle",
        category: "Lifestyle",
        description: "Simple habits that make everyday life better."
    }
];


// LOAD BLOGS FROM LOCALSTORAGE

function loadBlogs() {

    const savedBlogs = localStorage.getItem("blogspace_blogs");

    if (savedBlogs !== null) {

        try {
            const parsedBlogs = JSON.parse(savedBlogs);

            if (Array.isArray(parsedBlogs)) {
                return parsedBlogs;
            }

        } catch (error) {
            console.error("Error loading blogs:", error);
        }
    }

    // First-time initialization
    localStorage.setItem(
        "blogspace_blogs",
        JSON.stringify(defaultBlogs)
    );

    return [...defaultBlogs];
}


// MAIN BLOG ARRAY

let blogs = loadBlogs();


// SAVE BLOGS TO LOCALSTORAGE

function saveBlogs() {

    localStorage.setItem(
        "blogspace_blogs",
        JSON.stringify(blogs)
    );

    console.log("Blogs saved successfully!");
}



// SELECT HTML ELEMENTS

const blogGrid = document.getElementById("blogGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const emptyMessage = document.getElementById("emptyMessage");


// DISPLAY BLOGS

function displayBlogs(blogList) {

    blogGrid.replaceChildren();

    if (blogList.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    blogList.forEach(function(blog) {

        const card = document.createElement("article");
        card.className = "blog-card";

        const content = document.createElement("div");
        content.className = "card-content";

        const category = document.createElement("span");
        category.className = "category";
        category.textContent = blog.category;

        const title = document.createElement("h3");
        title.textContent = blog.title;

        const description = document.createElement("p");
        description.textContent = blog.description;

        const readMore = document.createElement("a");
        readMore.href = "#";
        readMore.className = "read-more";
        readMore.textContent = "Read More →";

        content.append(
            category,
            title,
            description,
            readMore
        );

        card.appendChild(content);

        blogGrid.appendChild(card);
    });
}


// SEARCH AND FILTER BLOGS

function filterBlogs() {

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedCategory = categoryFilter.value;

    const filteredBlogs = blogs.filter(function(blog) {

        const matchesSearch =
            blog.title.toLowerCase().includes(searchText) ||
            blog.description.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            blog.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBlogs(filteredBlogs);
}


// EVENT LISTENERS

if (blogGrid && searchInput && categoryFilter) {

    displayBlogs(blogs);

    searchInput.addEventListener("input", filterBlogs);

    categoryFilter.addEventListener("change", filterBlogs);
}


// EXPLORE BLOGS BUTTON

const exploreButton = document.getElementById("exploreBtn");
const blogsSection = document.getElementById("blogs");

if (exploreButton && blogsSection) {

    exploreButton.addEventListener("click", function() {

        blogsSection.scrollIntoView({
            behavior: "smooth"
        });

    });
}
