import path from "path";


export const resolveRoot = (...segments: string[]) => path.resolve(__dirname, "..", "..", ...segments);

