module.exports = {
  up: queryInterface => {
    return queryInterface.sequelize.query(
      `
      ALTER TYPE "public".enum_events_repeatable RENAME TO enum_events_repeatable_old;
      CREATE TYPE enum_events_repeatable AS ENUM('daily', 'weekly','not');
      ALTER TABLE events ALTER COLUMN "repeatable" TYPE "public".enum_events_repeatable USING repeatable::text::enum_events_repeatable;
      UPDATE "events" SET "repeatable" = 'not' WHERE "repeatable" IS NULL;
      ALTER TABLE "events" ALTER COLUMN "repeatable" SET DEFAULT 'not';
      ALTER TABLE "events" ALTER COLUMN "repeatable" DROP NOT NULL;
      DROP TYPE enum_events_repeatable_old;`
    );
  },

  down: queryInterface => {
    return queryInterface.sequelize.query(
      `ALTER TYPE "public".enum_events_repeatable RENAME TO enum_events_repeatable_old;
      CREATE TYPE enum_events_repeatable AS ENUM('daily', 'weekly');
      ALTER TABLE "events" ALTER COLUMN "repeatable" SET DEFAULT NULL;
      UPDATE "events" SET "repeatable" = NULL WHERE "repeatable" = 'not';
      ALTER TABLE events ALTER COLUMN "repeatable" TYPE "public".enum_events_repeatable USING repeatable::text::enum_events_repeatable;
      DROP TYPE enum_events_repeatable_old;
      `
    );
  },
};
