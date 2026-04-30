import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noorani_backend.settings')
django.setup()

from core.models import Category

CAT_IMAGES = {
    "3piece": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    "2piece": "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&q=80",
    "embroidery": "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80",
    "casual": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80"
}

def fix_categories():
    cats = Category.objects.all()
    for c in cats:
        if not c.image:
            c.image = CAT_IMAGES.get(c.slug)
            c.save()
            print(f"Updated category: {c.name}")

if __name__ == "__main__":
    fix_categories()
