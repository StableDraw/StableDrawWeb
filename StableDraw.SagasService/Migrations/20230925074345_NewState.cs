using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StableDraw.SagasService.Migrations
{
    /// <inheritdoc />
    public partial class NewState : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SagaState");

            migrationBuilder.CreateTable(
                name: "MinIoState",
                columns: table => new
                {
                    CorrelationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CurrentState = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    RequestId = table.Column<Guid>(type: "TEXT", nullable: true),
                    ResponseAddress = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MinIoState", x => x.CorrelationId);
                });

            migrationBuilder.CreateTable(
                name: "NeuralState",
                columns: table => new
                {
                    CorrelationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CurrentState = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    RequestId = table.Column<Guid>(type: "TEXT", nullable: true),
                    ResponseAddress = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NeuralState", x => x.CorrelationId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MinIoState");

            migrationBuilder.DropTable(
                name: "NeuralState");

            migrationBuilder.CreateTable(
                name: "SagaState",
                columns: table => new
                {
                    CorrelationId = table.Column<Guid>(type: "TEXT", nullable: false),
                    CurrentState = table.Column<string>(type: "TEXT", maxLength: 255, nullable: true),
                    RequestId = table.Column<Guid>(type: "TEXT", nullable: true),
                    ResponseAddress = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SagaState", x => x.CorrelationId);
                });
        }
    }
}
