const getFileContent = async <T>(path: string): Promise<T[]> => {
    try {
        const filePath = await Deno.realPath(path);
        const fileContent = await Deno.readTextFile(filePath);
        return fileContent ? JSON.parse(fileContent) : undefined;
    } catch (error) {
        throw new Error(error);
    }
}

export default getFileContent;