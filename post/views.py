from django.shortcuts import render
from django.views.generic.base import View
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import renderers
from rest_framework.permissions import IsAuthenticated

from .models import Post, Comments

class PostDeleteView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        # Verificar se o usuário que está pedindo a exclusão da postagem é o dono dela.
        user = self.request.user
        if(Post.objects.filter(id=request.data.get('id')).filter(user=user)):
            # Deletar postagem!
            Post.objects.get(id=request.data.get('id')).delete()
            return Response({'message': 'Postagem excluída com sucesso.'})
        else:
            return Response({'message': 'Você não tem permissão para executar essa ação.'})

class PostLikeView(APIView):

    permission_classes = [IsAuthenticated, ]
    renderer_classes = [renderers.JSONRenderer, ]

    def post(self, request):

        # Receber o usuário que está fazendo a requisição.
        user = self.request.user
        # Procurar a postagem que também está sendo recebida na requisição.
        post = Post.objects.get(id=request.data.get('id'))
        # Adicionar um like na postagem caso ela exista.
        if(post is not None):

            # Verificar se o usuário já deu like na postagem.
            if(post.likers.contains(self.request.user)):
                # Remover o like, pois o usuário clicou duas vezes no mesmo botão.
                post.likers.remove(self.request.user)
                post.like_number -= 1
                post.save()
                return Response({'message': 'Removeu o like da postagem!'})

            # Adicionar o usuário como likers na postagem.
            post.likers.add(user)
            post.like_number += 1
            post.save()
            return Response({'message': 'Você deu um like na postagem!'})

        else:
            return Response({'message': 'Você não tem permissão para executar essa ação.'})
        

class PostDetailView(LoginRequiredMixin, View):

    def get(self, request, id):

        post = Post.objects.get(id=id)
        return render(request, 'src/post-detail.html', {'post': post})

class PostCommentController(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):

        # Criar um comentário com o usuário passado pela requisição
        id = request.data.get('id') # ID da postagem para que seja inserido um usuário que comentou!
        user = self.request.user # Usuário da requisição
        description = request.data.get('description') # Texto do comentário.
        # Pegar postagem com o id passado.
        post = Post.objects.get(id=id)

        # Verificar se a postagem existe.
        if(post is not None):
            post.comment_number += 1
            # Criar o comentário com o usuário da requisição.
            comment = Comments.objects.create(user=user, description=description)
            # Adicionar o comentário no campo de comentários do post.
            post.comments.add(comment)
            post.save()
            return Response({'message': 'Comentário realizado com sucesso!'})
        else:
            return Response({'message': 'A postagem não existe!'})

    def delete(self, request):

        # Receber o id do comentário para ser deletado!
        id = request.data.get('id')
        id_post = request.data.get('id_post')
        user = self.request.user

        # Verificar se o comentário pertence ao usuário da requisição.
        comment = Comments.objects.get(id=id)
        if(comment.user == user):
            # Remover o comentário da postagem.
            post = Post.objects.get(id=id_post)
            post.comment_number -= 1
            comment.delete()
            post.save()
            return Response({'message': 'Deletou o comentário com sucesso.'})
        else:
            return Response({'message': 'Você não tem permissão para executar essa ação.'})
