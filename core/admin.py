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
        date = obj.created_at.strftime("%d %b, %H:%M")
        return format_html(
            '<div style="line-height: 1.4; min-width: 120px;">'
            '<strong style="color: #ffc107; font-size: 14px;">#NF-{}</strong><br>'
            '<small style="color: #aaa;">{}</small><br>'
            '<span style="background: #444; color: #eee; font-size: 9px; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">{}</span>'
            '</div>',
            obj.id, date, obj.payment_method
        )
    order_info.short_description = "Order Details"

    def customer_info(self, obj):
        whatsapp_url = f"https://wa.me/{obj.phone.replace('+', '').replace(' ', '')}"
        return format_html(
            '<div style="line-height: 1.4; min-width: 180px;">'
            '<strong style="font-size: 14px; color: #fff;">{}</strong><br>'
            '<a href="tel:{0}" style="color: #4da3ff; font-size: 12px; font-weight: 600;">{}</a> '
            '<a href="{}" target="_blank" title="WhatsApp Customer" style="margin-left: 5px; vertical-align: middle;">'
            '<i class="fab fa-whatsapp" style="color: #25D366; font-size: 16px;"></i>'
            '</a><br>'
            '<small style="color: #888;">{}</small>'
            '</div>',
            obj.customer_name, obj.phone, whatsapp_url, obj.email
        )
    customer_info.short_description = "Customer"

    def items_ordered(self, obj):
        try:
            items = json.loads(obj.items_json)
            html = '<div style="width: 220px;">'
            for item in items:
                p = Product.objects.filter(id=item['id']).first()
                name = p.name[:22] + "..." if p and len(p.name) > 22 else (p.name if p else f"ID:{item['id']}")
                html += f'<div style="font-size: 11px; margin-bottom: 4px; border-bottom: 1px solid #444; padding-bottom: 2px; display: flex; justify-content: space-between;">' \
                        f'<span style="color: #eee;">• {name}</span> ' \
                        f'<span style="color: #ffc107; font-weight: bold;">{item.get("qty", 1)}x {item.get("size", "").upper()}</span>' \
                        f'</div>'
            html += '</div>'
            return format_html(html)
        except:
            return "Error loading items"
    items_ordered.short_description = "Products Ordered"

    def address_preview(self, obj):
        short_addr = obj.address[:45] + "..." if len(obj.address) > 45 else obj.address
        return format_html('<span title="{}" style="color: #ccc; font-size: 11px; cursor: help;">{}</span>', obj.address, short_addr)
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
            '<div style="background: {}; color: #fff; padding: 4px 10px; border-radius: 4px; font-weight: bold; font-size: 10px; text-align: center; text-transform: uppercase; width: 90px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">'
            '{}</div>',
            color, obj.get_status_display()
        )
    status_badge.short_description = "Status"

    def order_id_styled(self, obj):
        return format_html('<strong style="color: #6B1A2A; font-size: 18px;">#NF-{}</strong>', obj.id)
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
        try:
            items = json.loads(obj.items_json)
            html = '<table style="width:100%; border-collapse: collapse; background: #333; color: white; border-radius: 8px; overflow: hidden;">'
            html += '<tr style="background: #1a1a1a; text-align: left;"><th style="padding: 12px;">Product</th><th style="padding: 12px;">Size</th><th style="padding: 12px;">Qty</th></tr>'
            for item in items:
                p = Product.objects.filter(id=item['id']).first()
                name = p.name if p else f"Product ID: {item['id']}"
                html += f'<tr><td style="padding: 10px; border-top: 1px solid #444;">{name}</td>'
                html += f'<td style="padding: 10px; border-top: 1px solid #444;">{item["size"].upper()}</td>'
                html += f'<td style="padding: 10px; border-top: 1px solid #444;">{item["qty"]}</td></tr>'
            html += '</table>'
            return format_html(html)
        except:
            return obj.items_json
    formatted_items.short_description = "Items Ordered"

