const OptionField = ({ data, defaultValue = false }) => {
  return (
    <option
      value={
        data.id || data.iso_3166_1 || data.value || data.year_id || data.sort_id
      }
      defaultValue={defaultValue}
    >
      {data.name ||
        data.native_name ||
        data.durationTitle ||
        data.value ||
        data.sort_value}
    </option>
  );
};

export default OptionField;
