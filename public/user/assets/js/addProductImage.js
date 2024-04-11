// $(document).ready(function() {
//     var cropper;
  
//     $('#imageContainer').on('click', '.imageItem img', function() {
//       var imageUrl = $(this).attr('src');
//       $('#modalImage').attr('src', imageUrl);
//       $('#imageModal').modal('show');
//     });
  
//     $('#cropBtn').click(function() {
//       if (cropper) {
//         var croppedCanvas = cropper.getCroppedCanvas();
//         var croppedImage = croppedCanvas.toDataURL();
//         console.log(croppedImage);
//       }
//       $('#imageModal').modal('hide');
//     });
  
//     $('#deleteBtn').click(function() {
//       if (confirm("Are you sure you want to delete this image?")) {
//         $(this).closest('.imageItem').remove();
//         $('#imageModal').modal('hide');
//       }
//     });
  
//     $('#insertBtn').click(function() {
//       $('#fileInput').click();
//     });
  
//     $('#fileInput').change(function(event) {
//       var files = event.target.files;
  
//       if (files) {
//         for (var i = 0; i < files.length; i++) {
//           var reader = new FileReader();
//           reader.onload = function(e) {
//             var imageUrl = e.target.result;
//             var imageItem = document.createElement('div');
//             imageItem.classList.add('imageItem');
//             var image = document.createElement('img');
//             image.src = imageUrl;
//             imageItem.appendChild(image);
//             document.getElementById('imageContainer').appendChild(imageItem);
  
//             $(image).on('load', function() {
//               cropper = new Cropper(image, {
//                 aspectRatio: 1 / 1,
//                 viewMode: 1,
//               });
//             });
//           };
//           reader.readAsDataURL(files[i]);
//         }
//       }
//     });
//   });