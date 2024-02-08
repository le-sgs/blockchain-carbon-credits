from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect

# User registration view
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)  # Log the user in
            return redirect('/')  # Redirect to home page or wherever
    else:
        form = UserCreationForm()
    return render(request, 'accounts/register.html', {'form': form})
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect

# User login view
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)  # Log the user in
            return redirect('/')  # Redirect to home page or wherever
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})
