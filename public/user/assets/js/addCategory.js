document.addEventListener("DOMContentLoaded", function () {
document.getElementById('addCategorybtn').addEventListener('click',()=>{
    console.log('button click aayi');
    // Collect category data from input fields
    const categoryName = document.getElementById("categoryName").value;
    const slug = document.getElementById("slug").value;
    const parentCategory = document.getElementById("parentCategory").value;
    const date = document.getElementById("date").value;
    const description = document.getElementById("editor").innerHTML; // Assuming you're using an editor
    const status = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
    const metaTitle = document.getElementById("metaTitle").value;
    const metaDescription = document.getElementById("metaDescription").value;

    const categoryImage = document.getElementById('categoryImage').value

console.log(categoryImage,'category image');


    // Construct the category Object
    const categoryData = {
        categoryName: categoryName,
        slug: slug,
        parentCategory: parentCategory,
        date: date,
        description: description,
        status: status,
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        categoryImage : categoryImage
    };

    console.log('category data varunnundo nokk',categoryData);


     // Send an AJAX POST request to the backend to add the category
     fetch("/admin/add-category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        // Handle success response
        console.log(data);
        window.location.href = data.redirect
        // Optionally, perform any actions after successfully adding the category
    })
    .catch(error => {
        // Handle errors
        console.error("Error adding category:", error);
    });
});
})

