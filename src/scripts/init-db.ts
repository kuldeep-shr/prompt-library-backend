import "reflect-metadata";
import { AppDataSource } from "../../ormconfig";

const initDB = async () => {
  try {
    await AppDataSource.initialize();
    const queryRunner = AppDataSource.createQueryRunner();

    const tables = await queryRunner.getTables([
      "users"
    ]);

    if (tables.length === 4) {
      console.log("✅ Tables already exist. Skipping creation.");
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
