from django.urls import path
from server import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('category/', views.category),
    path('editcategory/<int:cid>/', views.editcategory),
    path('deletecategory/<int:cid>/', views.deletecategory),
        path("company/", views.company),   # POST only (insert)
            path("verifycompany/<int:cid>/", views.verifycompany),  # admin verify (PUT)
path("pendingcompanies/", views.pendingcompanies),
 path("admin/", views.adminreg),
    path("editadmin/<int:aid>/", views.editadmin),
    path("deleteadmin/<int:aid>/", views.deleteadmin),
        path("users/", views.users),
            path("Login/", views.Login),
             path("stock/", views.stock),
    path("deletestock/<int:sid>/", views.deletestock),
     path("stockprice/<int:sid>/", views.stockprice),
    path("deletestockprice/<int:spid>/", views.deletestockprice),
    path("companyprofile/<int:cid>/", views.companyprofile),
    path("editcompanyprofile/<int:cid>/", views.editcompanyprofile),
    path("companychangepassword/<int:cid>/", views.companychangepassword),
    path("userprofile/<int:uid>/", views.userprofile),
    
    path("userchangepassword/<int:uid>/", views.userchangepassword),
    path("viewacceptedcompany/", views.viewacceptedcompany),
    path("userviewstocks/<int:cid>/", views.userviewstocks),

    path("userwallet/<int:uid>/", views.userwallet),
path("addmoney/<int:uid>/", views.addmoney),
  path("placeorder/", views.placeorder),
    path("myorders/<int:uid>/", views.myorders),



]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)




    

   







