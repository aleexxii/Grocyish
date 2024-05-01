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
        const categoryId = document.getElementById('categoryId').value
    
        const fileInput = document.getElementById('fileInput');
        let imageFile = fileInput.files
    
    
        console.log(imageFile , 'image file');
        try {
            const formData = new FormData();
            formData.append('categoryName' , categoryName)
            formData.append('slug' , slug)
            formData.append('parentCategory' , parentCategory)
            formData.append('date' , date)
            formData.append('status' , status)
            formData.append('metaTitle' , metaTitle)
            formData.append('metaDescription' , metaDescription)
            formData.append('description' , description)
    
            if (fileInput.files.length > 0) {
                formData.append('file', fileInput.files[0]);
            }
            fetch(`/admin/edit-category?categoryId=${categoryId}`, {
                method: "POST",
                body: formData
            })
            .then(response => {
                console.log(response,'<----response');
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                // Handle success response
                console.log(data);
                if(data.existingCategoryError){
                    document.getElementById('existingCategoryError').innerHTML = data.existingCategoryError
                }else if (data.Error) {
                    document.getElementById('errorMessage').innerHTML = data.Error 
                    document.getElementById('errorMessage').focus()
                }
                if(data.redirect){
                    window.location.href = data.redirect
                }
                 
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching data:", error);
                
            });
        } catch (error) {
            console.log(error);
        }
    });
    })
    
    