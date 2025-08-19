-- USERS
create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  role text,
  created_at timestamp default now()
);

-- PARTNERS
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text,
  logo_url text,
  owner_id uuid references users(id),
  created_at timestamp default now()
);

-- PRODUCTS
create table products (
  id uuid primary key default gen_random_uuid(),
  name text,
  price numeric,
  image_url text,
  partner_id uuid references partners(id),
  created_at timestamp default now()
);

-- ORDERS
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  partner_id uuid references partners(id),
  total numeric,
  status text,
  created_at timestamp default now()
);

-- LOYALTY POINTS
create table loyalty_points (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  partner_id uuid references partners(id),
  points integer,
  updated_at timestamp default now()
);
