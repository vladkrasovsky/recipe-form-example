const RecipeIngredients = ({ items, setItems }) => {
  const handleAddClick = (e) => {
    e.preventDefault();
    const _items = [...items];
    _items.push({
      id: Date.now(),
      name: "",
      amount: "",
      measure: "",
    });
    setItems(_items);
  };

  const handleRemoveClick = (id) => {
    const _items = items.filter((item) => item.id !== id);
    setItems([..._items]);
  };

  const handleFieldChange = (event, id) => {
    const _items = [...items];
    const index = _items.findIndex((item) => item.id === id);
    const {
      value,
      dataset: { name },
    } = event.target;
    _items[index][name] = value;
    setItems(_items);
  };

  return (
    <>
      {items.map((item) => {
        return (
          <div key={item.id} className="row gx-3 gy-2 align-items-end">
            <div className="col-md-4">
              <label className="form-label">Name</label>
              <select
                className="form-select"
                data-name="name"
                required=""
                value={item.name}
                onChange={(e) => handleFieldChange(e, item.id)}
              >
                <option value="">Choose...</option>
                <option>Avocado</option>
                <option>Chicken</option>
                <option>Cherry</option>
                <option>Cucumber</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid ingredient.
              </div>
            </div>

            <div className="col-md-2">
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

            <div className="col-md-3">
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
                  onClick={() => handleRemoveClick(item.id)}
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
            onClick={handleAddClick}
          >
            Add ingredient
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeIngredients;
