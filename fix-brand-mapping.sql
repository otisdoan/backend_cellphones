-- Fix brand_id mapping for products
-- This script fixes incorrect brand_id assignments

BEGIN;

-- First, let's see current brand IDs (for reference)
-- iPhone should be brand_id 2
-- Samsung should be brand_id 3  
-- Xiaomi should be brand_id 4

-- Fix iPhone products (should be brand_id 2)
UPDATE products SET brand_id = 2 WHERE name LIKE '%iPhone%' AND brand_id != 2;

-- Fix Samsung products (should be brand_id 3)
UPDATE products SET brand_id = 3 WHERE name LIKE '%Samsung%' AND brand_id != 3;

-- Fix Xiaomi products (should be brand_id 4)
UPDATE products SET brand_id = 4 WHERE name LIKE '%Xiaomi%' AND brand_id != 4;

-- Fix OPPO products
UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'OPPO' LIMIT 1) 
WHERE name LIKE '%OPPO%';

-- Fix Google Pixel (create Google brand if not exists)
INSERT INTO brands (name, slug, logo_url) 
VALUES ('Google', 'google', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'Google' LIMIT 1)
WHERE name LIKE '%Google Pixel%' OR name LIKE '%Pixel%';

-- Fix ASUS products
INSERT INTO brands (name, slug, logo_url)
VALUES ('ASUS', 'asus', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'ASUS' LIMIT 1)
WHERE name LIKE '%ASUS%';

-- Fix Vivo products
INSERT INTO brands (name, slug, logo_url)
VALUES ('vivo', 'vivo', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'vivo' LIMIT 1)
WHERE name LIKE '%Vivo%';

-- Fix Sony products
INSERT INTO brands (name, slug, logo_url)
VALUES ('Sony', 'sony', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'Sony' LIMIT 1)
WHERE name LIKE '%Sony%';

-- Fix Infinix products
INSERT INTO brands (name, slug, logo_url)
VALUES ('Infinix', 'infinix', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'Infinix' LIMIT 1)
WHERE name LIKE '%Infinix%';

-- Fix Realme products
INSERT INTO brands (name, slug, logo_url)
VALUES ('realme', 'realme', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'realme' LIMIT 1)
WHERE name LIKE '%Realme%' OR name LIKE '%realme%';

-- Fix OnePlus products
INSERT INTO brands (name, slug, logo_url)
VALUES ('OnePlus', 'oneplus', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'OnePlus' LIMIT 1)
WHERE name LIKE '%OnePlus%';

-- Fix HONOR products
INSERT INTO brands (name, slug, logo_url)
VALUES ('HONOR', 'honor', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'HONOR' LIMIT 1)
WHERE name LIKE '%HONOR%';

-- Fix Motorola products
INSERT INTO brands (name, slug, logo_url)
VALUES ('Motorola', 'motorola', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'Motorola' LIMIT 1)
WHERE name LIKE '%Motorola%';

-- Fix Tecno products
INSERT INTO brands (name, slug, logo_url)
VALUES ('Tecno', 'tecno', NULL)
ON CONFLICT (name) DO NOTHING;

UPDATE products SET brand_id = (SELECT id FROM brands WHERE name = 'Tecno' LIMIT 1)
WHERE name LIKE '%Tecno%';

COMMIT;

-- Verify results
SELECT 
  p.id,
  p.name,
  b.name as brand_name
FROM products p
JOIN brands b ON b.id = p.brand_id
WHERE p.id IN (71, 75, 79, 93, 95, 105)
ORDER BY p.id;
