export type country = {
    flag: string;
    flags: {
        png: string,
    };
    name: {
        common: string,
    };
    population: number;
    area: number;
    region: string;
    [sortBy: string]: any;
    cca3: string;
    independent: boolean;
    unMember: boolean;
}