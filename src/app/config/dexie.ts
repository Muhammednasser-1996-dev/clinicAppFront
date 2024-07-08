export var dexieConfig = {

  // name of database of dexie
  db_name: "sales_pos",

  // version of database
  db_version: 3,

  // table structures
  table_migrations: {

    // brand table structure
    brands: "&id, name, description, created_by, created_at, updated_at, local_changed, __deleted_at",

    // categories table structure
    categories: "&id, name, short_code, parent_id, printer_id, category_type, created_by, created_at, updated_at, local_changed, __deleted_at",

    // contacts table structure
    contacts: "&id, name, type, created_by, supplier_business_name, email, city, tax_number, state, country, address_line_1, address_line_2, zip_code, dob, mobile, landline, alternate_number, pay_term_number, pay_term_type, credit_limit, converted_by, converted_on, balance, total_rp, total_rp_used, total_rp_expired, is_default, shipping_address, shipping_custom_field_details, is_export, position, customer_group_id, custom_field1, custom_field2, custom_field3, custom_field4, custom_field5, custom_field6, custom_field7, custom_field8, custom_field9, custom_field10, contact_status, contact_id, last_name, middle_name, first_name, prefix, account_id, created_at, updated_at, local_changed, __deleted_at",

    // location table structure
    locations: "&id, location_id, name, landmark, country, state, city, zip_code, invoice_scheme_id, invoice_layout_id, sale_invoice_layout_id, selling_price_group_id, print_receipt_on_invoice, receipt_printer_type, printer_id, mobile, alternate_number, email, website, featured_products, is_active, default_payment_accounts, custom_field1, custom_field2, custom_field3, custom_field4, created_at, updated_at, local_changed, __deleted_at",

    // printers table structure
    printers: "&id, name, location_id, description, ip_address, port, connection_type, created_by, created_at, updated_at, local_changed, __deleted_at",

    // products table structure
    products: "&id, name, type, unit_id, sub_unit_ids, brand_id, category_id, sub_category_id, tax, tax_type, enable_stock, alert_quantity, sku, barcode_type, expiry_period, expiry_period_type, enable_sr_no, weight, product_custom_field1, product_custom_field2, product_custom_field3, product_custom_field4, image, product_description, warranty_id, is_inactive, not_for_selling, dpp_inc_tax, profit_percent, default_sell_price, sell_price_inc_tax, default_purchase_price, image_url, *media, variation_id, *warehouses_ids, *product_location_ids, created_by, created_at, updated_at, local_changed, __deleted_at",

    // res tables table structure
    res_tables: "&id, name, location_id, description, created_at, updated_at, local_changed, __deleted_at",

    // taxes table structure
    taxes: "&id, name, amount, created_by, created_at, updated_at, local_changed, __deleted_at",

    // units table structure
    units: "&id, actual_name, short_name, allow_decimal, created_by, created_at, updated_at, local_changed, __deleted_at",

    // warehouses table structure
    warehouses: "&id, name, location_id, description, image, created_at, updated_at, local_changed, __deleted_at",

    // stock of product table structure
    product_stock: "&id, product_id, variation_id, location_id, warehouse_id, qty_available, created_at, updated_at, local_changed, __deleted_at",

    // transactions table structure
    transactions: "&id, contact_id, *sell_lines, *purchase_lines, *payment_lines, type, sub_type, payment_status, status, sub_status, transaction_date, final_total, tax_id, tax_amount, ref_no, additional_notes, invoice_layout_id, invoice_scheme_id, packing_charge, is_suspend, *res_details, *sales_order_ids, log, service_custom_field_1, discount_type, discount_amount, res_table_id, res_waiter_id, location_id, created_by, created_at, updated_at, local_changed, __deleted_at",

    // users table structure
    users: "&id, name, first_name, address, *location_ids, *warehouse_ids, allow_login, alt_number, api_token, bank_details, blood_group, cmmsn_percent, contact_no, contact_number, crm_contact_id, current_address, custom_field_1, custom_field_2, custom_field_3, custom_field_4, dob, email, essentials_department_id, essentials_designation_id, essentials_pay_cycle, essentials_pay_period, essentials_salary, family_number, fb_link, guardian_name, id_proof_name, id_proof_number, is_cmmsn_agnt, job_type, language, last_name, marital_status, max_sales_discount_percent, permanent_address, selected_contacts, settings, social_media_1, social_media_2, status, surname, twitter_link, user_type, username, created_by, created_at, updated_at, local_changed, __deleted_at",
  },

}
