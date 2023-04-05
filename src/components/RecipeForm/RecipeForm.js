import { useState } from "react";

import RecipeIngredients from "../RecipeIngrediets";

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    time: "",
    ingredients: [
      {
        id: Date.now(),
        name: "",
        amount: "",
        measure: "",
      },
    ],
    isPublic: false,
    instructions: "",
  });

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    let _formData = { ...formData };
    _formData[id] = id === "isPublic" ? !_formData.isPublic : value;
    setFormData(_formData);
  };

  const handleIngredientsChange = (ingredients) => {
    let _formData = { ...formData, ingredients };
    setFormData(_formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // simple validation..
    const { title, description, category, time, ingredients, instructions } =
      formData;
    if (
      !title ||
      !description ||
      !category ||
      !time ||
      ingredients.length === 0 ||
      !instructions
    ) {
      alert("Please, provide all required fields");
    }
    console.log(formData);
    console.table(formData.ingredients);
  };

  return (
    <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
      <div className="row g-5">
        <div className="col-md-5">
          <img src="https://placehold.co/357x344" alt="" />
        </div>

        {/* Basic fields */}
        <div className="col-md-5">
          <div className="form-group mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder=""
              required=""
              value={formData.title}
              onChange={handleFieldChange}
            />
            <div className="invalid-feedback">Please enter recipe title.</div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="description" className="form-label">
              About
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder=""
              required=""
              value={formData.description}
              onChange={handleFieldChange}
            />
            <div className="invalid-feedback">
              Please enter recipe description.
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              required=""
              value={formData.category}
              onChange={handleFieldChange}
            >
              <option value="">Choose...</option>
              <option>Beef</option>
              <option>Breakfast</option>
              <option>Dessert</option>
              <option>Goat</option>
              <option>Lamb</option>
              <option>Miscellaneous</option>
            </select>
            <div className="invalid-feedback">
              Please select a valid category.
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="time" className="form-label">
              Cooking time
            </label>
            <input
              type="text"
              className="form-control"
              id="time"
              placeholder="40 min"
              required=""
              value={formData.time}
              onChange={handleFieldChange}
            />
            <div className="invalid-feedback">Please enter recipe time.</div>
          </div>
        </div>
      </div>

      {/* Ingredients */}

      <div className="row gx-3 gy-1">
        <h4 className="d-flex justify-content-between align-items-center mb-0 mt-5">
          <span className="text-primary">Ingredients</span>
        </h4>
        <RecipeIngredients
          items={formData.ingredients}
          setItems={handleIngredientsChange}
        />
      </div>

      <hr className="my-4" />

      {/* Is Public */}

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="isPublic"
          value={formData.isPublic}
          onChange={handleFieldChange}
        />
        <label className="form-check-label" htmlFor="isPublic">
          Public
        </label>
      </div>

      <hr className="my-4" />

      {/* Instructions */}

      <h4 className="d-flex justify-content-between align-items-center mb-3 mt-4">
        <span className="text-primary">Recipe Preparation</span>
      </h4>

      <div className="row gy-3">
        <div className="col-md-9">
          <textarea
            id="instructions"
            className="form-control"
            placeholder="Enter recipe"
            required=""
            rows={6}
            value={formData.instructions}
            onChange={handleFieldChange}
          ></textarea>
          <div className="invalid-feedback">Recipe is required</div>
        </div>
      </div>

      <button className="btn btn-primary btn-lg my-4" type="submit">
        Add Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
