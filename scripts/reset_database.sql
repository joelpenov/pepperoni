

SET SQL_SAFE_UPDATES = 0;
DELETE FROM crunchy.inventory_transactiondetail;
DELETE FROM crunchy.inventory_transaction;
DELETE FROM crunchy.inventory_stock;
DELETE FROM crunchy.sales_ordernumber;
DELETE FROM crunchy.sales_orderdetail;
DELETE FROM crunchy.sales_order;
DELETE FROM crunchy.sales_cashiershiftmoneydetail;
DELETE FROM crunchy.sales_cashiershift;
SET SQL_SAFE_UPDATES = 1;