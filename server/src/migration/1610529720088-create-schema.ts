import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSchema1610529720088 implements MigrationInterface {
  name = 'createSchema1610529720088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(20) NOT NULL, "passwordHash" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "members" ("id" SERIAL NOT NULL, "projectId" uuid NOT NULL, "memberId" uuid NOT NULL, "joinedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(60) NOT NULL, "createdById" uuid NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "notes" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "authorId" uuid NOT NULL, "bugId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "bugs_priority_enum" AS ENUM('low', 'medium', 'high')`
    );
    await queryRunner.query(
      `CREATE TABLE "bugs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(60) NOT NULL, "description" character varying NOT NULL, "priority" "bugs_priority_enum" NOT NULL DEFAULT 'low', "projectId" uuid NOT NULL, "isResolved" boolean NOT NULL DEFAULT false, "closedById" uuid, "closedAt" TIMESTAMP, "reopenedById" uuid, "reopenedAt" TIMESTAMP, "createdById" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedById" uuid, "updatedAt" TIMESTAMP, CONSTRAINT "PK_dadac7f01b703d50496ae1d3e74" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_da3e8adedb86281bf9203b1b0ec" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "members" ADD CONSTRAINT "FK_b8b1af4785a6d102a8704912178" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_d358080cb403fe88e62cc9cba58" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" ADD CONSTRAINT "FK_80e0afbc05b34045e45ad183775" FOREIGN KEY ("bugId") REFERENCES "bugs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" ADD CONSTRAINT "FK_b2b8219ad96da5bb8df99c8ea39" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" ADD CONSTRAINT "FK_5748f0f4995f9530bf174a068af" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" ADD CONSTRAINT "FK_2e4e579ff84e2e8ee880be824d4" FOREIGN KEY ("reopenedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" ADD CONSTRAINT "FK_953bc502117c756d7268995b358" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" ADD CONSTRAINT "FK_df9f856721165a7d9e57705fb26" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bugs" DROP CONSTRAINT "FK_df9f856721165a7d9e57705fb26"`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" DROP CONSTRAINT "FK_953bc502117c756d7268995b358"`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" DROP CONSTRAINT "FK_2e4e579ff84e2e8ee880be824d4"`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" DROP CONSTRAINT "FK_5748f0f4995f9530bf174a068af"`
    );
    await queryRunner.query(
      `ALTER TABLE "bugs" DROP CONSTRAINT "FK_b2b8219ad96da5bb8df99c8ea39"`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_80e0afbc05b34045e45ad183775"`
    );
    await queryRunner.query(
      `ALTER TABLE "notes" DROP CONSTRAINT "FK_d358080cb403fe88e62cc9cba58"`
    );
    await queryRunner.query(
      `ALTER TABLE "projects" DROP CONSTRAINT "FK_f55144dc92df43cd1dad5d29b90"`
    );
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_b8b1af4785a6d102a8704912178"`
    );
    await queryRunner.query(
      `ALTER TABLE "members" DROP CONSTRAINT "FK_da3e8adedb86281bf9203b1b0ec"`
    );
    await queryRunner.query(`DROP TABLE "bugs"`);
    await queryRunner.query(`DROP TYPE "bugs_priority_enum"`);
    await queryRunner.query(`DROP TABLE "notes"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "members"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
