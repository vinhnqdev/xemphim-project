const TitleMovie = ({ title, isCentered = false }) => {
  return (
    <h2
      className="titleMovie"
      style={{
        textAlign: isCentered && "center",
        fontWeight: isCentered && "500",
      }}
    >
      {title}
    </h2>
  );
};

export default TitleMovie;
