export interface NamModel {
    version: string;
    architecture: string;
    metadata?: {
        name?: string;
        loudness?: number;
        gain?: number;
    };
    config: {
        layers: Array<{
            input_size: number;
            condition_size: number;
            head_size: number;
            channels: number;
            kernel_size: number;
            dilations: number[];
            activation: string;
            gated: boolean;
            head_bias: boolean;
        }>;
    };
    weights: number[];
}
export declare namespace NamModel {
    const parse: (json: string) => NamModel;
}
//# sourceMappingURL=NamModel.d.ts.map