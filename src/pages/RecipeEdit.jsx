import { useParams, useNavigate } from 'react-router-dom';
import { useRecipesStore } from '../lib/store';
import RecipeWizard from '../components/recipes/RecipeWizard';

export default function RecipeEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = useRecipesStore((state) => state.getRecipe(id));

    if (!recipe) {
        navigate('/');
        return null;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <RecipeWizard
                initialData={recipe}
                onComplete={() => navigate(`/recipe/${id}`)}
            />
        </div>
    );
}
