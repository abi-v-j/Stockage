from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import *
import json

@csrf_exempt
def category(request):

    # CREATE
    if request.method == "POST":
        data = json.loads(request.body)
        tbl_category.objects.create(
            category_name=data['category_name']
        )

    # READ
    categorydata = list(tbl_category.objects.values())

    return JsonResponse({
        "categorydata": categorydata
    })


@csrf_exempt
def editcategory(request, cid):

    if request.method == "PUT":
        data = json.loads(request.body)

        tbl_category.objects.filter(id=cid).update(
            category_name=data['category_name']
        )

    categorydata = list(tbl_category.objects.values())

    return JsonResponse({
        "categorydata": categorydata
    })


@csrf_exempt
def deletecategory(request, cid):

    tbl_category.objects.get(id=cid).delete()

    categorydata = list(tbl_category.objects.values())

    return JsonResponse({
        "categorydata": categorydata
    })



@csrf_exempt
def company(request):

    if request.method == "POST":

        tbl_company.objects.create(
            company_name=request.POST.get("company_name"),
            company_details=request.POST.get("company_details"),
            company_proof=request.FILES.get("company_proof"),
            company_photo=request.FILES.get("company_photo"),
            company_license=request.FILES.get("company_license"),
            company_status=0
        )

        return JsonResponse({
            "message": "Company Registered Successfully"
        })

    return JsonResponse({"message": "Invalid request"})


@csrf_exempt
def pendingcompanies(request):
    data = list(tbl_company.objects.filter(company_status=0).values())
    return JsonResponse({"data": data})


    
@csrf_exempt
def verifycompany(request, cid):

    if request.method == "PUT":
        body = json.loads(request.body)
        status = int(body.get("status"))  # 1/2/3

        if status not in [1, 2, 3]:
            return JsonResponse({"message": "Invalid status"}, status=400)

        updated = tbl_company.objects.filter(id=cid).update(company_status=status)

        if updated == 0:
            return JsonResponse({"message": "Company not found"}, status=404)

        return JsonResponse({
            "message": "Company status updated",
            "data": list(tbl_company.objects.values())
        })

    return JsonResponse({"message": "Invalid request"}, status=405)



@csrf_exempt
def companyprofile(request, cid):

    if request.method == "PUT":
        data = json.loads(request.body)

        tbl_company.objects.filter(id=cid).update(
            company_name=data["company_name"],
            company_details=data["company_details"]
        )

    companydata = list(
        tbl_company.objects.filter(id=cid).values()
    )

    return JsonResponse({
        "companydata": companydata
    })



@csrf_exempt
def editcompanyprofile(request, cid):

    if request.method == "PUT":
        data = json.loads(request.body)

        tbl_company.objects.filter(id=cid).update(
            company_name=data["company_name"],
            company_email=data["company_email"],
            company_password=data["company_password"],
            company_details=data["company_details"]
        )

    companydata = list(tbl_company.objects.filter(id=cid).values())

    return JsonResponse({
        "companydata": companydata
    })



@csrf_exempt
def companychangepassword(request, cid):

    if request.method == "PUT":
        data = json.loads(request.body)

        current_password = data.get("current_password")
        new_password = data.get("new_password")

        company = tbl_company.objects.filter(
            id=cid,
            company_password=current_password
        ).first()

        if not company:
            return JsonResponse({
                "message": "Current password incorrect"
            }, status=400)

        company.company_password = new_password
        company.save()

        return JsonResponse({
            "message": "Password changed successfully"
        })

    return JsonResponse({"message": "Invalid request"})



@csrf_exempt
def viewacceptedcompany(request):
    companydata = list(
        tbl_company.objects.filter(company_status=1).values()
    )

    return JsonResponse({
        "companydata": companydata
    })

@csrf_exempt
def adminreg(request):

    if request.method == "POST":
        data = json.loads(request.body)

        tbl_admin.objects.create(
            admin_name=data["admin_name"],
            admin_password=data["admin_password"],
            admin_email=data["admin_email"]
        )

    admindata = list(tbl_admin.objects.values())

    return JsonResponse({
        "admindata": admindata
    })


@csrf_exempt
def editadmin(request, aid):

    if request.method == "PUT":
        data = json.loads(request.body)

        tbl_admin.objects.filter(id=aid).update(
            admin_name=data["admin_name"],
            admin_password=data["admin_password"],
            admin_email=data["admin_email"]
        )

    admindata = list(tbl_admin.objects.values())

    return JsonResponse({
        "admindata": admindata
    })


@csrf_exempt
def deleteadmin(request, aid):

    tbl_admin.objects.get(id=aid).delete()

    admindata = list(tbl_admin.objects.values())

    return JsonResponse({
        "admindata": admindata
    })



@csrf_exempt
def users(request):

    if request.method == "POST":

        tbl_users.objects.create(
            user_name=request.POST.get("user_name"),
            user_email=request.POST.get("user_email"),
            user_contact=request.POST.get("user_contact"),
            user_address=request.POST.get("user_address"),
            user_password=request.POST.get("user_password"),
            user_photo=request.FILES.get("user_photo")
        )

        return JsonResponse({
            "message": "User Registered Successfully"
        })

    return JsonResponse({"message": "Invalid request"})


@csrf_exempt
def userprofile(request, uid):

    if request.method == "PUT":

        user = tbl_users.objects.get(id=uid)

        user.user_name = request.POST.get("user_name")
        user.user_email = request.POST.get("user_email")
        user.user_contact = request.POST.get("user_contact")
        user.user_address = request.POST.get("user_address")

        if request.FILES.get("user_photo"):
            user.user_photo = request.FILES.get("user_photo")

        user.save()

    userdata = list(tbl_users.objects.filter(id=uid).values())

    return JsonResponse({
        "userdata": userdata
    })

    
@csrf_exempt
def userprofile(request, uid):

    if request.method == "PUT":

        user = tbl_users.objects.get(id=uid)

        user.user_name = request.POST.get("user_name")
        user.user_email = request.POST.get("user_email")
        user.user_contact = request.POST.get("user_contact")
        user.user_address = request.POST.get("user_address")

        if request.FILES.get("user_photo"):
            user.user_photo = request.FILES.get("user_photo")

        user.save()

    userdata = list(tbl_users.objects.filter(id=uid).values())

    return JsonResponse({
        "userdata": userdata
    })


@csrf_exempt
def userchangepassword(request, uid):
    if request.method == "PUT":
        data = json.loads(request.body)

        current_password = data.get("current_password")
        new_password = data.get("new_password")

        user = tbl_users.objects.filter(
            id=uid,
            user_password=current_password
        ).first()

        if not user:
            return JsonResponse({
                "message": "Current password is incorrect"
            }, status=400)

        user.user_password = new_password
        user.save()

        return JsonResponse({
            "message": "Password changed successfully"
        })

    return JsonResponse({
        "message": "Invalid request"
    }, status=405)



@csrf_exempt
def userviewstocks(request, cid):
    stockdata = list(
        tbl_stock.objects.filter(company_id=cid, stock_status=1).values(
            "id",
            "stock_symbol",
            "stock_name",
            "stock_status",
            "category_id",
            "category_id__category_name",
            "company_id",
            "company_id__company_name"
        )
    )

    return JsonResponse({
        "stockdata": stockdata
    })


@csrf_exempt
def userwallet(request, uid):

    wallet = tbl_wallet.objects.filter(user_id=uid).first()

    if not wallet:
        user = tbl_users.objects.get(id=uid)
        wallet = tbl_wallet.objects.create(user_id=user, wallet_balance=0)

    return JsonResponse({
        "wallet_balance": wallet.wallet_balance
    })



@csrf_exempt
def addmoney(request, uid):

    if request.method == "POST":
        data = json.loads(request.body)

        amount = float(data.get("amount", 0))

        wallet = tbl_wallet.objects.filter(user_id=uid).first()

        if not wallet:
            user = tbl_users.objects.get(id=uid)
            wallet = tbl_wallet.objects.create(user_id=user, wallet_balance=0)

        wallet.wallet_balance += amount
        wallet.save()

        return JsonResponse({
            "message": "Money added successfully"
        })




@csrf_exempt
def Login(request):
    if request.method == "POST":
        body = json.loads(request.body)
        email = body.get("email")
        password = body.get("password")

        # -------- admin --------
        admin = tbl_admin.objects.filter(
            admin_email=email,
            admin_password=password
        ).first()

        if admin:
            return JsonResponse({
                "role": "admin",
                "id": admin.id,
                "name": admin.admin_name,
                "message": "Admin login successful"
            })

        # -------- company --------
        # only approved company can login
        company = tbl_company.objects.filter(
            company_email=email,
            company_password=password
        ).first()

        if company:
            if company.company_status == 0:
                return JsonResponse({"message": "Company account pending approval"}, status=401)
            elif company.company_status == 2:
                return JsonResponse({"message": "Company account rejected"}, status=401)
            elif company.company_status == 3:
                return JsonResponse({"message": "Company account blocked"}, status=401)
            elif company.company_status == 1:
                return JsonResponse({
                    "role": "company",
                    "id": company.id,
                    "name": company.company_name,
                    "message": "Company login successful"
                })

        # -------- user --------
        user = tbl_users.objects.filter(
            user_email=email,
            user_password=password
        ).first()

        if user:
            return JsonResponse({
                "role": "user",
                "id": user.id,
                "name": user.user_name,
                "message": "User login successful"
            })

        return JsonResponse({
            "message": "Invalid email or password"
        }, status=401)

    return JsonResponse({
        "message": "Invalid request"
    }, status=405)




@csrf_exempt
def stock(request):

    if request.method == "POST":
        data = json.loads(request.body)

        tbl_stock.objects.create(
            stock_symbol=data["stock_symbol"],
            stock_name=data["stock_name"],
            stock_status=1,
            company_id=tbl_company.objects.get(id=data["company_id"]),
            category_id=tbl_category.objects.get(id=data["category_id"])
        )

    company_id = request.GET.get("company_id")

    if company_id:
        stockdata = list(
            tbl_stock.objects.filter(company_id=company_id).values(
                "id",
                "stock_symbol",
                "stock_name",
                "stock_status",
                "company_id",
                "company_id__company_name",
                "category_id",
                "category_id__category_name"
            )
        )
    else:
        stockdata = list(
            tbl_stock.objects.values(
                "id",
                "stock_symbol",
                "stock_name",
                "stock_status",
                "company_id",
                "company_id__company_name",
                "category_id",
                "category_id__category_name"
            )
        )

    return JsonResponse({
        "stockdata": stockdata
    })



@csrf_exempt
def deletestock(request, sid):
    tbl_stock.objects.get(id=sid).delete()

    stockdata = list(
        tbl_stock.objects.values(
            "id",
            "stock_symbol",
            "stock_name",
            "stock_status",
            "company_id",
            "company_id__company_name",
            "category_id",
            "category_id__category_name"
        )
    )

    return JsonResponse({
        "stockdata": stockdata
    })




@csrf_exempt
def stockprice(request, sid):

    if request.method == "POST":
        data = json.loads(request.body)

        tbl_stockprice.objects.create(
            stock_id=tbl_stock.objects.get(id=sid),
            stock_date=data["stock_date"],
            stock_price=data["stock_price"],
            stock_volume=data["stock_volume"]
        )

    pricedata = list(
        tbl_stockprice.objects.filter(stock_id=sid).values(
            "id",
            "stock_date",
            "stock_price",
            "stock_volume",
            "stock_id",
            "stock_id__stock_name",
            "stock_id__stock_symbol"
        )
    )

    return JsonResponse({
        "pricedata": pricedata
    })


@csrf_exempt
def deletestockprice(request, spid):
    tbl_stockprice.objects.get(id=spid).delete()
    return JsonResponse({
        "message": "Deleted successfully"
    })




@csrf_exempt
def placeorder(request):
    if request.method == "POST":
        data = json.loads(request.body)

        user_id = data.get("user_id")
        stock_id = data.get("stock_id")
        order_type = data.get("order_type")
        quantity = int(data.get("order_quantity"))
        price = Decimal(str(data.get("order_price")))

        user = tbl_users.objects.get(id=user_id)
        stock = tbl_stock.objects.get(id=stock_id)

        total_amount = quantity * price

        # ---------- BUY ----------
        if order_type == "buy":
            wallet = tbl_wallet.objects.filter(user_id=user_id).first()

            if not wallet:
                return JsonResponse({
                    "message": "Wallet not found"
                }, status=400)

            if wallet.wallet_balance < total_amount:
                return JsonResponse({
                    "message": "Insufficient wallet balance"
                }, status=400)

            wallet.wallet_balance = wallet.wallet_balance - total_amount
            wallet.save()

            tbl_order.objects.create(
                order_type="buy",
                order_quantity=quantity,
                order_price=price,
                order_status=1,
                order_user_id=user,
                order_stock_id=stock
            )

            return JsonResponse({
                "message": "Buy order placed successfully"
            })

        # ---------- SELL ----------
        elif order_type == "sell":
            tbl_order.objects.create(
                order_type="sell",
                order_quantity=quantity,
                order_price=price,
                order_status=1,
                order_user_id=user,
                order_stock_id=stock
            )

            return JsonResponse({
                "message": "Sell order placed successfully"
            })

        return JsonResponse({
            "message": "Invalid order type"
        }, status=400)

    return JsonResponse({
        "message": "Invalid request"
    }, status=405)



@csrf_exempt
def myorders(request, uid):
    orderdata = list(
        tbl_order.objects.filter(order_user_id=uid).values(
            "id",
            "order_type",
            "order_quantity",
            "order_price",
            "order_status",
            "order_datetime",
            "order_stock_id",
            "order_stock_id__stock_name",
            "order_stock_id__stock_symbol"
        ).order_by("-id")
    )

    return JsonResponse({
        "orderdata": orderdata
    })