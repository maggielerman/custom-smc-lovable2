-- Add a customization column to books table
alter table books
  add column customization jsonb;
