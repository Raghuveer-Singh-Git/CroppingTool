let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let downloadButton = document.getElementById("download");
const previewButton = document.getElementById("preview");
const previewImage = document.getElementById("preview-image");
let cropper = "";
let fileName = "";


fileInput.onchange = () => {
  previewImage.src = "";
  downloadButton.classList.add("hide");

  //The FileReader object helps to read contents of file stored on the computer
  let reader = new FileReader();
  //readAsDataURL reads the content of input file
  reader.readAsDataURL(fileInput.files[0]);

  reader.onload = () => {
    image.setAttribute("src", reader.result);
    if (cropper) {
      cropper.destroy();
    }
    //Initialize cropper
    cropper = new Cropper(image);
    cropper.setAspectRatio(eval(400/514));  // Set aspect ratio
    previewButton.classList.remove("hide");
  };
  fileName = fileInput.files[0].name.split(".")[0];
};

previewButton.addEventListener("click", (e) => {
  e.preventDefault();
  downloadButton.classList.remove("hide");
  let imgSrc = cropper.getCroppedCanvas({}).toDataURL();
  //Set preview
  previewImage.src = imgSrc;
  downloadButton.download = `cropped_${fileName}.png`;
  downloadButton.setAttribute("href", imgSrc);
});

window.onload = () => {
  download.classList.add("hide");
  previewButton.classList.add("hide");
};
