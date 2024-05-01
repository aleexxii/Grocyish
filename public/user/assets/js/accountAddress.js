document.addEventListener('DOMContentLoaded' , ()=>{
    document.getElementById('saveBtn').addEventListener('click', async() => {
        const data = {
            Firstname : document.getElementById('firstname').value,
            Lastname : document.getElementById('lastname').value,
            Phone : document.getElementById('phone').value,
            Address : document.getElementById('address').value,
            State : document.getElementById('state').value,
            District : document.getElementById('district').value,
            City : document.getElementById('city').value,
            Pincode : document.getElementById('pincode').value,
            Landmark : document.getElementById('landmark').value
        }
    
        try {
            const response = await fetch ('/account-address' ,{
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            })
            if(!response){
                throw new Error('Failed to update address')
            }
            const resdata = await response.json()
            if(resdata.message){
                addressmsg.innerHTML = resdata.message
                window.location.href = resdata.redirect
            }
        } catch (error) {
            console.log(error);
        }
    
        
    })
})
