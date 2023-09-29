using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RentalMovieDetailsApi.ViewModel
{
    internal class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.String && reader.TryGetDateTime(out DateTime dateTime))
            {
                return DateOnly.FromDateTime(dateTime);
            }

            throw new JsonException();
        }

        public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString("MM-dd-yyyy"));
        }
    }
}
