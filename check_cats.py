import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noorani_backend.settings')
django.setup()

from core.models import Category

def check_categories():
    cats = Category.objects.all()
    for c in cats:
        print(f"Category: {c.name} | Image URL: {c.image}")

if __name__ == "__main__":
    check_categories()
