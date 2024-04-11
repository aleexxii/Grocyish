// document.getElementById("createProduct").addEventListener("click", async () => {
//   console.log("button click aayi");

//   const product_name = document.getElementById("productName").value.trim();
//   const category = document.getElementById("selectedCategory").value;
//   const weight = document.getElementById("itemWeight").value.trim();
//   const units = document.getElementById("selectUnites").value;
//   const product_Code = document.getElementById("product_Code").value;
//   const sku = document.getElementById("stock_keeping_unit").value;
//   const regular_price = document.getElementById("regular_price").value;
//   const sale_price = document.getElementById("sale_price").value;
//   const meta_title = document.getElementById("meta_title").value;
//   const meta_description = document.getElementById("meta_description").value;

//   const productName_error = document.getElementById("productName_error");
//   const category_error = document.getElementById("category_error");
//   const weight_error = document.getElementById("weight_error");
//   const select_units_error = document.getElementById("select_units_error");
//   const image_error = document.getElementById("image_error");
//   const regular_price_error = document.getElementById("regular_price_error");
//   const sale_price_error = document.getElementById("sale_price_error");

//   productName_error.innerHTML = "";
//   category_error.innerHTML = "";
//   weight_error.innerHTML = "";
//   select_units_error.innerHTML = "";
//   image_error.innerHTML = "";
//   regular_price_error.innerHTML = "";
//   sale_price_error.innerHTML = "";

//   if (product_name === "") {
//     productName_error.innerHTML = "Please fill the product name";
//     document.getElementById("productName").focus();
//     return;
//   }
//   if (category === "Product Category") {
//     category_error.innerHTML = "Please select a category";
//     document.getElementById("selectedCategory").focus();
//     return;
//   }
//   if (weight === "" || isNaN(parseFloat(weight)) || parseFloat(weight) <= 0) {
//     weight_error.innerHTML = "Please enter a valid weight";
//     document.getElementById("itemWeight").focus();
//     return;
//   }
//   if (units === "Select Units") {
//     select_units_error.innerHTML = "Please select a unit";
//     document.getElementById("selectUnites").focus();
//     return;
//   }
//   const files = myDropzone.getAcceptedFiles();
//   if (files.length === 0) {
//     image_error.innerHTML = "Please upload an image";
//     return;
//   }
//   const image = files[0];

//   const price_regex = /^\d+(\.\d{1,2})?$/;
//   if (!price_regex.test(regular_price) || parseFloat(regular_price) <= 0) {
//     regular_price_error.innerHTML = "Please enter a valid positive price";
//     document.getElementById("regular_price").focus();
//     return;
//   }
//   if (!price_regex.test(sale_price) || parseFloat(sale_price) <= 0) {
//     sale_price_error.innerHTML = "Please enter a valid positive price";
//     document.getElementById("sale_price").focus();
//     return;
//   }

//   // Access the Quill editor's content
//   const description = quill.root.innerHTML;
//   // description = description.replace(/^<p>/, '');

//   const product_data = {
//     productName: product_name,
//     category: category,
//     weight: parseFloat(weight),
//     units: units,
//     productCode: product_Code,
//     productSKU: sku,
//     regularPrice: parseFloat(regular_price),
//     salePrice: parseFloat(sale_price),
//     metaTitle: meta_title,
//     metaDescription: meta_description,
//     description: description,
//     image: image,
//   };

//   try {
//     const response = await fetch("/admin/add-product", {
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product_data),
//     });
//     if (!response.ok) {
//       throw new Error("Something went wrong. Please try again");
//     } else {
//       const response_data = await response.json();
//       document.getElementById("response-message").innerHTML =
//         response_data.message;
//       location.reload();
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });



document.getElementById('createProduct').addEventListener('click', async function(event) {
  event.preventDefault();

  // Get input values
  let productName = document.getElementById('productName').value;
  let selectedCategory = document.getElementById('selectedCategory').value;
  let itemWeight = document.getElementById('itemWeight').value;
  let selectUnites = document.getElementById('selectUnites').value;
  let product_Code = document.getElementById('product_Code').value;
  let stock_keeping_unit = document.getElementById('stock_keeping_unit').value;
  let regular_price = document.getElementById('regular_price').value;
  let sale_price = document.getElementById('sale_price').value;
  let meta_title = document.getElementById('meta_title').value;
  let meta_description = document.getElementById('meta_description').value;

  // Perform basic validation
  if (!productName.trim() || selectedCategory === 'Product Category' || !itemWeight.trim() || selectUnites === 'Select Units' || !product_Code.trim() || !stock_keeping_unit.trim() || !regular_price.trim() || !sale_price.trim()) {
      // Show error message if any required field is empty
      document.getElementById('response-message').innerText = 'Please fill in all the required fields.';
      return;
  }

  try {
      // Make API call to create product
      const response = await fetch('/admin/add-product', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              productName,
              selectedCategory,
              itemWeight,
              selectUnites,
              product_Code,
              stock_keeping_unit,
              regular_price,
              sale_price,
              meta_title,
              meta_description
          })
      });

      const data = await response.json();

      console.log('this is data ' , data);

      if (response.ok) {
          // Redirect to products page on success
          window.location.href = './products';
      } else {
          // Show error message if API call fails
          document.getElementById('response-message').innerText = data.message || 'Failed to create product. Please try again.';
      }
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('response-message').innerText = 'An unexpected error occurred. Please try again.';
  }
});
