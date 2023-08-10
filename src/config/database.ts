import { DB } from "../types/types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { logger } from "./logger";

const dialect = new PostgresDialect({
  pool: new Pool({
    host: "localhost",
    database: "payment_server",
    user: "postgres",
    password: "root",
    port: 5432,
    max: 20,
  }),
});

export const db = new Kysely<DB>({
  dialect,

  log(event) {
    logger.trace({
      query: event.query.sql,
      parameters: event.query.parameters,
      duration: event.queryDurationMillis.toFixed(2),
    });
  },
});
