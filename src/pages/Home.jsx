import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useRecipesStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import RecipeFeed from '../components/recipes/RecipeFeed';

export default function Home() {
    const recipes = useRecipesStore((state) => state.recipes);
    const [searchParams] = useSearchParams();

    // Get ingredient filter from URL if present
    const ingredientFilter = searchParams.get('ingredient');

    // Filter active recipes (not deleted) with useMemo to avoid infinite loop
    const activeRecipes = useMemo(() => {
        return recipes.filter((recipe) => !recipe.isDeleted);
    }, [recipes]);

    return (
        <PageContainer
            title={<>Meie Köök 🍳 <span style={{ fontSize: '0.5em', fontWeight: 400, opacity: 0.5 }}>v1.1</span></>}
            actions={
                <Link to="/recipe/new" className="btn btn--primary">
                    ➕ Lisa
                </Link>
            }
        >
            <RecipeFeed recipes={activeRecipes} ingredientFilter={ingredientFilter} />
        </PageContainer>
    );
}
