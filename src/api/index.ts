import { WikiResultProps } from "../types"

const wikiUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=search&srsearch="

export const searchWiki = async (text: string, offset: number): Promise<WikiResultProps> => {
    return fetch(`${wikiUrl}${text}&sroffset=${offset}`).then((res) => res.json())
}
