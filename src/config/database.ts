import { DB } from "../types/types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";
import { logger } from "./logger";
import env from "./env";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: env.DB_NAME,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT),
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
