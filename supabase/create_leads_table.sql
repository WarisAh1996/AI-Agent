-- First, drop everything to start clean
drop table if exists leads cascade;

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create the leads table
create table leads (
    id uuid primary key default uuid_generate_v4(),
    first_name text not null,
    last_name text not null,
    email text not null,
    company text not null,
    message text,
    status text default 'new',
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create indexes for better performance
create index if not exists leads_email_idx on leads(email);
create index if not exists leads_status_idx on leads(status);
create index if not exists leads_created_at_idx on leads(created_at);

-- Grant necessary permissions BEFORE enabling RLS
grant usage on schema public to anon, authenticated;
grant all on leads to anon, authenticated;

-- Enable RLS
alter table leads enable row level security;

-- Create a single policy for all operations
create policy "Enable all access to leads"
    on leads
    for all
    to anon, authenticated
    using (true)
    with check (true);

-- Verify the setup
select tablename, policyname, permissive, roles, cmd, qual, with_check 
from pg_policies 
where tablename = 'leads';

-- Try a test insert
insert into leads (first_name, last_name, email, company, message)
values ('Test', 'User', 'test@example.com', 'Test Corp', 'Test message')
returning *;
