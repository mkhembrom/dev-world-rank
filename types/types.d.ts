export type country = {
    flag: string;
    flags: {
        png: string,
    };
    name: {
        common: string,
        official: string,
    };
    population: number;
    area: number;
    region: string;
    [sortBy: string]: any;
    cca3: string;
    independent: boolean;
    unMember: boolean;
}

export type CountryInfo = {
    name: string;
    image: string;
    officialName: string;
    population: any;
    area: any;
    capital: string;
    subregion: any;
    language: unknown[];
    currencies: string;
    continent: any;
    borders: any;
  };
  