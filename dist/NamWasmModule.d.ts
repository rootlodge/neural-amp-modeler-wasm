/**
 * Neural Amp Modeler WASM Module TypeScript Wrapper
 *
 * Provides a clean TypeScript API for the multi-instance NAM WASM module.
 * Designed for use in Web Audio AudioWorklets.
 */
/**
 * Raw exports from the Emscripten-compiled WASM module
 */
export interface NamWasmExports {
    _nam_createInstance(): number;
    _nam_destroyInstance(id: number): void;
    _nam_getInstanceCount(): number;
    _nam_loadModel(id: number, jsonPtr: number): boolean;
    _nam_unloadModel(id: number): void;
    _nam_hasModel(id: number): boolean;
    _nam_process(id: number, inputPtr: number, outputPtr: number, numFrames: number): void;
    _nam_setSampleRate(rate: number): void;
    _nam_getSampleRate(): number;
    _nam_setMaxBufferSize(size: number): void;
    _nam_getMaxBufferSize(): number;
    _nam_getModelLoudness(id: number): number;
    _nam_hasModelLoudness(id: number): boolean;
    _nam_reset(id: number): void;
    _malloc(size: number): number;
    _free(ptr: number): void;
    stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): void;
    lengthBytesUTF8(str: string): number;
}
/**
 * Emscripten module interface
 */
export interface EmscriptenModule {
    HEAPF32: Float32Array;
    HEAPU8: Uint8Array;
    _nam_createInstance(): number;
    _nam_destroyInstance(id: number): void;
    _nam_getInstanceCount(): number;
    _nam_loadModel(id: number, jsonPtr: number): boolean;
    _nam_unloadModel(id: number): void;
    _nam_hasModel(id: number): boolean;
    _nam_process(id: number, inputPtr: number, outputPtr: number, numFrames: number): void;
    _nam_setSampleRate(rate: number): void;
    _nam_getSampleRate(): number;
    _nam_setMaxBufferSize(size: number): void;
    _nam_getMaxBufferSize(): number;
    _nam_getModelLoudness(id: number): number;
    _nam_hasModelLoudness(id: number): boolean;
    _nam_reset(id: number): void;
    _malloc(size: number): number;
    _free(ptr: number): void;
    stringToUTF8(str: string, outPtr: number, maxBytesToWrite: number): void;
    lengthBytesUTF8(str: string): number;
}
/**
 * Options for initializing the Emscripten module
 */
export interface EmscriptenModuleOptions {
    /** Pre-fetched WASM binary (avoids additional fetch) */
    wasmBinary?: ArrayBuffer;
    /** Custom function to locate files (wasm, etc.) */
    locateFile?: (path: string, scriptDirectory: string) => string;
}
/**
 * Factory function type for creating the Emscripten module
 */
export type CreateNamModule = (options?: EmscriptenModuleOptions) => Promise<EmscriptenModule>;
/**
 * High-level wrapper around the NAM WASM module.
 * Handles memory management and provides a clean TypeScript API.
 */
export declare class NamWasmModule {
    #private;
    private constructor();
    /**
     * Creates a NamWasmModule from an Emscripten module factory function.
     * Use this when loading the module dynamically.
     *
     * @param createModule The factory function exported by the Emscripten JS wrapper
     * @param bufferSize Size of pre-allocated audio buffers (default: 128)
     */
    static create(createModule: CreateNamModule, bufferSize?: number): Promise<NamWasmModule>;
    /**
     * Creates a NamWasmModule from an already-instantiated Emscripten module.
     * Use this when the module has already been created elsewhere.
     *
     * @param module Pre-instantiated Emscripten module
     * @param bufferSize Size of pre-allocated audio buffers (default: 128)
     */
    static fromModule(module: EmscriptenModule, bufferSize?: number): NamWasmModule;
    /**
     * Disposes of the module and frees allocated memory.
     * Call this when done using the module.
     */
    dispose(): void;
    /**
     * Creates a new NAM instance.
     * @returns Instance ID for use with other methods
     */
    createInstance(): number;
    /**
     * Destroys a NAM instance and frees its resources.
     * @param id Instance ID
     */
    destroyInstance(id: number): void;
    /**
     * Returns the number of active instances.
     */
    getInstanceCount(): number;
    /**
     * Loads a NAM model from JSON string.
     * @param id Instance ID
     * @param modelJson JSON string containing the model
     * @returns true if successful
     */
    loadModel(id: number, modelJson: string): boolean;
    /**
     * Unloads the model from an instance.
     * @param id Instance ID
     */
    unloadModel(id: number): void;
    /**
     * Checks if an instance has a model loaded.
     * @param id Instance ID
     */
    hasModel(id: number): boolean;
    /**
     * Processes audio through a NAM instance.
     *
     * IMPORTANT: This method is optimized for real-time audio processing.
     * It uses pre-allocated buffers to avoid allocations during the audio callback.
     *
     * @param id Instance ID
     * @param input Input samples (mono)
     * @param output Output samples (mono) - will be filled with processed audio
     */
    process(id: number, input: Float32Array, output: Float32Array): void;
    /**
     * Processes audio in-place (input and output are the same buffer).
     * Slightly more efficient when you don't need to preserve the input.
     *
     * @param id Instance ID
     * @param buffer Audio buffer to process in-place
     */
    processInPlace(id: number, buffer: Float32Array): void;
    /**
     * Sets the sample rate for all instances.
     * @param rate Sample rate in Hz
     */
    setSampleRate(rate: number): void;
    /**
     * Gets the current sample rate.
     */
    getSampleRate(): number;
    /**
     * Sets the maximum buffer size for processing.
     * Call this if using buffer sizes larger than 128 samples.
     * @param size Maximum buffer size in samples
     */
    setMaxBufferSize(size: number): void;
    /**
     * Gets the current maximum buffer size.
     */
    getMaxBufferSize(): number;
    /**
     * Gets the loudness value of a loaded model.
     * @param id Instance ID
     * @returns Loudness in dB, or 0 if not available
     */
    getModelLoudness(id: number): number;
    /**
     * Checks if a model has loudness metadata.
     * @param id Instance ID
     */
    hasModelLoudness(id: number): boolean;
    /**
     * Resets the internal state of a model instance.
     * Call this on transport stop or when starting a new audio region.
     * @param id Instance ID
     */
    reset(id: number): void;
    /**
     * Returns the pre-allocated buffer size.
     */
    get bufferSize(): number;
}
//# sourceMappingURL=NamWasmModule.d.ts.map