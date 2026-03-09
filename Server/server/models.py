from django.db import models


# -------------------------
# admin
# -------------------------
class tbl_admin(models.Model):
    admin_name = models.CharField(max_length=50)
    admin_password = models.CharField(max_length=50)
    admin_email = models.EmailField(max_length=50)


# -------------------------
# users
# -------------------------
class tbl_users(models.Model):
    user_name = models.CharField(max_length=50)
    user_email = models.EmailField(max_length=50)
    user_contact = models.CharField(max_length=50)
    user_address = models.CharField(max_length=200)
    user_password = models.CharField(max_length=50)
    user_photo = models.FileField(upload_to="assets/user/", null=True)


# -------------------------
# company
# -------------------------
class tbl_company(models.Model):
    company_name = models.CharField(max_length=50)
    company_email = models.CharField(max_length=50,null=True)
    company_password = models.CharField(max_length=50,null=True)
    company_details = models.CharField(max_length=200)

    company_proof = models.FileField(upload_to="assets/company/")
    company_photo = models.FileField(upload_to="assets/company/", null=True)
    company_license = models.FileField(upload_to="assets/company/")

    company_status = models.IntegerField(default=0)
    # 0 pending
    # 1 approved
    # 2 rejected
    # 3 blocked


# -------------------------
# category
# -------------------------
class tbl_category(models.Model):
    category_name = models.CharField(max_length=100)


# -------------------------
# stock
# -------------------------
class tbl_stock(models.Model):
    stock_symbol = models.CharField(max_length=20)
    stock_name = models.CharField(max_length=100, null=True)

    stock_status = models.IntegerField(default=1)
    # 0 inactive
    # 1 active

    company_id = models.ForeignKey(tbl_company, on_delete=models.CASCADE)
    category_id = models.ForeignKey(tbl_category, on_delete=models.CASCADE)


# -------------------------
# stock price (history)
# -------------------------
class tbl_stockprice(models.Model):
    stock_id = models.ForeignKey(tbl_stock, on_delete=models.CASCADE)

    stock_date = models.DateField()
    stock_price = models.DecimalField(max_digits=12, decimal_places=2)
    stock_volume = models.IntegerField()


# -------------------------
# wallet
# -------------------------
class tbl_wallet(models.Model):
    user_id = models.ForeignKey(tbl_users, on_delete=models.CASCADE)
    wallet_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)


# -------------------------
# order
# -------------------------
class tbl_order(models.Model):
    order_type = models.CharField(max_length=10)
    # buy / sell

    order_quantity = models.IntegerField()
    order_price = models.DecimalField(max_digits=12, decimal_places=2)

    order_status = models.IntegerField(default=0)
    # 0 pending
    # 1 executed
    # 2 cancelled

    order_datetime = models.DateTimeField(auto_now_add=True)

    order_user_id = models.ForeignKey(tbl_users, on_delete=models.CASCADE)
    order_stock_id = models.ForeignKey(tbl_stock, on_delete=models.CASCADE)


# -------------------------
# trade
# -------------------------
class tbl_trade(models.Model):
    trade_executeprice = models.DecimalField(max_digits=12, decimal_places=2)
    trade_quantity = models.IntegerField()

    trade_datetime = models.DateTimeField(auto_now_add=True)

    trade_order_id = models.ForeignKey(tbl_order, on_delete=models.CASCADE)


# -------------------------
# wallet transaction
# -------------------------
class tbl_wallettransaction(models.Model):
    wallet_id = models.ForeignKey(tbl_wallet, on_delete=models.CASCADE)

    wallettransaction_type = models.CharField(max_length=10)
    # credit / debit

    wallettransaction_amount = models.DecimalField(max_digits=12, decimal_places=2)

    wallettransaction_order_id = models.ForeignKey(tbl_order, on_delete=models.CASCADE)

    wallettransaction_timedate = models.DateTimeField(auto_now_add=True)


# -------------------------
# portfolio (holdings)
# -------------------------
class tbl_portfolio(models.Model):
    user_id = models.ForeignKey(tbl_users, on_delete=models.CASCADE)
    stock_id = models.ForeignKey(tbl_stock, on_delete=models.CASCADE)

    portfolio_quantity = models.IntegerField(default=0)
    portfolio_averageprice = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    portfolio_status = models.IntegerField(default=1)
    # 0 inactive
    # 1 active