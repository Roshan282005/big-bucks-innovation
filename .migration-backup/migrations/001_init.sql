-- Big Bucks Postgres Schema

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid TEXT UNIQUE,
  name TEXT,
  email TEXT UNIQUE,
  role TEXT
);

-- Insert dataset
INSERT INTO users (uid, name, email, role) VALUES 
('google-firebase-admin', 'Admin', 'admin@bigbucks.com', 'admin')
ON CONFLICT (email) DO NOTHING;

