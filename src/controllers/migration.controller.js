const sequelize = require("../configs/database.config");

/**
 * Fix brand_id mapping for products
 * One-time migration to correct incorrect brand assignments
 */
const fixBrandMapping = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    console.log("🔧 Starting brand mapping fix...");

    // Strategy: Update products based on their name patterns
    // Assuming: brand_id 2=iPhone, 3=Samsung, 4=Xiaomi from existing correct products

    const fixes = [
      { pattern: "%iPhone%", brandId: 2, name: "iPhone" },
      { pattern: "%Samsung%", brandId: 3, name: "Samsung" },
      { pattern: "%Xiaomi%", brandId: 4, name: "Xiaomi" },
      // For others, we'll find brand_id from existing correct entries or use fallback
      { pattern: "%OPPO%", brandId: null, name: "OPPO" },
      { pattern: "%Google%", brandId: null, name: "Google" },
      { pattern: "%ASUS%", brandId: null, name: "ASUS" },
      { pattern: "%Vivo%", brandId: null, name: "vivo" },
      { pattern: "%Sony%", brandId: null, name: "Sony" },
      { pattern: "%Infinix%", brandId: null, name: "Infinix" },
      { pattern: "%realme%", brandId: null, name: "realme" },
      { pattern: "%OnePlus%", brandId: null, name: "OnePlus" },
      { pattern: "%HONOR%", brandId: null, name: "HONOR" },
      { pattern: "%Motorola%", brandId: null, name: "Motorola" },
      { pattern: "%Tecno%", brandId: null, name: "Tecno" },
      { pattern: "%LG%", brandId: null, name: "LG" },
      { pattern: "%Dell%", brandId: null, name: "Dell" },
      { pattern: "%GoPro%", brandId: null, name: "GoPro" },
      { pattern: "%DJI%", brandId: null, name: "DJI" },
      { pattern: "%Insta360%", brandId: null, name: "Insta360" },
      { pattern: "%Sunhouse%", brandId: null, name: "Sunhouse" },
      { pattern: "%Huawei%", brandId: null, name: "Huawei" },
      { pattern: "%Boox%", brandId: null, name: "Boox" },
      { pattern: "%Nubia%", brandId: null, name: "Nubia" },
      { pattern: "%Mac%", brandId: null, name: "Mac" },
      { pattern: "%iPad%", brandId: null, name: "iPad" },
    ];

    let totalUpdated = 0;

    for (const fix of fixes) {
      let brandId = fix.brandId;

      // If brandId not provided, look it up
      if (!brandId) {
        const [brandResult] = await sequelize.query(
          `SELECT id FROM brands WHERE name = :name LIMIT 1`,
          { replacements: { name: fix.name }, transaction }
        );

        if (brandResult.length > 0) {
          brandId = brandResult[0].id;
        } else {
          // Brand doesn't exist, create it
          const [insertResult] = await sequelize.query(
            `INSERT INTO brands (name, slug, created_at, updated_at) 
             VALUES (:name, :slug, NOW(), NOW()) RETURNING id`,
            {
              replacements: {
                name: fix.name,
                slug: fix.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              },
              transaction,
            }
          );
          brandId = insertResult[0].id;
          console.log(`   Created brand: ${fix.name} (ID: ${brandId})`);
        }
      }

      // Update products
      const [updateResult] = await sequelize.query(
        `UPDATE products SET brand_id = :brandId WHERE name LIKE :pattern AND brand_id != :brandId`,
        {
          replacements: { brandId, pattern: fix.pattern },
          transaction,
        }
      );

      const rowCount = updateResult[1] || 0;
      if (rowCount > 0) {
        console.log(`✅ Updated ${rowCount} ${fix.name} products`);
        totalUpdated += rowCount;
      }
    }

    // Commit transaction
    await transaction.commit();

    // Verify results
    const [verifyResults] = await sequelize.query(
      `SELECT 
        p.id,
        p.name,
        b.name as brand_name
       FROM products p
       JOIN brands b ON b.id = p.brand_id
       WHERE p.id IN (71, 75, 79, 93, 95, 105)
       ORDER BY p.id`
    );

    console.log(
      `✅ Brand mapping fix completed. Updated ${totalUpdated} products.`
    );

    return res.status(200).json({
      status: "success",
      message: `Brand mapping fixed successfully. Updated ${totalUpdated} products.`,
      verified_products: verifyResults,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error fixing brand mapping:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fix brand mapping",
      error: error.message,
    });
  }
};

module.exports = {
  fixBrandMapping,
};
