import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DateTimeEntity {
  @CreateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  updatedAt!: Date;
}
