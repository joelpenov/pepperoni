from django import forms

from .models import Product

class ProductForm(forms.ModelForm):
    cost=forms.CharField(label="Costo",  widget=forms.TextInput(attrs={'class':'disabled', 'readonly':'readonly'}))
    average_cost=forms.CharField(label="Costo promedio",  widget=forms.TextInput(attrs={'class':'disabled', 'readonly':'readonly'}))
    stock=forms.CharField( label="Existencia", widget=forms.TextInput(attrs={'class':'disabled', 'readonly':'readonly'}))
    class Meta:
        model = Product
        fields = ['id','description','sell_price','is_raw_material','show_in_menu']
        labels = {
            'id':'Codigo',
            'description': 'Descripcion',
            'sell_price': 'Precio de Venta',
            'is_raw_material': 'Materia Prima',
            'show_in_menu': 'Mostrar en el Menu',
        }