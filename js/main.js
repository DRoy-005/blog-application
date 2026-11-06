
/* ==========================================
   BLOGSPACE - MAIN JAVASCRIPT
   Activities 4, 5 and 6
   Dynamic Rendering + LocalStorage + CRUD
========================================== */


/* ==========================================
   1. DEFAULT BLOG DATA
========================================== */

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
    },
    {
        id: 6,
        title: "My First Web Development Project",
        category: "Technology",
        description: "Building my first responsive website using HTML, CSS and JavaScript."
    },
    {
        id: 7,
        title: "Learning New Things",
        category: "Education",
        description: "Exploring new technologies and improving my development skills."
    }
];


/* ==========================================
   2. LOAD BLOGS FROM LOCALSTORAGE
========================================== */

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

    // Initialize default blogs for first-time visitors

    localStorage.setItem(
        "blogspace_blogs",
        JSON.stringify(defaultBlogs)
    );

    return [...defaultBlogs];
}


// Main blog array

let blogs = loadBlogs();


/* ==========================================
   3. SAVE BLOGS TO LOCALSTORAGE
========================================== */

function saveBlogs() {

    localStorage.setItem(
        "blogspace_blogs",
        JSON.stringify(blogs)
    );

    console.log("Blogs saved successfully!");

}


/* ==========================================
   4. SELECT HTML ELEMENTS
========================================== */

const blogGrid = document.getElementById("blogGrid");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const emptyMessage = document.getElementById("emptyMessage");

const blogForm = document.getElementById("blogForm");

const blogTitle = document.getElementById("blogTitle");

const blogCategory = document.getElementById("blogCategory");

const blogDescription = document.getElementById("blogDescription");

const editorTitle = document.getElementById("editorTitle");

const saveBlogBtn = document.getElementById("saveBlogBtn");

const cancelEditBtn = document.getElementById("cancelEditBtn");

const blogEditor = document.getElementById("blogEditor");

const exploreButton = document.getElementById("exploreBtn");

let editingBlogId = null;


/* ==========================================
   5. READ - DISPLAY BLOGS DYNAMICALLY
========================================== */

function displayBlogs(blogList) {

    if (!blogGrid) return;

    // Clear previous blog cards

    blogGrid.replaceChildren();

    // Check if blogs exist

    if (blogList.length === 0) {

        if (emptyMessage) {
            emptyMessage.hidden = false;
        }

        return;
    }

    if (emptyMessage) {
        emptyMessage.hidden = true;
    }


    // Generate each blog card

    blogList.forEach(function(blog) {

        const card = document.createElement("article");

        card.className = "blog-card";


        // Card content

        const content = document.createElement("div");

        content.className = "card-content";


        // Category

        const category = document.createElement("span");

        category.className = "category";

        category.textContent = blog.category;


        // Title

        const title = document.createElement("h3");

        title.textContent = blog.title;


        // Description

        const description = document.createElement("p");

        description.textContent = blog.description;


        // Action buttons

        const actions = document.createElement("div");

        actions.className = "card-actions";


        // Edit button

        const editButton = document.createElement("button");

        editButton.className = "edit-btn";

        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {

            editBlog(blog.id);

        });


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            deleteBlog(blog.id);

        });


        // Append elements

        actions.append(editButton, deleteButton);

        content.append(
            category,
            title,
            description,
            actions
        );

        card.appendChild(content);

        blogGrid.appendChild(card);

    });

}


/* ==========================================
   6. CREATE - ADD A NEW BLOG
========================================== */

function addBlog(title, category, description) {

    const newBlog = {

        id: Date.now(),

        title: title,

        category: category,

        description: description

    };


    // Add new blog at the beginning

    blogs.unshift(newBlog);


    // Save changes

    saveBlogs();


    // Refresh displayed blogs

    filterBlogs();

}


/* ==========================================
   7. UPDATE - EDIT AN EXISTING BLOG
========================================== */

function editBlog(id) {

    const blog = blogs.find(function(item) {

        return item.id === id;

    });


    if (!blog) return;


    // Store the ID of the blog being edited

    editingBlogId = id;


    // Fill form with existing blog information

    blogTitle.value = blog.title;

    blogCategory.value = blog.category;

    blogDescription.value = blog.description;


    // Change form heading and button

    editorTitle.textContent = "Edit Blog";

    saveBlogBtn.textContent = "Update Blog";


    // Scroll to editor

    blogEditor.scrollIntoView({

        behavior: "smooth"

    });

}


/* ==========================================
   8. DELETE - REMOVE A BLOG
========================================== */

function deleteBlog(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this blog?"
    );


    if (!confirmed) return;


    // Remove selected blog

    blogs = blogs.filter(function(blog) {

        return blog.id !== id;

    });


    // Save updated array

    saveBlogs();


    // Refresh the page content

    filterBlogs();


    // Reset editor if the deleted blog was being edited

    if (editingBlogId === id) {

        resetBlogForm();

    }


    console.log("Blog deleted successfully!");

}


/* ==========================================
   9. RESET BLOG FORM
========================================== */

function resetBlogForm() {

    if (!blogForm) return;


    blogForm.reset();


    editingBlogId = null;


    editorTitle.textContent = "Create a New Blog";

    saveBlogBtn.textContent = "Publish Blog";

}


/* ==========================================
   10. CREATE AND UPDATE FORM SUBMISSION
========================================== */

if (blogForm) {

    blogForm.addEventListener("submit", function(event) {

        event.preventDefault();


        // Get form values

        const title = blogTitle.value.trim();

        const category = blogCategory.value;

        const description = blogDescription.value.trim();


        // Validate inputs

        if (
            title.length < 3 ||
            !category ||
            description.length < 10
        ) {

            alert(
                "Please enter a valid title, category and description."
            );

            return;

        }


        // UPDATE EXISTING BLOG

        if (editingBlogId !== null) {

            blogs = blogs.map(function(blog) {

                if (blog.id === editingBlogId) {

                    return {

                        ...blog,

                        title: title,

                        category: category,

                        description: description

                    };

                }

                return blog;

            });


            saveBlogs();

            filterBlogs();


            alert("Blog updated successfully!");

        }


        // CREATE NEW BLOG

        else {

            addBlog(
                title,
                category,
                description
            );


            alert("Blog published successfully!");

        }


        // Reset form after submission

        resetBlogForm();

    });

}


/* ==========================================
   11. CANCEL EDITING
========================================== */

if (cancelEditBtn) {

    cancelEditBtn.addEventListener("click", function() {

        resetBlogForm();

    });

}


/* ==========================================
   12. SEARCH AND CATEGORY FILTER
========================================== */

function filterBlogs() {

    if (!searchInput || !categoryFilter) return;


    const searchText = searchInput.value
        .toLowerCase()
        .trim();


    const selectedCategory = categoryFilter.value;


    const filteredBlogs = blogs.filter(function(blog) {

        // Search by title or description

        const matchesSearch =

            blog.title.toLowerCase().includes(searchText) ||

            blog.description.toLowerCase().includes(searchText);


        // Filter by category

        const matchesCategory =

            selectedCategory === "All" ||

            blog.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    displayBlogs(filteredBlogs);

}


/* ==========================================
   13. SEARCH EVENT LISTENER
========================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterBlogs
    );

}


/* ==========================================
   14. CATEGORY FILTER EVENT LISTENER
========================================== */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterBlogs
    );

}


/* ==========================================
   15. EXPLORE BLOGS BUTTON
========================================== */

if (exploreButton && blogGrid) {

    exploreButton.addEventListener("click", function() {

        const blogsSection = document.getElementById("blogs");

        if (blogsSection) {

            blogsSection.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}


/* ==========================================
   16. INITIALIZE APPLICATION
========================================== */

if (blogGrid) {

    displayBlogs(blogs);

}

console.log("BlogSpace application initialized successfully!");
