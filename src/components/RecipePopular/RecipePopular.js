import recipes from "../../data/popular_recipes.json";

const RecipePopular = () => {
  return (
    <>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-primary">Popular recipe</span>
      </h4>
      <ul className="list-group mb-3">
        {recipes.map(({ id, title, description, thumb }) => {
          return (
            <li
              key={id}
              className="list-group-item d-flex justify-content-between lh-sm"
            >
              <img src={thumb} alt={title} className="me-3" />
              <div className="flex-grow-1">
                <h6 className="my-0">{title}</h6>
                <small className="text-muted">{description}</small>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RecipePopular;
