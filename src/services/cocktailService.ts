const CATEGORY_ENDPOINT =
  "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
const COFFEE_COCKTAIL_ENDPOINT =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=coffee";

type CocktailCategoryResponse = {
  drinks: Array<{ strCategory: string }> | null;
};

type CocktailResponse = {
  drinks:
    | Array<{
        idDrink: string;
        strCategory: string | null;
        strDrink: string;
        strDrinkThumb: string;
        strInstructions: string | null;
        strInstructionsDE: string | null;
      }>
    | null;
};

export type Cocktail = {
  description: string;
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
    const response = await fetch(COFFEE_COCKTAIL_ENDPOINT);

    if (!response.ok) {
      throw new Error("Die Cocktails konnten nicht geladen werden.");
    }

    const data = (await response.json()) as CocktailResponse;

    if (!Array.isArray(data.drinks)) {
      throw new Error("Die CocktailDB-Antwort enthält keine Cocktails.");
    }

    const cocktails = data.drinks.flatMap(
      ({
        idDrink,
        strCategory,
        strDrink,
        strDrinkThumb,
        strInstructions,
        strInstructionsDE,
      }) => {
        const id = idDrink?.trim();
        const name = strDrink?.trim();
        const imageUrl = strDrinkThumb?.trim();
        const description =
          strInstructionsDE?.trim() ||
          strInstructions?.trim() ||
          strCategory?.trim() ||
          "Kaffeespezialität aus unserer aktuellen Auswahl";

        if (!id || !name || !imageUrl) {
          return [];
        }

        return [
          { description, id, name, imageUrl: `${imageUrl}/medium` },
        ];
      },
    );

    if (cocktails.length === 0) {
      throw new Error("Die CocktailDB-Antwort enthält keine gültigen Cocktails.");
    }

    return cocktails;
  },
};
