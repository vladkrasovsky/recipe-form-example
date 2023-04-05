import RecipeSidebar from "../components/RecipeSidebar";
import RecipeForm from "../components/RecipeForm";

export default function addRecipe() {
  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h1>Recipe form</h1>
          <p className="lead">Below is an example form.</p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <RecipeSidebar />
          </div>

          <div className="col-md-7 col-lg-8">
            <h2 className="mb-3">Add recipe</h2>
            <RecipeForm />
          </div>
        </div>
      </main>

      <footer className="py-3 my-3">
        <p className="text-center text-muted mb-0">
          © 2023 Created by Vlad Krasovsky
        </p>
      </footer>
    </div>
  );
}
