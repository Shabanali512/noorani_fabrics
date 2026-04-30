import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noorani_backend.settings')
django.setup()

from core.models import Product

def check_all_images():
    products = Product.objects.all()
    media_root = os.path.join(os.getcwd(), 'media')
    
    broken = []
    for p in products:
        for field in ['img', 'img2', 'img3', 'img4', 'img5']:
            val = getattr(p, field)
            if val:
                img_path = str(val)
                if not img_path.startswith('http'):
                    full_path = os.path.join(media_root, img_path)
                    if not os.path.exists(full_path):
                        broken.append((p.id, p.name, field, full_path))
    
    if broken:
        print(f"Found {len(broken)} broken images:")
        for b in broken:
            print(f"Product ID: {b[0]} | Name: {b[1]} | Field: {b[2]} | Path: {b[3]}")
    else:
        print("No broken images found in product fields.")

if __name__ == "__main__":
    check_all_images()
