const recursionCategory = (data, id_parent = null) => {
  const treeData = [];
  data.forEach((item) => {
    if (item.parent_id === id_parent) {
      const children = recursionCategory(data, item.id);
      const node = {
        value: Number(item.id),
        title: item.name,
        ...(children.length > 0 && { children }),
      };
      treeData.push(node);
    }
  });
  return treeData;
};

module.exports = recursionCategory;
