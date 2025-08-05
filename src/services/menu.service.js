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

const menuLaptopService = async () => {
  const result = [];
  const brandLatop = await getBrandByCategory(38);
  result.push({ title: "Thương hiệu", content: brandLatop });
  result.push(
    {
      title: "Phân khúc giá",
      content: [
        { name: "Dưới 10 triệu" },
        { name: "Từ 10 - 15 triệu" },
        { name: "Từ 15 - 20 triệu" },
        { name: "Từ 20 - 25 triệu" },
        { name: "Từ 25 - 30 triệu" },
      ],
    },
    {
      title: "Nhu cầu sử dụng",
      content: [
        { name: "Văn phòng" },
        { name: "Gaming" },
        { name: "Mỏng nhẹ" },
        { name: "Đồ họa - kỹ thuật" },
        { name: "Sinh viên" },
        { name: "Cảm ứng" },
        { name: "Laptop AI", tag: "MỚI" },
        { name: "Mac CTO – Nâng cấp theo cách của bạn", tag: "HOT" },
      ],
    },
    {
      title: "Dòng chip",
      content: [
        { name: "Laptop Core i3" },
        { name: "Laptop Core i5" },
        { name: "Laptop Core i7" },
        { name: "Laptop Core i9" },
        { name: "Apple M1 Series" },
        { name: "Apple M3 Series", tag: "MỚI" },
        { name: "Apple M4 Series" },
        { name: "AMD Ryzen" },
        { name: "Intel Core Ultra", tag: "HOT" },
      ],
    },
    {
      title: "Kích thước màn hình",
      content: [
        { name: "Laptop 12 inch" },
        { name: "Laptop 13 inch" },
        { name: "Laptop 14 inch" },
        { name: "Laptop 15.6 inch" },
        { name: "Laptop 16 inch" },
      ],
    }
  );
  return result;
};
module.exports = {
  menuSmartPhoneService,
  menuLaptopService,
};
