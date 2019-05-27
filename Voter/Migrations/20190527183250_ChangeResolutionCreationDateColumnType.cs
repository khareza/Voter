﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class ChangeResolutionCreationDateColumnType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpirationDate",
                table: "Resolutions",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Resolutions",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExpirationDate",
                table: "Resolutions",
                type: "Date",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Resolutions",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "Date");
        }
    }
}
