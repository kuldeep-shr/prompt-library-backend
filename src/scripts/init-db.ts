import "reflect-metadata";
import { AppDataSource } from "../../ormconfig";

const initDB = async () => {
  try {
    await AppDataSource.initialize();
    const queryRunner = AppDataSource.createQueryRunner();

    // List all tables to check
    const tablesToCheck = ["users", "categories", "prompts"];
    const existingTables = await queryRunner.getTables(tablesToCheck);

    if (existingTables.length === tablesToCheck.length) {
      console.log("✅ All tables already exist. Skipping creation.");
    } else {
      console.log("📦 Creating missing tables...");
      await AppDataSource.synchronize();
      console.log("✅ Tables created or updated.");
    }

    await queryRunner.release();
    await AppDataSource.destroy();
  } catch (err) {
    console.error("❌ Error during DB initialization:", err);
    process.exit(1);
  }
};

initDB();
