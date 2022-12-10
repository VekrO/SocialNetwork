from django.urls import path
from .views import HomeView, ProfileView, SettingsView

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('profile/<str:username>/', ProfileView.as_view(), name='profile'),
    path('settings/', SettingsView.as_view(), name='settings'),
]
