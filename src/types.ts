
export interface Currency {
    code: string;
    name?: string;
    rates?: Array<Rate> 
}

export interface Rate {
    code: string;
    count?: number;
}

export interface ConversionUnit {
    code: string;
    count: number;
}