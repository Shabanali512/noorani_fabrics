from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, Order
import json

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'product_count')
    prepopulated_fields = {'slug': ('name',)}
    
    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = "Products"

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('display_image', 'name', 'category', 'price', 'stock', 'badge', 'is_trending', 'is_featured')
    list_filter = ('category', 'badge', 'is_trending', 'is_featured', 'created_at')
    list_editable = ('price', 'stock', 'badge', 'is_trending', 'is_featured')
    search_fields = ('name', 'desc')
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Suit Details', {
            'fields': ('name', 'category', 'desc', ('badge', 'is_trending', 'is_featured')),
            'classes': ('wide',),
        }),
        ('Pricing & Stock', {
            'fields': (('price', 'old_price'), ('stock', 'sold'), 'sizes'),
        }),
        ('Suit Photography', {
            'fields': (('img', 'img2'), ('img3', 'img4'), 'img5'),
            'description': 'Upload up to 5 photos showing different views of the suit (Front, Back, Details, etc).',
        }),
    )

    def display_image(self, obj):
        if obj.img:
            # Handle both URLs and uploaded files
            url = obj.img.url if hasattr(obj.img, 'url') else str(obj.img)
            return format_html('<img src="{}" style="width: 45px; height: 55px; object-fit: cover; border-radius: 4px; border: 1px solid #ddd;" />', url)
        return "No Image"
    display_image.short_description = 'Preview'

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_info', 'customer_info', 'items_ordered', 'address_preview', 'total_amount', 'status_badge', 'status')
    list_filter = ('status', 'payment_method', 'created_at')
    list_editable = ('status',)
    search_fields = ('customer_name', 'phone', 'address')
    readonly_fields = ('created_at', 'order_id_styled', 'formatted_items')
    list_per_page = 20
    ordering = ('-created_at',)
    
    def order_info(self, obj):
        date_str = obj.created_at.strftime("%d %b, %H:%M") if obj.created_at else "No Date"
        return format_html(
            '<div style="line-height: 1.4; min-width: 120px;">'
            '<strong style="color: #ffc107; font-size: 14px;">#NF-{0}</strong><br>'
            '<small style="color: #aaa;">{1}</small><br>'
            '<span style="background: #444; color: #eee; font-size: 9px; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">{2}</span>'
            '</div>',
            obj.id, date_str, obj.payment_method or "COD"
        )
    order_info.short_description = "Order Details"

    def customer_info(self, obj):
        phone = obj.phone or ""
        phone_clean = phone.replace('+', '').replace(' ', '')
        whatsapp_url = f"https://wa.me/{phone_clean}"
        return format_html(
            '<div style="line-height: 1.4; min-width: 180px;">'
            '<strong style="font-size: 14px; color: #fff;">{0}</strong><br>'
            '<a href="tel:{1}" style="color: #4da3ff; font-size: 12px; font-weight: 600;">{1}</a> '
            '<a href="{2}" target="_blank" title="WhatsApp Customer" style="margin-left: 5px; vertical-align: middle;">'
            '<i class="fab fa-whatsapp" style="color: #25D366; font-size: 16px;"></i>'
            '</a><br>'
            '<small style="color: #888;">{3}</small>'
            '</div>',
            obj.customer_name or "Unknown", phone, whatsapp_url, obj.email or ""
        )
    customer_info.short_description = "Customer"

    def items_ordered(self, obj):
        if not obj.items_json:
            return "No items"
        try:
            if isinstance(obj.items_json, str):
                try:
                    items = json.loads(obj.items_json.replace("'", '"'))
                except:
                    import ast
                    items = ast.literal_eval(obj.items_json)
            else:
                items = obj.items_json
                
            if not isinstance(items, list):
                return "Invalid data"

            html = '<div style="width: 260px;">'
            for item in items:
                p = Product.objects.filter(id=item.get('id')).first()
                if p:
                    img_url = p.img.url if hasattr(p.img, 'url') else str(p.img)
                    html += format_html(
                        '<div style="display: flex; align-items: center; margin-bottom: 6px; background: #333; padding: 5px; border-radius: 6px; border: 1px solid #444;">'
                        '<img src="{0}" style="width: 35px; height: 45px; object-fit: cover; border-radius: 3px; margin-right: 10px; border: 1px solid #555;">'
                        '<div style="line-height: 1.2;">'
                        '<div style="font-size: 11px; color: #fff; font-weight: 700; margin-bottom: 2px;">{1}</div>'
                        '<div style="font-size: 10px; color: #ffc107; font-weight: 600;">{2}x <span style="background:#555; padding:0 3px; border-radius:2px;">{3}</span></div>'
                        '</div>'
                        '</div>',
                        img_url, p.name[:25], item.get('qty', 1), str(item.get('size', '')).upper()
                    )
                else:
                    html += f'<div style="font-size: 10px; color: #888; padding: 5px; border: 1px dashed #555; border-radius: 4px; margin-bottom: 5px;">Product ID: {item.get("id")} (Deleted)</div>'
            html += '</div>'
            return format_html(html)
        except Exception:
            return format_html('<span style="color: #e74c3c; font-size: 10px;">⚠️ Error Loading Items</span>')
    items_ordered.short_description = "Products Ordered"

    def address_preview(self, obj):
        addr = obj.address or ""
        short_addr = addr[:45] + "..." if len(addr) > 45 else addr
        return format_html('<span title="{}" style="color: #ccc; font-size: 11px; cursor: help; display: block; max-width: 150px; line-height: 1.3;">{}</span>', addr, short_addr)
    address_preview.short_description = "Shipping Address"

    def status_badge(self, obj):
        colors = {
            'Pending': '#f39c12',
            'Confirmed': '#27ae60',
            'Shipped': '#2980b9',
            'Delivered': '#6B1A2A',
            'Cancelled': '#c0392b',
        }
        color = colors.get(obj.status, '#333')
        return format_html(
            '<div style="background: {0}; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 10px; text-align: center; text-transform: uppercase; width: 90px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);">'
            '{1}</div>',
            color, obj.get_status_display()
        )
    status_badge.short_description = "Status"

    def order_id_styled(self, obj):
        return format_html('<strong style="color: #ffc107; font-size: 20px;">#NF-{0}</strong>', obj.id)
    order_id_styled.short_description = "Order ID"

    fieldsets = (
        ('Customer Info', {
            'fields': ('customer_name', 'email', 'phone', 'address')
        }),
        ('Order Details', {
            'fields': (('order_id_styled', 'total_amount', 'status', 'payment_method'),)
        }),
        ('Purchased Items', {
            'fields': ('formatted_items',),
            'description': 'Customer ne jo suits kharide hain unki details yahan hain.'
        }),
        ('Timestamps', {
            'fields': ('created_at',),
        }),
    )

    def formatted_items(self, obj):
        if not obj.items_json:
            return "No items recorded"
        try:
            if isinstance(obj.items_json, str):
                try:
                    items = json.loads(obj.items_json.replace("'", '"'))
                except:
                    import ast
                    items = ast.literal_eval(obj.items_json)
            else:
                items = obj.items_json

            if not isinstance(items, list):
                return str(obj.items_json)

            html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; padding: 10px; background: #1a1a1a; border-radius: 8px;">'
            for item in items:
                p = Product.objects.filter(id=item.get('id')).first()
                if p:
                    img_url = p.img.url if hasattr(p.img, 'url') else str(p.img)
                    html += format_html(
                        '<div style="background: #2b2b2b; border: 1px solid #444; padding: 12px; border-radius: 10px; display: flex; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">'
                        '<img src="{0}" style="width: 70px; height: 90px; object-fit: cover; border-radius: 6px; margin-right: 15px; border: 1px solid #555;">'
                        '<div>'
                        '<div style="font-weight: 800; color: #fff; font-size: 14px; margin-bottom: 6px; font-family: sans-serif;">{1}</div>'
                        '<div style="color: #ffc107; font-size: 12px; font-weight: 600;">Size: <span style="color:#fff; background:#444; padding:2px 6px; border-radius:4px;">{2}</span></div>'
                        '<div style="color: #ffc107; font-size: 12px; font-weight: 600; margin-top: 5px;">Quantity: <span style="color:#fff; background:#444; padding:2px 6px; border-radius:4px;">{3}</span></div>'
                        '</div>'
                        '</div>',
                        img_url, p.name, str(item.get('size', '')).upper(), item.get('qty', 1)
                    )
            html += '</div>'
            return format_html(html)
        except Exception as e:
            return format_html('<div style="color: #e74c3c; padding: 10px; border: 1px dashed #e74c3c; border-radius: 4px;">Error formatting items: {0}</div>', str(e))
    formatted_items.short_description = "Items Ordered"

    formatted_items.short_description = "Items Ordered"


