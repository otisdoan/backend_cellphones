const { getBrandByCategory } = require("../repositories/brand.repository");
const { getProductFeatured } = require("../repositories/product.repository");

const menuSmartPhoneService = async () => {
  const result = [];
  const brandSmartphone = await getBrandByCategory();
  result.push({ title: "Hãng điện thoại", content: brandSmartphone });
  result.push({
    title: "Mức giá điện thoại",
    content: [
      { name: "Dưới 2 triệu" },
      { name: "Từ 2 - 4 triệu" },
      { name: "Từ 4 - 7 triệu" },
      { name: "Từ 7 - 13 triệu" },
      { name: "Từ 13 - 20 triệu" },
      { name: "Trên 20 triệu" },
    ],
  });
  const productFeatured = await getProductFeatured();
  result.push({ title: "Điện thoại HOT", content: productFeatured });
  return result;
};

module.exports = {
  menuSmartPhoneService,
};
