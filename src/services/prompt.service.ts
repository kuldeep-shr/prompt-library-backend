import { ILike } from "typeorm";
import { AppDataSource } from "../../ormconfig";
import { Prompt } from "../../entities/prompt/Prompt";
import { Category } from "../../entities/prompt/Category";
import { User } from "../../entities/user/User";

interface PromptInput {
  title: string;
  body: string;
  categoryId: string;
  userId: string;
}

interface PromptQuery {
  category?: string;
  search?: string;
}

// 📝 Create Prompt
export const createPromptService = async ({
  title,
  body,
  categoryId,
  userId,
}: PromptInput) => {
  const promptRepo = AppDataSource.getRepository(Prompt);
  const categoryRepo = AppDataSource.getRepository(Category);
  const userRepo = AppDataSource.getRepository(User);

  // Step 1: Validate user
  const user = await userRepo.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  // Step 2: Validate category
  const category = await categoryRepo.findOneBy({ id: categoryId });
  if (!category) throw new Error("Category not found");

  // Step 3: Prevent duplicate title
  const existingPrompt = await promptRepo.findOne({
    where: { title, created_by: { id: userId } },
  });
  if (existingPrompt) {
    return {
      isNew: false,
      message: "Prompt with this title already exists",
      prompt: existingPrompt,
    };
  }

  // Step 4: Save prompt
  const newPrompt = promptRepo.create({
    title: title.trim(),
    body: body.trim(),
    category,
    created_by: user,
  });

  await promptRepo.save(newPrompt);

  return {
    isNew: true,
    message: "Prompt created successfully",
    prompt: newPrompt,
  };
};

// 📝 Get All Prompts (with search & filter)
export const getPromptsService = async (
  userId: string,
  { category, search }: PromptQuery
) => {
  const promptRepo = AppDataSource.getRepository(Prompt);

  const where: any = { created_by: { id: userId } };

  if (category) {
    where.category = { name: ILike(`%${category}%`) }; // fuzzy match on category name
  }

  if (search) {
    where.title = ILike(`%${search}%`); // fuzzy search on title
  }

  const prompts = await promptRepo.find({
    where,
    relations: ["category"],
    order: { createdAt: "DESC" },
  });

  return prompts;
};

// 📝 Get Single Prompt by ID
export const getPromptByIdService = async (id: string, userId: string) => {
  const promptRepo = AppDataSource.getRepository(Prompt);

  const prompt = await promptRepo.findOne({
    where: { id, created_by: { id: userId } },
    relations: ["category"],
  });

  if (!prompt) throw new Error("Prompt not found");
  return prompt;
};

// 📝 Update Prompt
export const updatePromptService = async (
  id: string,
  { title, body, categoryId }: Partial<PromptInput>,
  userId: string
) => {
  const promptRepo = AppDataSource.getRepository(Prompt);
  const categoryRepo = AppDataSource.getRepository(Category);

  const prompt = await promptRepo.findOne({
    where: { id, created_by: { id: userId } },
    relations: ["category"],
  });
  if (!prompt) throw new Error("Prompt not found");

  if (title) prompt.title = title.trim();
  if (body) prompt.body = body.trim();

  if (categoryId) {
    const category = await categoryRepo.findOneBy({ id: categoryId });
    if (!category) throw new Error("Category not found");
    prompt.category = category;
  }

  await promptRepo.save(prompt);

  return { message: "Prompt updated successfully", prompt };
};

// 📝 Delete Prompt
export const deletePromptService = async (id: string, userId: string) => {
  const promptRepo = AppDataSource.getRepository(Prompt);

  const prompt = await promptRepo.findOne({
    where: { id, created_by: { id: userId } },
  });
  if (!prompt) throw new Error("Prompt not found");

  await promptRepo.remove(prompt);

  return { message: "Prompt deleted successfully" };
};
