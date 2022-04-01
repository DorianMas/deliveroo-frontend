const Restaurant = (props) => {
  return (
    <div className="restaurant-componant">
      <div className="restaurant-title-description">
        <h1 className="restaurant-title">{props.name}</h1>
        <p className="restaurant-description">{props.description}</p>
      </div>
      <img
        className="restaurant-illustration"
        src={props.picture}
        alt="restaurant-description"
      />
    </div>
  );
};

export default Restaurant;
