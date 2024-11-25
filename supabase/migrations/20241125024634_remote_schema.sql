alter table "public"."payment" drop constraint "payment_mail_id_key";

drop index if exists "public"."payment_mail_id_key";

alter table "public"."payment" drop column "mail_id";


