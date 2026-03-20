BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "server_tbl_admin" (
	"id"	integer NOT NULL,
	"admin_name"	varchar(50) NOT NULL,
	"admin_password"	varchar(50) NOT NULL,
	"admin_email"	varchar(50) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "server_tbl_category" (
	"id"	integer NOT NULL,
	"category_name"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "server_tbl_company" (
	"id"	integer NOT NULL,
	"company_name"	varchar(50) NOT NULL,
	"company_details"	varchar(200) NOT NULL,
	"company_proof"	varchar(100) NOT NULL,
	"company_photo"	varchar(100),
	"company_license"	varchar(100) NOT NULL,
	"company_status"	integer NOT NULL,
	"company_email"	varchar(50),
	"company_password"	varchar(50),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "server_tbl_order" (
	"id"	integer NOT NULL,
	"order_type"	varchar(10) NOT NULL,
	"order_quantity"	integer NOT NULL,
	"order_price"	decimal NOT NULL,
	"order_status"	integer NOT NULL,
	"order_datetime"	datetime NOT NULL,
	"order_stock_id_id"	bigint NOT NULL,
	"order_user_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("order_stock_id_id") REFERENCES "server_tbl_stock"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("order_user_id_id") REFERENCES "server_tbl_users"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "server_tbl_portfolio" (
	"id"	integer NOT NULL,
	"portfolio_quantity"	integer NOT NULL,
	"portfolio_averageprice"	decimal NOT NULL,
	"portfolio_status"	integer NOT NULL,
	"stock_id_id"	bigint NOT NULL,
	"user_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("stock_id_id") REFERENCES "server_tbl_stock"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id_id") REFERENCES "server_tbl_users"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "server_tbl_stock" (
	"id"	integer NOT NULL,
	"stock_symbol"	varchar(20) NOT NULL,
	"stock_name"	varchar(100),
	"stock_status"	integer NOT NULL,
	"category_id_id"	bigint NOT NULL,
	"company_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category_id_id") REFERENCES "server_tbl_category"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("company_id_id") REFERENCES "server_tbl_company"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "server_tbl_stockprice" (
	"id"	integer NOT NULL,
	"stock_date"	date NOT NULL,
	"stock_price"	decimal NOT NULL,
	"stock_volume"	integer NOT NULL,
	"stock_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("stock_id_id") REFERENCES "server_tbl_stock"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "server_tbl_trade" (
	"id"	integer NOT NULL,
	"trade_executeprice"	decimal NOT NULL,
	"trade_quantity"	integer NOT NULL,
	"trade_datetime"	datetime NOT NULL,
	"trade_order_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("trade_order_id_id") REFERENCES "server_tbl_order"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "server_tbl_users" (
	"id"	integer NOT NULL,
	"user_name"	varchar(50) NOT NULL,
	"user_email"	varchar(50) NOT NULL,
	"user_contact"	varchar(50) NOT NULL,
	"user_address"	varchar(200) NOT NULL,
	"user_password"	varchar(50) NOT NULL,
	"user_photo"	varchar(100),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "server_tbl_wallet" (
	"id"	integer NOT NULL,
	"wallet_balance"	decimal NOT NULL,
	"user_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id_id") REFERENCES "server_tbl_users"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "server_tbl_wallettransaction" (
	"id"	integer NOT NULL,
	"wallettransaction_type"	varchar(10) NOT NULL,
	"wallettransaction_amount"	decimal NOT NULL,
	"wallettransaction_timedate"	datetime NOT NULL,
	"wallet_id_id"	bigint NOT NULL,
	"wallettransaction_order_id_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("wallet_id_id") REFERENCES "server_tbl_wallet"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("wallettransaction_order_id_id") REFERENCES "server_tbl_order"("id") DEFERRABLE INITIALLY DEFERRED
);
INSERT INTO "server_tbl_category" VALUES (1,'car');
INSERT INTO "server_tbl_category" VALUES (2,'Bike');
INSERT INTO "server_tbl_company" VALUES (1,'AJ','car','assets/company/zaha_hadid.jpg','assets/company/zaha_hadid_lEgvVEJ.jpg','assets/company/zaha_hadid_YT9qSUQ.jpg',1,NULL,NULL);
INSERT INTO "server_tbl_users" VALUES (1,'Abi Joy','abi@gmail.com','9878897889','hjhfhjgjkhkj','123qwe!@#QWE','assets/user/download_2.jpg');
CREATE INDEX IF NOT EXISTS "server_tbl_order_order_stock_id_id_b04407ac" ON "server_tbl_order" (
	"order_stock_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_order_order_user_id_id_88aeccec" ON "server_tbl_order" (
	"order_user_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_portfolio_stock_id_id_8b2ca72d" ON "server_tbl_portfolio" (
	"stock_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_portfolio_user_id_id_d56c36eb" ON "server_tbl_portfolio" (
	"user_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_stock_category_id_id_7d814fb5" ON "server_tbl_stock" (
	"category_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_stock_company_id_id_9641d209" ON "server_tbl_stock" (
	"company_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_stockprice_stock_id_id_7df91036" ON "server_tbl_stockprice" (
	"stock_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_trade_trade_order_id_id_91583070" ON "server_tbl_trade" (
	"trade_order_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_wallet_user_id_id_0183d1b9" ON "server_tbl_wallet" (
	"user_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_wallettransaction_wallet_id_id_49d3ae2c" ON "server_tbl_wallettransaction" (
	"wallet_id_id"
);
CREATE INDEX IF NOT EXISTS "server_tbl_wallettransaction_wallettransaction_order_id_id_fc65b7e3" ON "server_tbl_wallettransaction" (
	"wallettransaction_order_id_id"
);
COMMIT;
