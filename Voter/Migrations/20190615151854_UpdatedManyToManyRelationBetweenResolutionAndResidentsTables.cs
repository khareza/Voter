using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Voter.Migrations
{
    public partial class UpdatedManyToManyRelationBetweenResolutionAndResidentsTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //old code
    //        migrationBuilder.DropTable(
    //           name: "ResidentResolution");

    //        migrationBuilder.CreateTable(
    //     name: "ResidentResolution",
    //     columns: table => new
    //     {
    //         Id = table.Column<int>(nullable: false)
    //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
    //         VoterId = table.Column<string>(nullable: false),
    //         ResolutionId = table.Column<int>(nullable: false),
    //         VoteDate = table.Column<DateTime>(nullable: false),
    //         Answer = table.Column<int>(nullable: false)
    //     },
    //            constraints: table =>
    //            {
    //                table.PrimaryKey("PK_ResidentResolution", x => x.Id);
    //                table.ForeignKey(
    //                    name: "FK_ResidentResolution_Resolutions_ResolutionId",
    //                    column: x => x.ResolutionId,
    //                    principalTable: "Resolutions",
    //                    principalColumn: "Id",
    //                    onDelete: ReferentialAction.Restrict);
    //                table.ForeignKey(
    //                    name: "FK_ResidentResolution_AspNetUsers_VoterId",
    //                    column: x => x.VoterId,
    //                    principalTable: "AspNetUsers",
    //                    principalColumn: "Id",
    //                    onDelete: ReferentialAction.Restrict);
    //            });
    //        migrationBuilder.CreateIndex(
    //name: "IX_ResidentResolution_ResolutionId",
    //table: "ResidentResolution",
    //column: "ResolutionId");

    //        migrationBuilder.CreateIndex(
    //            name: "IX_ResidentResolution_VoterId",
    //            table: "ResidentResolution",
    //            column: "VoterId");

    //        migrationBuilder.DropForeignKey(
    //            name: "FK_ResidentResolution_Resolutions_ResolutionId",
    //            table: "ResidentResolution");

    //        migrationBuilder.DropForeignKey(
    //            name: "FK_ResidentResolution_AspNetUsers_VoterId",
    //            table: "ResidentResolution");

    //        migrationBuilder.DropPrimaryKey(
    //            name: "PK_ResidentResolution",
    //            table: "ResidentResolution");

    //        migrationBuilder.DropIndex(
    //            name: "IX_ResidentResolution_VoterId",
    //            table: "ResidentResolution");

    //        migrationBuilder.AddPrimaryKey(
    //            name: "PK_ResidentResolution",
    //            table: "ResidentResolution",
    //            columns: new[] { "VoterId", "ResolutionId" });

    //        migrationBuilder.AddForeignKey(
    //            name: "FK_ResidentResolution_Resolutions_ResolutionId",
    //            table: "ResidentResolution",
    //            column: "ResolutionId",
    //            principalTable: "Resolutions",
    //            principalColumn: "Id",
    //            onDelete: ReferentialAction.Cascade);

    //        migrationBuilder.AddForeignKey(
    //            name: "FK_ResidentResolution_AspNetUsers_VoterId",
    //            table: "ResidentResolution",
    //            column: "VoterId",
    //            principalTable: "AspNetUsers",
    //            principalColumn: "Id",
    //            onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResidentResolution_Resolutions_ResolutionId",
                table: "ResidentResolution");

            migrationBuilder.DropForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ResidentResolution",
                table: "ResidentResolution");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ResidentResolution",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AlterColumn<int>(
                name: "ResolutionId",
                table: "ResidentResolution",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "VoterId",
                table: "ResidentResolution",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResidentResolution",
                table: "ResidentResolution",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_ResidentResolution_VoterId",
                table: "ResidentResolution",
                column: "VoterId");

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentResolution_Resolutions_ResolutionId",
                table: "ResidentResolution",
                column: "ResolutionId",
                principalTable: "Resolutions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
