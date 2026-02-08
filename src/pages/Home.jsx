import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipesStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import RecipeFeed from '../components/recipes/RecipeFeed';

export default function Home() {
    const recipes = useRecipesStore((state) => state.recipes);

    // Filter active recipes (not deleted) with useMemo to avoid infinite loop
    const activeRecipes = useMemo(() => {
        return recipes.filter((recipe) => !recipe.isDeleted);
    }, [recipes]);

    return (
        <PageContainer
            title="Meie Köök 🍳 v1.0"
            actions={
                <Link to="/recipe/new" className="btn btn--primary">
                    ➕ Lisa
                </Link>
            }
        >
            <RecipeFeed recipes={activeRecipes} />
        </PageContainer>
    );
}
