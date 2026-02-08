import PageContainer from '../components/layout/PageContainer';
import RecipeWizard from '../components/recipes/RecipeWizard';

export default function RecipeCreate() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <RecipeWizard />
        </div>
    );
}
