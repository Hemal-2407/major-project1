// download-images.js
const fs = require("fs");
const https = require("https");
const path = require("path");

// 1️⃣ Make sure this folder exists
const folderPath = path.join(__dirname, "public/images/products");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// 2️⃣ List of images to download
const images = [
  {
    name: "upvc-door.jpg",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    name: "wpc-board.jpg",
    // url: "https://images.unsplash.com/photo-1581091012184-5c2f2f9cde76"
    url:"https://media.istockphoto.com/id/1603369587/photo/marble-texture-wpc-plank-sheet-on-a-grey-wall.jpg?s=1024x1024&w=is&k=20&c=9qUcW415trK5pYBctRYg9xgjJf2s4i8R-lF4Aede0kE="
  },
  {
    name: "pvc-panel.jpg",
    url: "https://images.unsplash.com/photo-1618220179428-22790b461013"
  },
  {
    name: "kitchen-cabinet.jpg",
    url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115"
  }
];

// 3️⃣ Download function
function downloadImage(url, filepath) {
  const file = fs.createWriteStream(filepath);
  https.get(url, (response) => {
    response.pipe(file);
    file.on("finish", () => {
      file.close();
      console.log(`✅ Downloaded: ${filepath}`);
    });
  }).on("error", (err) => {
    fs.unlink(filepath, () => {});
    console.error(`❌ Error downloading ${filepath}: ${err.message}`);
  });
}

// 4️⃣ Loop through all images
images.forEach((img) => {
  const filepath = path.join(folderPath, img.name);
  downloadImage(img.url, filepath);
});