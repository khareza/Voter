using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class UpdatedResolutionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Resolutions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpirationDate",
                table: "Resolutions",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Resolutions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Resolutions");

            migrationBuilder.DropColumn(
                name: "ExpirationDate",
                table: "Resolutions");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Resolutions");
        }
    }
}
