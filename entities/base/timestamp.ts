import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DateTimeEntity {
  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
