using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class AddedRegisterDateToAppUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RegisterDate",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegisterDate",
                table: "AspNetUsers");
        }
    }
}
