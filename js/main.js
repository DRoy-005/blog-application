
/* =====================================================
   BLOGSPACE - MAIN JAVASCRIPT
   Day 1: Activities 1-4
   Day 2: Activities 5-7

   Features:
   1. Dynamic Blog Rendering
   2. LocalStorage Persistence
   3. CRUD Operations
   4. Search and Category Filtering
   5. Event Delegation
   6. User Feedback Messages
   7. Keyboard Interactions
   8. Form Validation
===================================================== */


/* =====================================================
   1. DEFAULT BLOG DATA
===================================================== */

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


/* =====================================================
   2. LOAD BLOGS FROM LOCALSTORAGE
===================================================== */

function loadBlogs() {

    const savedBlogs = localStorage.getItem("blogspace_blogs");

    if (savedBlogs !== null) {

        try {

            const parsedBlogs = JSON.parse(savedBlogs);

            if (Array.isArray(parsedBlogs)) {
                return parsedBlogs;
            }

            console.warn("Invalid blog data. Loading default blogs.");

        } catch (error) {

            console.error("Error loading blogs:", error);

        }
    }

    localStorage.setItem(
        "blogspace_blogs",
        JSON.stringify(defaultBlogs)
    );

    return [...defaultBlogs];
}


// Main blog array

let blogs = loadBlogs();


/* =====================================================
   3. SAVE BLOGS TO LOCALSTORAGE
===================================================== */

function saveBlogs() {

    try {

        localStorage.setItem(
            "blogspace_blogs",
            JSON.stringify(blogs)
        );

        console.log("Blogs saved successfully!");

    } catch (error) {

        console.error("Error saving blogs:", error);

        showMessage(
            "Unable to save blog data. Please check browser storage.",
            "error"
        );

    }

}


/* =====================================================
   4. SELECT HTML ELEMENTS
===================================================== */

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

const statusMessage = document.getElementById("statusMessage");


// Track currently edited blog

let editingBlogId = null;


/* =====================================================
   5. USER FEEDBACK FUNCTION
===================================================== */

function showMessage(message, type = "success") {

    if (!statusMessage) return;

    statusMessage.textContent = message;

    statusMessage.className = "status-message " + type;

}


/* =====================================================
   6. READ - DISPLAY BLOGS DYNAMICALLY
===================================================== */

function displayBlogs(blogList) {

    if (!blogGrid) return;

    // Clear previous cards

    blogGrid.replaceChildren();


    // Handle empty results

    if (blogList.length === 0) {

        if (emptyMessage) {
            emptyMessage.hidden = false;
        }

        return;

    }

    if (emptyMessage) {
        emptyMessage.hidden = true;
    }


    // Create blog cards

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


        // Action container

        const actions = document.createElement("div");

        actions.className = "card-actions";


        // Edit button

        const editButton = document.createElement("button");

        editButton.type = "button";

        editButton.className = "edit-btn";

        editButton.textContent = "Edit";

        editButton.dataset.action = "edit";

        editButton.dataset.id = blog.id;


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "Delete";

        deleteButton.dataset.action = "delete";

        deleteButton.dataset.id = blog.id;


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


/* =====================================================
   7. CREATE - ADD A NEW BLOG
===================================================== */

function addBlog(title, category, description) {

    const newBlog = {

        id: Date.now(),

        title: title,

        category: category,

        description: description

    };


    // Add blog to beginning of array

    blogs.unshift(newBlog);


    // Save and refresh

    saveBlogs();

    filterBlogs();


    showMessage(
        "Blog published successfully!",
        "success"
    );

}


/* =====================================================
   8. UPDATE - EDIT AN EXISTING BLOG
===================================================== */

function editBlog(id) {

    const blog = blogs.find(function(item) {

        return item.id === id;

    });


    if (!blog) {

        showMessage("Blog not found.", "error");

        return;

    }


    // Store editing ID

    editingBlogId = id;


    // Populate form

    blogTitle.value = blog.title;

    blogCategory.value = blog.category;

    blogDescription.value = blog.description;


    // Update form heading and button

    editorTitle.textContent = "Edit Blog";

    saveBlogBtn.textContent = "Update Blog";


    // Scroll to editor

    blogEditor.scrollIntoView({

        behavior: "smooth"

    });

    blogTitle.focus();

}


/* =====================================================
   9. DELETE - REMOVE A BLOG
===================================================== */

function deleteBlog(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this blog?"
    );


    if (!confirmed) return;


    // Remove selected blog

    blogs = blogs.filter(function(blog) {

        return blog.id !== id;

    });


    // Save updated data

    saveBlogs();

    filterBlogs();


    // Reset editor if deleted blog was being edited

    if (editingBlogId === id) {

        resetBlogForm();

    }


    showMessage(
        "Blog deleted successfully!",
        "success"
    );

}


/* =====================================================
   10. RESET BLOG FORM
===================================================== */

function resetBlogForm() {

    if (!blogForm) return;


    blogForm.reset();

    editingBlogId = null;


    editorTitle.textContent = "Create a New Blog";

    saveBlogBtn.textContent = "Publish Blog";

}


/* =====================================================
   11. CREATE AND UPDATE FORM SUBMISSION
===================================================== */

if (blogForm) {

    blogForm.addEventListener("submit", function(event) {

        event.preventDefault();


        // Get input values

        const title = blogTitle.value.trim();

        const category = blogCategory.value;

        const description = blogDescription.value.trim();


        // TITLE VALIDATION

        if (title.length < 3) {

            showMessage(
                "Blog title must contain at least 3 characters.",
                "error"
            );

            blogTitle.focus();

            return;

        }


        // CATEGORY VALIDATION

        if (!category) {

            showMessage(
                "Please select a blog category.",
                "error"
            );

            blogCategory.focus();

            return;

        }


        // DESCRIPTION VALIDATION

        if (description.length < 10) {

            showMessage(
                "Description must contain at least 10 characters.",
                "error"
            );

            blogDescription.focus();

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


            showMessage(
                "Blog updated successfully!",
                "success"
            );

        }


        // CREATE NEW BLOG

        else {

            addBlog(
                title,
                category,
                description
            );

        }


        // Reset form

        resetBlogForm();

    });

}


/* =====================================================
   12. CANCEL EDITING
===================================================== */

if (cancelEditBtn) {

    cancelEditBtn.addEventListener("click", function() {

        resetBlogForm();

        showMessage(
            "Editing cancelled.",
            "success"
        );

    });

}


/* =====================================================
   13. EVENT DELEGATION
===================================================== */

if (blogGrid) {

    blogGrid.addEventListener("click", function(event) {

        // Find clicked action button

        const button = event.target.closest(
            "button[data-action]"
        );


        // Ignore other clicks

        if (!button || !blogGrid.contains(button)) {

            return;

        }


        // Get action and blog ID

        const action = button.dataset.action;

        const id = Number(button.dataset.id);


        // Handle actions

        if (action === "edit") {

            editBlog(id);

        }

        else if (action === "delete") {

            deleteBlog(id);

        }

    });

}


/* =====================================================
   14. SEARCH AND CATEGORY FILTER
===================================================== */

function filterBlogs() {

    if (!searchInput || !categoryFilter) return;


    const searchText = searchInput.value
        .toLowerCase()
        .trim();


    const selectedCategory = categoryFilter.value;


    const filteredBlogs = blogs.filter(function(blog) {

        // Match title or description

        const matchesSearch =

            blog.title.toLowerCase().includes(searchText) ||

            blog.description.toLowerCase().includes(searchText);


        // Match selected category

        const matchesCategory =

            selectedCategory === "All" ||

            blog.category === selectedCategory;


        return matchesSearch && matchesCategory;

    });


    displayBlogs(filteredBlogs);

}


/* =====================================================
   15. SEARCH EVENT LISTENER
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterBlogs
    );

}


/* =====================================================
   16. CATEGORY FILTER EVENT LISTENER
===================================================== */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterBlogs
    );

}


/* =====================================================
   17. KEYBOARD EVENT HANDLING
===================================================== */

document.addEventListener("keydown", function(event) {

    // Escape cancels editing

    if (
        event.key === "Escape" &&
        editingBlogId !== null
    ) {

        resetBlogForm();

        showMessage(
            "Editing cancelled.",
            "success"
        );

    }

});


/* =====================================================
   18. EXPLORE BLOGS BUTTON
===================================================== */

if (exploreButton) {

    exploreButton.addEventListener("click", function() {

        const blogsSection = document.getElementById("blogs");

        if (blogsSection) {

            blogsSection.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

}


/* =====================================================
   19. INITIALIZE APPLICATION
===================================================== */

if (blogGrid) {

    displayBlogs(blogs);

}


console.log(
    "BlogSpace initialized successfully!"
);
