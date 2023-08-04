using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StableDraw.Domain.Data.User.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GenerationInfo",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    DateLastUsed = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Balance = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenerationInfo", x => x.Oid);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    Expiration = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SubscriptionInfo",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    SubscriberId = table.Column<string>(type: "TEXT", nullable: false),
                    Expiration = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionInfo", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_SubscriptionInfo_Users_SubscriberId",
                        column: x => x.SubscriberId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    IsDesignAcces = table.Column<bool>(type: "INTEGER", nullable: false),
                    SubscriptionInfoOid = table.Column<Guid>(type: "TEXT", nullable: true),
                    GenerationInfoOid = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_User_GenerationInfo_GenerationInfoOid",
                        column: x => x.GenerationInfoOid,
                        principalTable: "GenerationInfo",
                        principalColumn: "Oid");
                    table.ForeignKey(
                        name: "FK_User_SubscriptionInfo_SubscriptionInfoOid",
                        column: x => x.SubscriptionInfoOid,
                        principalTable: "SubscriptionInfo",
                        principalColumn: "Oid");
                });

            migrationBuilder.CreateTable(
                name: "GenerationFlows",
                columns: table => new
                {
                    Oid = table.Column<Guid>(type: "TEXT", nullable: false),
                    UserId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Flow = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GenerationFlows", x => x.Oid);
                    table.ForeignKey(
                        name: "FK_GenerationFlows_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Oid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GenerationFlows_UserId",
                table: "GenerationFlows",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionInfo_SubscriberId",
                table: "SubscriptionInfo",
                column: "SubscriberId");

            migrationBuilder.CreateIndex(
                name: "IX_User_GenerationInfoOid",
                table: "User",
                column: "GenerationInfoOid");

            migrationBuilder.CreateIndex(
                name: "IX_User_SubscriptionInfoOid",
                table: "User",
                column: "SubscriptionInfoOid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GenerationFlows");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "GenerationInfo");

            migrationBuilder.DropTable(
                name: "SubscriptionInfo");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
