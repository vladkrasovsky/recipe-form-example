import { useState } from "react";
import API from "../../services/api";
import RecipeIngredients from "../RecipeIngrediets";
import cats from "../../data/cats.json";

const IMG_PREVIEW = "https://placehold.co/357x344?text=Upload+image";
const initialRecipe = {
  title: "",
  description: "",
  category: "",
  time: "",
  ingredients: [
    {
      id: Date.now(),
      amount: "",
      measure: "",
    },
  ],
  isPublic: false,
  instructions: "",
};

const RecipeForm = () => {
  const [preview, setPreview] = useState(IMG_PREVIEW);
  const [recipe, setRecipe] = useState(initialRecipe);

  const handleFileChange = (e) => {
    const [_file] = e.target.files;
    setPreview(_file ? URL.createObjectURL(_file) : IMG_PREVIEW);
  };

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    let _recipe = { ...recipe };
    _recipe[id] = id === "isPublic" ? !_recipe.isPublic : value;
    setRecipe(_recipe);
  };

  const handleIngredientsChange = (ingredients) => {
    let _recipe = { ...recipe, ingredients };
    setRecipe(_recipe);
  };

  const resetForm = () => {
    setRecipe({ ...initialRecipe });
    setPreview(IMG_PREVIEW);
  };

  /* 
  const isValid = (recipe) => {
    for (const [key, value] of Object.entries(recipe)) {
      if (!value) {
        alert(`${key} is required`);
        return false;
      }
    }
    return true;
  }; 
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    // some validations !isValid(recipe)...
    const formData = new FormData();
    const [file] = e.target.thumb.files;
    if (!file) {
      return alert("Select a recipe image!");
    }
    formData.append("thumb", file);
    formData.append("jsonData", JSON.stringify(recipe));
    try {
      const { data } = await API.post("/recipes", formData);
      console.log(data);
      resetForm();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
      <div className="row g-5">
        {/* Image upload */}
        <div className="col-lg-6 col-xl-5">
          <label className="file-label" htmlFor="thumb">
            <img src={preview} alt="" width={357} height={344} />
            <input
              className="visually-hidden"
              type="file"
              id="thumb"
              name="thumb"
              onChange={handleFileChange}
              accept="image/png, image/jpg, image/jpeg"
            />
          </label>
        </div>

        {/* Basic fields */}
        <div className="col-lg-6 col-xl-5">
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
              value={recipe.title}
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
              value={recipe.description}
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
              value={recipe.category}
              onChange={handleFieldChange}
            >
              <option value="">Choose...</option>
              {cats.map(({ _id: id, category }) => {
                return (
                  <option key={id} value={id}>
                    {category}
                  </option>
                );
              })}
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
              value={recipe.time}
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
          items={recipe.ingredients}
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
          value={recipe.isPublic}
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
            value={recipe.instructions}
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
