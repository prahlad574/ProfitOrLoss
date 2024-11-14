namespace ProfitOrLossBackend.Models
{
    public class MetaDataChange
    {
        public MetadataTypeEnum MetadataType { get; set; }

        public OperationEnum Operation { get; set; }

        public required string Id { get; set; }

        public string? Name { get; set; }
    }
}
