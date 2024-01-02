"server"
// export const getListOfCountries = async () => {
   
//     const res = await fetch(`https://restcountries.com/v3.1/all?fields=region,name,flags,population,area`);

//     if(!res.ok) throw new Error("Failed to fetch");

//     const data = await res.json();

  

//     return data;
// }

export const getCountry = async (slug: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${slug.toLowerCase()}`);
    if(!res.ok)  throw new Error("Failed to fetch");
    const data = await res.json();
    


    const name = data[data.length - 1].name.common as string;
    const image = data[data.length - 1].flags.png as string;
    const officialName = data[data.length - 1].name.official as string;
    const population = data[data.length - 1].population;
    const area = data[data.length - 1].area;
    const capital = data[data.length - 1]?.capital[0] as string;
    const subregion = data[data.length - 1].subregion;
    const language = Object.values(data[data.length - 1].languages);
    const currencies = [...Object.values(data[data.length - 1].currencies)][0]?.name! as string
    const continent = data[data.length - 1].continents;
    const borders = data[data.length - 1].borders;
    return {
        name,
        image,
        officialName,
        population,
        area,
        capital,
        subregion,
        language,
        currencies,
        continent,
        borders

    };
}

export const codeCountry = async (code: string) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if(!res.ok)  throw new Error("Failed to fetch");
    const data = await res.json();
    const flag = data[data.length - 1].flags.png;
    return flag as string
    
}