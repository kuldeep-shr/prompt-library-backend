// import { Request, Response } from "express";
// import { AppDataSource } from "../config/data-source";
// import { Prompt } from "../entities/prompt.entity";

// const promptRepo = AppDataSource.getRepository(Prompt);

// export class PromptController {
//   // 📌 Create a new prompt
//   static async createPrompt(req: Request, res: Response) {
//     try {
//       const { title, body, category, created_by } = req.body;

//       if (!title || !body || !category || !created_by) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       const prompt = promptRepo.create({ title, body, category, created_by });
//       await promptRepo.save(prompt);

//       return res.status(201).json({ message: "Prompt created", prompt });
//     } catch (err: any) {
//       console.error("Create Prompt Error:", err.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   // 📌 Get all prompts
//   static async getPrompts(req: Request, res: Response) {
//     try {
//       const prompts = await promptRepo.find();
//       return res.status(200).json(prompts);
//     } catch (err: any) {
//       console.error("Get Prompts Error:", err.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   // 📌 Get prompt by ID
//   static async getPromptById(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const prompt = await promptRepo.findOne({ where: { id } });

//       if (!prompt) {
//         return res.status(404).json({ error: "Prompt not found" });
//       }

//       return res.status(200).json(prompt);
//     } catch (err: any) {
//       console.error("Get Prompt Error:", err.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   // 📌 Update a prompt
//   static async updatePrompt(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const { title, body, category } = req.body;

//       const prompt = await promptRepo.findOne({ where: { id } });
//       if (!prompt) {
//         return res.status(404).json({ error: "Prompt not found" });
//       }

//       prompt.title = title ?? prompt.title;
//       prompt.body = body ?? prompt.body;
//       prompt.category = category ?? prompt.category;
//       prompt.last_updated = new Date();

//       await promptRepo.save(prompt);
//       return res.status(200).json({ message: "Prompt updated", prompt });
//     } catch (err: any) {
//       console.error("Update Prompt Error:", err.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }

//   // 📌 Delete a prompt
//   static async deletePrompt(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const prompt = await promptRepo.findOne({ where: { id } });

//       if (!prompt) {
//         return res.status(404).json({ error: "Prompt not found" });
//       }

//       await promptRepo.remove(prompt);
//       return res.status(200).json({ message: "Prompt deleted successfully" });
//     } catch (err: any) {
//       console.error("Delete Prompt Error:", err.message);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// }
