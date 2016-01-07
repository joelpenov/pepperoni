from django.forms import ModelForm

from .models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = ['description','sell_price','is_raw_material','show_in_menu']
        labels = {
            'description': 'Descripcion',
            'sell_price': 'Precio de Venta',
            'is_raw_material': 'Materia Prima',
            'show_in_menu': 'Mostrar en el Menu',
        }