import { v2 as cloudinary } from 'cloudinary';

// @todo You must also do the compression locally

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:    process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET 
});

async function uploadImage(imagePath, userId) {
    // Configuration
    
    try {
      const uploadResult = await cloudinary.uploader.upload(imagePath, {
          public_id: userId,
                    folder: 'avatars',
          overwrite: true,
          invalidate: true, 
          transformation: [
              { width: 500, height: 500, crop: "limit" },
              { quality: "auto" }, // Compress it
              { fetch_format: "auto" } // Convert to WebP/AVIF if possible
          ],
      });

      console.log("Success:", uploadResult.secure_url);

      return cloudinary.url(uploadResult.public_id, {
          crop: 'thumb',
          gravity: 'face', 
          width: 200,
          height: 200,
          fetch_format: 'auto',
          format: 'auto',
          quality: 'auto:low',
          effect: 'grayscale'
      });

    } catch (error) {
        console.error("Upload failed:", error);
    }
    
    return autoCropUrl;
}

async function compressImage(event) {
  const imageFile = event.target.files[0];
  if (!imageFile) return;

  const options = {
    maxSizeMB: 0.05,          // Cap file size at 50KB 
    maxWidthOrHeight: 500,    // Resize to max 500px width or height
    useWebWorker: true,       // Run in background so UI doesn't freeze
    fileType: 'image/webp'    // Force WebP for better compression
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const url = await uploadProfileImage(compressedFile, "user_123");
    
  } catch (error) {
    console.log("Compression failed:", error);
  }
}


export {uploadImage};