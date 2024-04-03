import { Example } from "./Example";
import { Hint } from "./Hint";

export interface Question{
    id: number;
    title: string;
    difficulty: string;
    tags: string;
    companies: string;
    description: string;
    constraints: string;
    javaBoilerplateCode: string;
    c11BoilerplateCode: string;
    cppBoilerplateCode: string;
    pythonBoilerplateCode: string;
    defaultInputs: string;
    createdAt: string;
    updatedAt: string;
    extraInfo: string;
    hints: Hint[];
    examples: Example[];
}