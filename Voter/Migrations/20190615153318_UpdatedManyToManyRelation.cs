using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Voter.Migrations
{
    public partial class UpdatedManyToManyRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ResidentResolution",
                table: "ResidentResolution");

            migrationBuilder.DropIndex(
                name: "IX_ResidentResolution_VoterId",
                table: "ResidentResolution");

            migrationBuilder.AlterColumn<string>(
                name: "VoterId",
                table: "ResidentResolution",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "ResidentResolution",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResidentResolution",
                table: "ResidentResolution",
                columns: new[] { "VoterId", "ResolutionId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ResidentResolution_AspNetUsers_VoterId",
                table: "ResidentResolution",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
