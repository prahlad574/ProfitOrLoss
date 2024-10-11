using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProfitOrLossBackend.Migrations
{
    /// <inheritdoc />
    public partial class addFinancialColumnInSaleTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FinancialYear",
                table: "Sale",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinancialYear",
                table: "Sale");
        }
    }
}
