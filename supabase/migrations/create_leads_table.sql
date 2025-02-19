-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create leads table
create table if not exists leads (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  company text not null,
  message text,
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create index on email for faster lookups
create index if not exists leads_email_idx on leads(email);

-- Create index on status for filtering
create index if not exists leads_status_idx on leads(status);

-- Add row level security (RLS) policies
alter table leads enable row level security;

-- Allow anonymous users to insert leads
create policy "Allow anonymous lead creation"
on leads for insert
to anon
with check (true);

-- Allow authenticated users to view all leads
create policy "Allow authenticated users to view leads"
on leads for select
to authenticated
using (true);
