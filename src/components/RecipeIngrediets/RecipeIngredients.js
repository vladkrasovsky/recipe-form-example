import ingredients from "../../data/ingredients.json";

const RecipeIngredients = ({ items, updateItems, addItem, removeItem }) => {
  const handleFieldChange = ({ target: { value, dataset } }, id) => {
    const _items = [...items];
    const index = _items.findIndex((item) => item.id === id);
    _items[index][dataset.name] = value;
    updateItems([..._items]);
  };

  return (
    <>
      {items.map((item) => {
        return (
          <div key={item.id} className="row gx-3 gy-2 align-items-end">
            <div className="col-md-5 col-lg-4">
              <label className="form-label">Name</label>
              <select
                className="form-select"
                data-name="id"
                required=""
                value={item.id}
                onChange={(e) => handleFieldChange(e, item.id)}
              >
                <option value="">Choose...</option>
                {ingredients.map(({ _id, ttl }) => {
                  return (
                    <option
                      key={_id}
                      value={_id}
                      disabled={items.some(({ id }) => id === _id)}
                    >
                      {ttl}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                Please select a valid ingredient.
              </div>
            </div>

            <div className="col-md-3 col-lg-2">
              <label className="form-label">Amount</label>
              <input
                type="number"
                min={0}
                step={0.5}
                className="form-control"
                data-name="amount"
                placeholder="0"
                required=""
                value={item.amount}
                onChange={(e) => handleFieldChange(e, item.id)}
              />
              <div className="invalid-feedback">Amount is required.</div>
            </div>

            <div className="col-md-4 col-lg-3">
              <label className="form-label">Measure</label>
              <select
                className="form-select"
                data-name="measure"
                value={item.measure}
                onChange={(e) => handleFieldChange(e, item.id)}
              >
                <option value="">Choose...</option>
                <option>g</option>
                <option>kg</option>
                <option>tbs</option>
                <option>tsp</option>
                <option>pcs</option>
              </select>
            </div>

            {items.length > 1 && (
              <div className="col-md-1">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(item.id)}
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        );
      })}

      <div className="row gx-3">
        <div className="col">
          <button
            type="button"
            className="btn btn-success btn-sm mt-4"
            onClick={addItem}
          >
            Add ingredient
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeIngredients;
