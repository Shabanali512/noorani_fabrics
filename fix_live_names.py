import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noorani_backend.settings')
django.setup()

from core.models import Product

def fix_mismatched_names():
    products = Product.objects.all()
    fixed_count = 0
    
    # Pattern to find Django's random string (e.g. _FpsNBwR)
    # Typically _ followed by 7-8 alphanumeric characters
    pattern = re.compile(r'_[a-zA-Z0-9]{7,8}')
    
    for p in products:
        fields = ['img', 'img2', 'img3', 'img4', 'img5']
        p_updated = False
        
        for field_name in fields:
            val = getattr(p, field_name)
            if not val: continue
            
            # Current path in DB
            db_path = str(val) # e.g. products/WhatsApp..._pg6hrKs.18.06...
            full_path = val.path if hasattr(val, 'path') else os.path.join('media', db_path)
            
            if not os.path.exists(full_path):
                # Try to fix by removing the random string
                fixed_path = pattern.sub('', db_path)
                
                # Check if the "fixed" (simpler) version exists on disk
                # Note: Django might have multiple underscores, we try to be careful
                potential_path = os.path.join('media', fixed_path)
                
                if os.path.exists(potential_path):
                    print(f"Fixing {p.name} [{field_name}]: {db_path} -> {fixed_path}")
                    setattr(p, field_name, fixed_path)
                    p_updated = True
                else:
                    # Alternative: try removing everything between _ and the next .
                    # e.g. _pg6hrKs.18.06 -> .18.06
                    fixed_path_alt = re.sub(r'_[a-zA-Z0-9]+\.', '.', db_path)
                    potential_path_alt = os.path.join('media', fixed_path_alt)
                    if os.path.exists(potential_path_alt):
                        print(f"Fixing (Alt) {p.name} [{field_name}]: {db_path} -> {fixed_path_alt}")
                        setattr(p, field_name, fixed_path_alt)
                        p_updated = True
        
        if p_updated:
            p.save()
            fixed_count += 1
            
    print(f"\nDone! Updated {fixed_count} products.")

if __name__ == "__main__":
    fix_mismatched_names()
