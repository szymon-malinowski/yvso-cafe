const CATEGORY_ENDPOINT =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

type CocktailCategoryResponse = {
  drinks: Array<{ strCategory: string }> | null;
};

export const cocktailService = {
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(CATEGORY_ENDPOINT);

    if (!response.ok) {
      throw new Error("Die Getränkekategorien konnten nicht geladen werden.");
    }

    const data = (await response.json()) as CocktailCategoryResponse;

    if (!Array.isArray(data.drinks)) {
      throw new Error("Die CocktailDB-Antwort enthält keine Kategorien.");
    }

    return [
      ...new Set(
        data.drinks
          .map(({ strCategory }) => strCategory?.trim())
          .filter((category): category is string => Boolean(category)),
      ),
    ];
  },
};
