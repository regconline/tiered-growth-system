-- REGC Digital billing schema (Paystack + automatic invoices)
-- Run once in Supabase → SQL editor. Safe to run in an existing project:
-- every object is prefixed with "billing_".

create extension if not exists pgcrypto;

create sequence if not exists billing_invoice_seq start 1;

create table if not exists billing_invoices (
  id                 uuid primary key default gen_random_uuid(),
  number             text not null unique default ('INV-' || lpad(nextval('billing_invoice_seq')::text, 4, '0')),
  kind               text not null check (kind in ('deposit', 'balance', 'once_off', 'subscription')),
  status             text not null default 'unpaid' check (status in ('unpaid', 'paid', 'void')),
  client_name        text not null,
  client_email       text not null,
  practice           text,
  description        text,
  items              jsonb not null default '[]'::jsonb,   -- [{ "description": text, "amount_cents": int }]
  amount_cents       integer not null check (amount_cents > 0),
  currency           text not null default 'ZAR',
  due_date           date,
  pay_token          text unique,                          -- secret for the client's pay link
  parent_id          uuid references billing_invoices(id), -- balance invoice → its deposit
  meta               jsonb not null default '{}'::jsonb,   -- e.g. project_total_cents, plan_key
  paystack_reference text unique,                          -- set when paid; prevents duplicates
  paystack_plan      text,
  paid_at            timestamptz,
  emailed_at         timestamptz,
  created_at         timestamptz not null default now()
);

create index if not exists billing_invoices_created_idx on billing_invoices (created_at desc);
create index if not exists billing_invoices_email_idx on billing_invoices (lower(client_email));

create table if not exists billing_plans (
  key          text primary key,     -- e.g. "seo-services:standard"
  plan_code    text not null,        -- Paystack PLN_xxx
  name         text not null,
  amount_cents integer not null,
  created_at   timestamptz not null default now()
);

-- Lock everything down: only the server (service role key) can read or write.
alter table billing_invoices enable row level security;
alter table billing_plans    enable row level security;
revoke all on billing_invoices, billing_plans from anon, authenticated;
revoke all on sequence billing_invoice_seq from anon, authenticated;
