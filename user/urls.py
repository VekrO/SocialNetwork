from django.urls import path
from .views import RegisterView, LoginView, LogoutView, Follow, Unfollow, SettingController

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('follow/<str:username>/', Follow.as_view(), name='follow'),
    path('unfollow/<str:username>/', Unfollow.as_view(), name='unfollow'),
    path('settings/', SettingController.as_view()), # Api para alteração de dados.
]
