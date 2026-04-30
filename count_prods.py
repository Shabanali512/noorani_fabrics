import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noorani_backend.settings')
django.setup()

from core.models import Product

def check_products():
    products = Product.objects.all()
    print(f"Total products: {len(products)}")
    for p in products:
        print(f"ID: {p.id} | Name: {p.name} | Image: {p.img}")

if __name__ == "__main__":
    check_products()
