import React, { createContext, useContext, useEffect, useState } from 'react';

export interface PlasmaWaveConfig {
    color1: string;
    color2: string;
    color3: string;
    timeSpeed: number;
    colorBalance: number;
    warpStrength: number;
    warpFrequency: number;
    warpSpeed: number;
    warpAmplitude: number;
    blendAngle: number;
    blendSoftness: number;
    rotationAmount: number;
    noiseScale: number;
    grainAmount: number;
    grainScale: number;
    grainAnimated: boolean;
    contrast: number;
    gamma: number;
    saturation: number;
    centerOffsetX: number;
    centerOffsetY: number;
    zoom: number;
    lightMode: boolean;
}

export interface GlowCursorConfig {
    color1: string;
    color2: string;
    trailLength: number;
    trailWidth: number;
    trailTaper: number;
    followSpeed: number;
    glowIntensity: number;
    glowSpread: number;
    brightness: number;
    pulseSpeed: number;
    noiseStrength: number;
    idleFade: boolean;
    idleTimeout: number;
}

export interface VaporTypeConfig {
    color: string;
    vaporColor: string;
    density: number;
    turbulence: number;
    spread: number;
    rise: number;
    condense: number;
    hold: number;
    dissolve: number;
}

export interface HeroGridConfig {
    gridSize: number;
    nodeColor: string;
    lineColor: string;
    glowIntensity: number;
    interactionRadius: number;
}

export interface TechTextConfig {
    fontSize: number;
    fontWeight: number;
    dashLength: number;
    dashGap: number;
    specks: number;
    color: string;
    accentColor: string;
}

export interface DarkVeilConfig {
    hueShift: number;
    speed: number;
    scanlineFrequency: number;
    warpAmount: number;
    noiseIntensity: number;
    scanlineIntensity: number;
    resolutionScale: number;
    lightMode: boolean;
}

export interface CreativeState {
    plasmaWave: PlasmaWaveConfig;
    glowCursor: GlowCursorConfig;
    vaporType: VaporTypeConfig;
    heroGrid: HeroGridConfig;
    techText: TechTextConfig;
    darkVeil: DarkVeilConfig;
}

export const defaultCreativeConfig: CreativeState = {
    darkVeil: {
        hueShift: 43,
        speed: 0.9,
        scanlineFrequency: 3.1,
        warpAmount: 4.7,
        noiseIntensity: 0.04,
        scanlineIntensity: 0.2,
        resolutionScale: 1,
        lightMode: false,
    },
    plasmaWave: {
        color1: '#A855F7',
        color2: '#06B6D4',
        color3: '#6366F1',
        timeSpeed: 5,
        colorBalance: 0.04,
        warpStrength: 0.4,
        warpFrequency: 7.7,
        warpSpeed: 2,
        warpAmplitude: 50,
        blendAngle: -162,
        blendSoftness: 0.05,
        rotationAmount: 0,
        noiseScale: 0,
        grainAmount: 0.1,
        grainScale: 2,
        grainAnimated: false,
        contrast: 1.5,
        gamma: 1.0,
        saturation: 0.75,
        centerOffsetX: 0,
        centerOffsetY: 0,
        zoom: 0.9,
        lightMode: false,
    },
    glowCursor: {
        color1: '#67E8F9',
        color2: '#A78BFA',
        trailLength: 40,
        trailWidth: 8,
        trailTaper: 0.8,
        followSpeed: 0.16,
        glowIntensity: 1.9,
        glowSpread: 1.2,
        brightness: 1.25,
        pulseSpeed: 1.1,
        noiseStrength: 0.035,
        idleFade: true,
        idleTimeout: 700,
    },
    vaporType: {
        color: '#38bdf8',
        vaporColor: '#67e8f9',
        density: 1.3,
        turbulence: 0.8,
        spread: 1.3,
        rise: 1.1,
        condense: 1.5,
        hold: 2.4,
        dissolve: 1.7,
    },
    heroGrid: {
        gridSize: 42,
        nodeColor: '#38BDF8',
        lineColor: '#1E293B',
        glowIntensity: 0.4,
        interactionRadius: 220,
    },
    techText: {
        fontSize: 150,
        fontWeight: 600,
        dashLength: 4,
        dashGap: 2,
        specks: 15,
        color: '#ffffff',
        accentColor: '#38bdf8',
    },
};

const STORAGE_KEY = 'quilab_creative_config';

interface CreativeContextType {
    config: CreativeState;
    updateModule: <K extends keyof CreativeState>(module: K, patch: Partial<CreativeState[K]>) => void;
    resetModule: (module: keyof CreativeState) => void;
    resetAll: () => void;
    saveConfig: () => void;
    isDirty: boolean;
}

const CreativeContext = createContext<CreativeContextType | null>(null);

export function CreativeProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<CreativeState>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                return {
                    plasmaWave: { ...defaultCreativeConfig.plasmaWave, ...(parsed.plasmaWave || {}) },
                    glowCursor: { ...defaultCreativeConfig.glowCursor, ...(parsed.glowCursor || {}) },
                    vaporType: { ...defaultCreativeConfig.vaporType, ...(parsed.vaporType || {}) },
                    heroGrid: { ...defaultCreativeConfig.heroGrid, ...(parsed.heroGrid || {}) },
                    techText: { ...defaultCreativeConfig.techText, ...(parsed.techText || {}) },
                    darkVeil: { ...defaultCreativeConfig.darkVeil, ...(parsed.darkVeil || {}) },
                };
            }
        } catch {
            // fallback to defaults
        }
        return defaultCreativeConfig;
    });

    const [isDirty, setIsDirty] = useState(false);

    const updateModule = <K extends keyof CreativeState>(module: K, patch: Partial<CreativeState[K]>) => {
        setConfig((prev) => {
            const next = {
                ...prev,
                [module]: {
                    ...prev[module],
                    ...patch,
                },
            };
            setIsDirty(true);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {
                // ignore
            }
            return next;
        });
    };

    const resetModule = (module: keyof CreativeState) => {
        setConfig((prev) => {
            const next = {
                ...prev,
                [module]: defaultCreativeConfig[module],
            };
            setIsDirty(true);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            } catch {
                // ignore
            }
            return next;
        });
    };

    const resetAll = () => {
        setConfig(defaultCreativeConfig);
        setIsDirty(false);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // ignore
        }
    };

    const saveConfig = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
            setIsDirty(false);
        } catch {
            // ignore
        }
    };

    return (
        <CreativeContext.Provider
            value={{
                config,
                updateModule,
                resetModule,
                resetAll,
                saveConfig,
                isDirty,
            }}
        >
            {children}
        </CreativeContext.Provider>
    );
}

export function useCreative() {
    const context = useContext(CreativeContext);
    if (!context) {
        return {
            config: defaultCreativeConfig,
            updateModule: () => {},
            resetModule: () => {},
            resetAll: () => {},
            saveConfig: () => {},
            isDirty: false,
        };
    }
    return context;
}
