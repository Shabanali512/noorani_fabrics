import os
from PIL import Image

def optimize_images():
    img_dir = r'c:\Users\User\Downloads\noorani-v4-final (1)\nf-site\images'
    images = ['hero1.png', 'hero2.png', 'hero3.png']
    
    for img_name in images:
        input_path = os.path.join(img_dir, img_name)
        output_name = img_name.replace('.png', '.webp')
        output_path = os.path.join(img_dir, output_name)
        
        if os.path.exists(input_path):
            print(f"Optimizing {img_name}...")
            with Image.open(input_path) as img:
                # Convert to RGB if needed (WebP handles RGBA too but for heroes RGB is safer/smaller)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(output_path, 'WEBP', quality=85, method=6)
            print(f"Saved to {output_name}")
        else:
            print(f"File {img_name} not found.")

if __name__ == "__main__":
    optimize_images()
