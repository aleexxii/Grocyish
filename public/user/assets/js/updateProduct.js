document.getElementById("UpdateProduct").addEventListener("click", async () => {
    console.log("button click aayi");
  
    const product_name = document.getElementById("productName").value.trim();
    const category = document.getElementById("selectedCategory").value;
    const weight = document.getElementById("itemWeight").value.trim();
    const units = document.getElementById("selectUnites").value;
    const product_Code = document.getElementById("product_Code").value;
    const sku = document.getElementById("stock_keeping_unit").value;
    const regular_price = document.getElementById("regular_price").value;
    const sale_price = document.getElementById("sale_price").value;
    const meta_title = document.getElementById("meta_title").value;
    const meta_description = document.getElementById("meta_description").value;


    console.log(product_name);
    console.log(category);
    console.log(weight);
    console.log(units);
    console.log(product_Code);
    console.log(sku);
    console.log(regular_price);
    console.log(sale_price);
    console.log(meta_title);
    console.log(meta_description);
  
    const productName_error = document.getElementById("productName_error");
    const category_error = document.getElementById("category_error");
    const weight_error = document.getElementById("weight_error");
    const select_units_error = document.getElementById("select_units_error");
    // const image_error = document.getElementById("image_error");
    const regular_price_error = document.getElementById("regular_price_error");
    const sale_price_error = document.getElementById("sale_price_error");
    const productId = document.getElementById("idField").value;
    
    
  
    productName_error.innerHTML = "";
    category_error.innerHTML = "";
    weight_error.innerHTML = "";
    select_units_error.innerHTML = "";
    // image_error.innerHTML = "";
    regular_price_error.innerHTML = "";
    sale_price_error.innerHTML = "";
  
    if (product_name === "") {
      productName_error.innerHTML = "Please fill the product name";
      document.getElementById("productName").focus();
      return;
    }
    if (category === "Product Category") {
      category_error.innerHTML = "Please select a category";
      document.getElementById("selectedCategory").focus();
      return;
    }
    if (weight === "" || isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) {
      weight_error.innerHTML = "Please enter a valid weight";
      document.getElementById("itemWeight").focus();
      return;
    }
    if (units === "Select Units") {
      select_units_error.innerHTML = "Please select a unit";
      document.getElementById("selectUnites").focus();
      return;
    }
   
  
    const price_regex = /^\d+(\.\d{1,2})?$/;
    if (!price_regex.test(regular_price) || parseFloat(regular_price) <= 0) {
      regular_price_error.innerHTML = "Please enter a valid positive price";
      document.getElementById("regular_price").focus();
      return;
    }
    if (!price_regex.test(sale_price) || parseFloat(sale_price) <= 0) {
      sale_price_error.innerHTML = "Please enter a valid positive price";
      document.getElementById("sale_price").focus();
      return;
    }
  
    const fileInput = document.querySelectorAll('#imageInput');
    console.log(typeof fileInput , 'file input image');
    const imageFiles = []
//  fileInput.forEach((image)=>{
//  imageFiles.push(image.files)
// })
fileInput.forEach((input) => {
  Array.from(input.files).forEach((file) => {
      imageFiles.push(file);
  });
});
console.log(imageFiles , 'file input files');




    // Access the Quill editor's content
    const description = quill.root.innerHTML;
    // description = description.replace(/^<p>/, '');

    try {

      const formData = new FormData()
      formData.append('productName' , product_name )
      formData.append('category' , category )
      formData.append('weight' , parseFloat(weight) )
      formData.append('units' , units )
      formData.append('productSKU' , sku )
      formData.append('productCode' , product_Code )
      formData.append('regularPrice' , parseFloat(regular_price) )
      formData.append('salePrice' , parseFloat(sale_price) )
      formData.append('metaTitle' , meta_title )
      formData.append('metaDescription' , meta_description )
      formData.append('description' , description )


      for (let i = 0; i < imageFiles.length; i++) {
        formData.append('files', imageFiles[i]);
    }
    console.log([...formData.entries()]);  // Log FormData entries
    console.log(imageFiles); 



      const response = await fetch(`/admin/update-product?productId=${productId}`, {
        method: "post",
        body: formData
      });
      if (!response.ok) {
        throw new Error("Something went wrong. Please try again");
      } else {
        const response_data = await response.json();
        console.log('aaaaaa',response_data);
        // window.location.href = response_data.redirect
      }
    } catch (error) {
        document.getElementById("response-message").innerHTML = error
      console.log(error);
    }
  });
  