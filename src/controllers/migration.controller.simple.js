const sequelize = require("../configs/database.config");

/**
 * Simple fix for wrong brand_ids
 * Only fixes products where brand name in product name doesn't match brand_id
 */
const fixBrandMapping = async (req, res) => {
  try {
    console.log("🔧 Starting brand mapping fix (simple approach)...");

    // Simple direct updates without creating new brands
    // Just fix the ones we know are wrong

    const updates = [];

    // Fix iPhone products -> brand_id 2
    const [result1] = await sequelize.query(
      `UPDATE products SET brand_id = 2 
       WHERE name LIKE '%iPhone%' AND brand_id != 2 
       RETURNING id`
    );
    updates.push({ brand: "iPhone", count: result1[1] });
    console.log(`✅ Fixed ${result1[1]} iPhone products`);

    // Fix Samsung products -> brand_id 3
    const [result2] = await sequelize.query(
      `UPDATE products SET brand_id = 3 
       WHERE name LIKE '%Samsung%' AND brand_id != 3
       RETURNING id`
    );
    updates.push({ brand: "Samsung", count: result2[1] });
    console.log(`✅ Fixed ${result2[1]} Samsung products`);

    // Fix Xiaomi products -> brand_id 4
    const [result3] = await sequelize.query(
      `UPDATE products SET brand_id = 4 
       WHERE name LIKE '%Xiaomi%' AND brand_id != 4
       RETURNING id`
    );
    updates.push({ brand: "Xiaomi", count: result3[1] });
    console.log(`✅ Fixed ${result3[1]} Xiaomi products`);

    // Verify results
    const [verifyResults] = await sequelize.query(
      `SELECT 
        p.id,
        p.name,
        b.name as brand_name
       FROM products p
       JOIN brands b ON b.id = p.brand_id
       WHERE p.id IN (71, 75, 79, 81, 82, 89, 93, 95, 105)
       ORDER BY p.id`
    );

    const totalUpdated = updates.reduce((sum, u) => sum + u.count, 0);
    console.log(
      `✅ Brand mapping fix completed. Updated ${totalUpdated} products.`
    );

    return res.status(200).json({
      status: "success",
      message: `Fixed ${totalUpdated} products`,
      updates,
      verified_products: verifyResults,
    });
  } catch (error) {
    console.error("❌ Error fixing brand mapping:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to fix brand mapping",
      error: error.message,
      stack: error.stack,
    });
  }
};

module.exports = {
  fixBrandMapping,
};
