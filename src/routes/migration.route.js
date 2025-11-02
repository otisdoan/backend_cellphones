const express = require("express");
const router = express.Router();
const {
  fixBrandMapping,
} = require("../controllers/migration.controller.simple");

// POST /api/migrations/fix-brand-mapping
router.post("/fix-brand-mapping", fixBrandMapping);

module.exports = router;
