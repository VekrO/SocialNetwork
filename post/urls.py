from django.urls import path
from .views import PostDeleteView, PostLikeView, PostDetailView, PostCommentController

urlpatterns = [
    path('detail/<uuid:id>/', PostDetailView.as_view(), name='post-detail'),
    path('comment/control/', PostCommentController.as_view()),
    path('delete/', PostDeleteView.as_view()),
    path('like/', PostLikeView.as_view()),
]
