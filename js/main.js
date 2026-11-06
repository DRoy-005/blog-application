
const exploreButton = document.getElementById("exploreBtn");
const blogsSection = document.getElementById("blogs");

exploreButton.addEventListener("click", function () {
    blogsSection.scrollIntoView({
        behavior: "smooth"
    });
});
