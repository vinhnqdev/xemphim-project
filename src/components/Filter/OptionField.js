const OptionField = ({ data }) => {
  console.log(data);
  return (
    <option value={data.id || data.iso_3166_1 || data.value || data}>
      {data.name || data.native_name || data.durationTitle || data}
    </option>
  );
};

export default OptionField;
