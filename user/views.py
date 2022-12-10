from django.views.generic.base import View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.hashers import check_password

# Gerar um token para o usuário.
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import User

# Classe que recebe o POST dos usuários.
class RegisterView(View):
    
    def get(self, request):
        return render(request, 'src/register.html')

    def post(self, request):
        
        name = request.POST.get('name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password') 
        image = request.FILES.get('image')

        # Verificar se o e-mail ou username estão em uso.
        if User.objects.filter(email=email).first():
            print("o email está em uso!")
            messages.error(request, 'O e-mail já está sendo utilizado')
            return redirect('register')

        user = User()
        user.name = name
        user.username = '@' + username
        user.email = email
        user.set_password(password)


        if image:
            user.image = image
        else:
            user.image = 'default.png'
        
        user.save()

        # Criar um token para o usuário recém registrado!
        Token.objects.create(user=user)

        messages.success(request, 'A conta foi criada com sucesso!')
        return redirect('login')

class LoginView(View):

    def get(self, request):

        return render(request, 'src/login.html')

    def post(self, request):

        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(email=email, password=password)
    
        if(user is not None):

            login(request, user)
            token = Token.objects.get(user=user)
            request.session['token'] = str(token)
            return redirect('home')
        
        else:
            messages.error(request, 'Os dados estão incorretos.')
            return redirect('login')

class LogoutView(LoginRequiredMixin, View):

    def get(self, request):
        logout(request)
        return redirect('login')

class Follow(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request, username):

        # Receber usuário pelo username.


        user = User.objects.get(username=username)
        # Verificar se o usuário já está seguindo!
        if(user.followers.filter(username=self.request.user.username).first()):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user.followers.add(self.request.user)
            user.follower_number += 1
            user.save()
        
        return Response(status=status.HTTP_200_OK)

class Unfollow(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request, username):

        # Receber usuário pelo username.
        user = User.objects.get(username=username)
        # Verificar se o usuário está seguindo!
        if(user.followers.filter(username=self.request.user.username).first()):
            user.followers.remove(self.request.user)
            user.follower_number -= 1
            user.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)

class SettingController(APIView):

    permission_classes = [IsAuthenticated, ]

    def patch(self, request):

        name=request.data.get('name')
        newpassword=request.data.get('newPassword')
        oldpassword=request.data.get('oldPassword')

        if name is not None:
            User.objects.filter(id=self.request.user.id).update(name=name)
        if oldpassword is not None and newpassword is not None:
            user = User.objects.get(id=self.request.user.id)
            if(user.check_password(oldpassword)):
                # Trocar senha
                user.set_password(newpassword)
                user.save()
                return Response({'message': 'Você atualizou suas informações de senha com sucesso!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Erro na alteração de senha.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Você atualizou o usuário com sucesso.'})
