using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class AddedFluentAPI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpirationDate",
                table: "Resolutions",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Resolutions",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpirationDate",
                table: "Resolutions",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Resolutions",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }
    }
}
