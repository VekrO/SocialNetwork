from django.shortcuts import render, redirect

from django.views.generic.base import View
from django.views.generic.list import ListView
from django.contrib.auth.mixins import LoginRequiredMixin

from user.models import User
from post.models import Post

# Pagination Infinite

class HomeView(LoginRequiredMixin, ListView):

    model = Post
    paginate_by = 5
    context_object_name = 'posts'
    ordering = ['-created_at']
    template_name = 'src/home.html'

    def post(self, request):
        
        description = request.POST.get('description')
        image = request.FILES.get('image')

        Post.objects.create(description=description, image=image, user=request.user)

        return redirect('home')


class ProfileView(View):

    def get(self, request, username):

        # Receber dados do usuário requisitado!
        datas = User.objects.filter(username=username).all()

        if datas:
            return render(request, 'src/profile.html', {'datas': datas})
        else:
            return redirect('home')

class SettingsView(LoginRequiredMixin, View):

    def get(self, request):
        
        return render(request, 'src/settings.html')

class Page404(View):

    def get(self, request, exception=None):
        return redirect('home')