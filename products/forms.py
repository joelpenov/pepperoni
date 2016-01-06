from django import forms

class ProductForm(forms.Form):
    description = forms.CharField(max_length=255, label="Descripcion")
    show_in_menu= forms.BooleanField(label="Mostrar en el menu")
    is_raw_material= forms.BooleanField(label="Es materia prima")
    sell_price = forms.FloatField("Precio de venta")