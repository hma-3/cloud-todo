CREATE TYPE "TaskStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE');
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

ALTER TABLE "Task"
  ALTER COLUMN "title" TYPE VARCHAR(120),
  ADD COLUMN "description" VARCHAR(500),
  ADD COLUMN "status" "TaskStatus" NOT NULL DEFAULT 'NEW',
  ADD COLUMN "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
  ADD COLUMN "dueDate" TIMESTAMP(3);

ALTER TABLE "Task"
  DROP COLUMN "completed";

CREATE INDEX "Task_status_idx" ON "Task"("status");
CREATE INDEX "Task_priority_idx" ON "Task"("priority");
