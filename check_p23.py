import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noorani_backend.settings')
django.setup()

from core.models import Product

def check_p23():
    p = Product.objects.get(id=23)
    print(f"Product: {p.name}")
    for f in ['img', 'img2', 'img3', 'img4', 'img5']:
        print(f"{f}: {getattr(p, f)}")

if __name__ == "__main__":
    check_p23()
