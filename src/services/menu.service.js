const { getBrandByCategory } = require("../repositories/brand.repository");
const { getProductFeatured } = require("../repositories/product.repository");

const menuSmartPhoneService = async () => {
  const result = [];
  const brandSmartphone = await getBrandByCategory(9);
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
  const productSmartphoneFeatured = await getProductFeatured(9);
  result.push({ title: "Điện thoại HOT", content: productSmartphoneFeatured });
  const brandTablet = await getBrandByCategory(36);
  result.push({ title: "Hãng máy tính bảng", content: brandTablet });
  const productTabletFeatured = await getProductFeatured(36);
  result.push({ title: "Máy tính bảng HOT", content: productTabletFeatured });
  return result;
};

module.exports = {
  menuSmartPhoneService,
};
