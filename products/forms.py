from django import forms

class ProductForm(forms.Form):
    description = forms.CharField(max_length=255)
    show_in_menu= forms.BooleanField()
    is_raw_material= forms.BooleanField()
    sell_price = forms.FloatField()