import { AppDataSource } from "../../ormconfig";
import { Category } from "../../entities/prompt/Category";

// 📝 Create Category
export const createCategoryService = async (name: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);

  // Prevent duplicate category name
  const existing = await categoryRepo.findOne({ where: { name } });
  if (existing) throw new Error("Category with this name already exists");

  const category = categoryRepo.create({ name: name.trim() });
  await categoryRepo.save(category);

  return category;
};

// 📝 Get All Categories
export const getCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.find({
    order: { name: "ASC" },
  });
};

// 📝 Get Single Category by ID
export const getCategoryByIdService = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  return await categoryRepo.findOne({ where: { id } });
};

// 📝 Update Category
export const updateCategoryService = async (id: string, name: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.findOne({ where: { id } });

  if (!category) throw new Error("Category not found");

  category.name = name.trim();
  await categoryRepo.save(category);

  return category;
};

// 📝 Delete Category
export const deleteCategoryService = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.findOne({ where: { id } });

  if (!category) throw new Error("Category not found");

  await categoryRepo.remove(category);
  return { message: "Category deleted successfully" };
};
