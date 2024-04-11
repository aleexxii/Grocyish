// document.getElementById('userBlock').addEventListener('click' , async ()=>{
//     const confirmBlock = confirm('Are you sure you want to block this user?');
//     if (!confirmBlock) return;

//     try {
//         // Here you need to send a request to your backend API to block the user
//         const response = await fetch('./block-user', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 userId: 'USER_ID_TO_BLOCK' // Replace 'USER_ID_TO_BLOCK' with the actual user ID
//             })
//         });

//         if (response.ok) {
//             alert('User blocked successfully');
//             // Optionally, you can refresh the page or update the UI to reflect the blocked status
//         } else {
//             throw new Error('Failed to block user');
//         }
//     } catch (error) {
//         console.error('Error blocking user:', error);
//         alert('An error occurred while blocking the user');
//     }
// })

// function blockUser(user) {
//     window.location.href = `/blockUser?userId=${user._id}`;
// }

// document.addEventListener("DOMContentLoaded", function() {
//     // Get all block and unblock buttons
//     const blockBtns = document.querySelectorAll("[id^='blockBtn_']");
//     const unblockBtns = document.querySelectorAll("[id^='unblockBtn_']");
    
//     // Add event listeners to block buttons
//     blockBtns.forEach(function(btn) {
//         btn.addEventListener("click", function(event) {
//             event.preventDefault();
//             const userId = btn.id.split("_")[1];
//             document.getElementById(`blockForm_${userId}`).style.display = "none";
//             document.getElementById(`unblockForm_${userId}`).style.display = "block";
//         });
//     });
    
//     // Add event listeners to unblock buttons
//     unblockBtns.forEach(function(btn) {
//         btn.addEventListener("click", function(event) {
//             event.preventDefault();
//             const userId = btn.id.split("_")[1];
//             document.getElementById(`unblockForm_${userId}`).style.display = "none";
//             document.getElementById(`blockForm_${userId}`).style.display = "block";
//         });
//     });
// });

// document.addEventListener("DOMContentLoaded", function() {
//     // Get all block and unblock buttons
//     const blockBtns = document.querySelectorAll("[id^='blockBtn_']");
//     const unblockBtns = document.querySelectorAll("[id^='unblockBtn_']");
    
//     // Add event listeners to block buttons
//     blockBtns.forEach(function(btn) {
//         btn.addEventListener("click", function(event) {
//             event.preventDefault();
//             const userId = btn.id.split("_")[1];
//             blockUser(userId);
//             document.getElementById(`blockForm_${userId}`).style.display = "none";
//             document.getElementById(`unblockForm_${userId}`).style.display = "block";
//         });
//     });
    
//     // Add event listeners to unblock buttons
//     unblockBtns.forEach(function(btn) {
//         btn.addEventListener("click", function(event) {
//             event.preventDefault();
//             const userId = btn.id.split("_")[1];
//             unblockUser(userId);
//             document.getElementById(`unblockForm_${userId}`).style.display = "none";
//             document.getElementById(`blockForm_${userId}`).style.display = "block";
//         });
//     });
// });

// // Function to block user
// function blockUser(userId) {
//     // Perform AJAX request or submit form to block user
//     // Example AJAX request using fetch API
//     fetch("./block-user", {
//         method: "POST",
//         body: JSON.stringify({ userId: userId }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Failed to block user");
//         }
//         console.log("User blocked successfully");
//     })
//     .catch(error => {
//         console.error("Error blocking user:", error);
//     });
// }

// // Function to unblock user
// function unblockUser(userId) {
//     // Perform AJAX request or submit form to unblock user
//     // Example AJAX request using fetch API
//     fetch("./unblock-user", {
//         method: "POST",
//         body: JSON.stringify({ userId: userId }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Failed to unblock user");
//         }
//         console.log("User unblocked successfully");
//     })
//     .catch(error => {
//         console.error("Error unblocking user:", error);
//     });
// }






// document.addEventListener("DOMContentLoaded", function() {
//     const blockBtns = document.querySelectorAll("[id^='blockBtn_']");
//     const unblockBtns = document.querySelectorAll("[id^='unblockBtn_']");
    
//     blockBtns.forEach(function(btn) {
//         btn.addEventListener("click", function(event) {
//             event.preventDefault();
//             const userId = btn.id.split("_")[1];
//             blockUser(userId);
//             document.getElementById(`blockForm_${userId}`).style.display = "none";
//             document.getElementById(`unblockForm_${userId}`).style.display = "block";
//         });
//     });
    
//     unblockBtns.forEach(function(btn) {
//         btn.addEventListener("click", function(event) {
//             event.preventDefault();
//             const userId = btn.id.split("_")[1];
//             unblockUser(userId);
//             document.getElementById(`unblockForm_${userId}`).style.display = "none";
//             document.getElementById(`blockForm_${userId}`).style.display = "block";
//         });
//     });
// });

// function blockUser(userId) {
//     fetch("./block-user", {
//         method: "POST",
//         body: JSON.stringify({ userId: userId }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Failed to block user");
//         }
//         console.log("User blocked successfully");
//     })
//     .catch(error => {
//         console.error("Error blocking user:", error);
//     });
// }

// function unblockUser(userId) {
//     fetch("./unblock-user", {
//         method: "POST",
//         body: JSON.stringify({ userId: userId }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Failed to unblock user");
//         }
//         console.log("User unblocked successfully");
//     })
//     .catch(error => {
//         console.error("Error unblocking user:", error);
//     });
// }// 




document.addEventListener("DOMContentLoaded", function() {
    const blockBtns = document.querySelectorAll("[id^='blockBtn_']");
    const unblockBtns = document.querySelectorAll("[id^='unblockBtn_']");
    
    blockBtns.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            event.preventDefault();
            const userId = btn.id.split("_")[1];
            blockUser(userId);
            document.getElementById(`blockForm_${userId}`).style.display = "none";
            document.getElementById(`unblockForm_${userId}`).style.display = "block";
        });
    });
    
    unblockBtns.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            event.preventDefault();
            const userId = btn.id.split("_")[1];
            unblockUser(userId);
            document.getElementById(`unblockForm_${userId}`).style.display = "none";
            document.getElementById(`blockForm_${userId}`).style.display = "block";
        });
    });
});

function blockUser(userId) {
    fetch("./block-user", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to block user");
        }
        console.log("User blocked successfully");
    })
    .catch(error => {
        console.error("Error blocking user:", error);
    });
}

function unblockUser(userId) {
    fetch("./unblock-user", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to unblock user");
        }
        console.log("User unblocked successfully");
    })
    .catch(error => {
        console.error("Error unblocking user:", error);
    });
}
