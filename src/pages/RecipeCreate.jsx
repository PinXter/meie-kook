import PageContainer from '../components/layout/PageContainer';
import RecipeWizard from '../components/recipes/RecipeWizard';

export default function RecipeCreate() {
    return (
        <PageContainer title="Uus Retsept 🍳">
            <RecipeWizard />
        </PageContainer>
    );
}
