using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StableDraw.Domain.Data.Task.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Oid);
                });

            migrationBuilder.CreateTable(
                name: "Generations",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    TaskId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Number = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generations", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_Generations_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Results",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    GenerationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    CaptionResult_Property = table.Column<string>(type: "TEXT", nullable: true),
                    ImageResult_Property = table.Column<string>(type: "TEXT", nullable: true),
                    Property = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Results", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_Results_Generations_GenerationId",
                        column: x => x.GenerationId,
                        principalTable: "Generations",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Generations_TaskId",
                table: "Generations",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Results_GenerationId",
                table: "Results",
                column: "GenerationId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Results");

            migrationBuilder.DropTable(
                name: "Generations");

            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
