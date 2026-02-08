import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useRecipesStore } from '../lib/store';
import PageContainer from '../components/layout/PageContainer';
import RecipeFeed from '../components/recipes/RecipeFeed';

export default function Favorites() {
    const recipes = useRecipesStore((state) => state.recipes);

    const favoriteRecipes = useMemo(() => {
        return recipes.filter((recipe) => recipe.isFavorite && !recipe.isDeleted);
    }, [recipes]);

    return (
        <PageContainer title="Lemmikud ⭐">
            {favoriteRecipes.length > 0 ? (
                <RecipeFeed recipes={favoriteRecipes} />
            ) : (
                <div className="empty-state">
                    <span className="empty-state__icon">⭐</span>
                    <h3 className="empty-state__title">Lemmikuid pole veel</h3>
                    <p className="empty-state__description">
                        Märgi retsepte lemmikuks, et neid siin näha
                    </p>
                    <Link to="/" className="btn btn--primary">
                        Vaata retsepte
                    </Link>
                </div>
            )}
        </PageContainer>
    );
}
