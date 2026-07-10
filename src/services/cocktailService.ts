const CATEGORY_ENDPOINT =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
const COCKTAIL_ENDPOINT =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";

type CocktailCategoryResponse = {
  drinks: Array<{ strCategory: string }> | null;
};

type CocktailResponse = {
  drinks:
    | Array<{
        idDrink: string;
        strDrink: string;
        strDrinkThumb: string;
      }>
    | null;
};

export type Cocktail = {
  id: string;
  imageUrl: string;
  name: string;
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
  getCocktails: async (): Promise<Cocktail[]> => {
    const response = await fetch(COCKTAIL_ENDPOINT);

    if (!response.ok) {
      throw new Error("Die Cocktails konnten nicht geladen werden.");
    }

    const data = (await response.json()) as CocktailResponse;

    if (!Array.isArray(data.drinks)) {
      throw new Error("Die CocktailDB-Antwort enthält keine Cocktails.");
    }

    const cocktails = data.drinks.flatMap(
      ({ idDrink, strDrink, strDrinkThumb }) => {
        const id = idDrink?.trim();
        const name = strDrink?.trim();
        const imageUrl = strDrinkThumb?.trim();

        if (!id || !name || !imageUrl) {
          return [];
        }

        return [{ id, name, imageUrl: `${imageUrl}/medium` }];
      },
    );

    if (cocktails.length === 0) {
      throw new Error("Die CocktailDB-Antwort enthält keine gültigen Cocktails.");
    }

    return cocktails;
  },
};
