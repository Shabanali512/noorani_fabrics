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
    
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # Minimal list display to debug 500 error
    list_display = ('id', 'customer_name', 'phone', 'total_amount', 'status')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('customer_name', 'phone', 'address')
    readonly_fields = ('created_at',)
    
    fieldsets = (
        ('Customer Info', {
            'fields': ('customer_name', 'email', 'phone', 'address')
        }),
        ('Order Details', {
            'fields': (('total_amount', 'status', 'payment_method'),)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
        }),
    )


