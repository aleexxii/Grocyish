
document.querySelectorAll('.addToCartBtn').forEach(btn =>{
    btn.addEventListener('click' , async function (){
        console.log('clicked the add to cart button');
        const productId = btn.parentNode.previousElementSibling.value
    console.log(productId , 'productId');
    
        try {
            const response = await fetch('/addToCart' , {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(productId)
            })
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
              }
          
              const data = await response.json();
              console.log(data.message); // Log the response message
            } catch (error) {
              console.error('Error:', error);
            }
    })
})
