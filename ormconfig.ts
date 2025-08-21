import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./entities/user/User";
import { Prompt } from "./entities/prompt/Prompt";
import { Category } from "./entities/prompt/Category";
// import { KGSKey } from "./entities/url/Kgs";

config();

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: String(process.env.DATABASE_PATH) || "prompt.library.sqlite",
  entities: [User, Prompt, Category],
  synchronize: true,
  logging: false,
});
