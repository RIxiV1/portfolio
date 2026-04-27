'use client';

import { useRef, useId, useEffect, CSSProperties, useState } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls, useInView, useReducedMotion } from 'motion/react';
import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';

// Type definitions
interface ResponsiveImage {
    src: string;
    alt?: string;
    srcSet?: string;
}

interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowOverlayProps {
    type?: 'preset' | 'custom';
    presetIndex?: number;
    customImage?: ResponsiveImage;
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    title?: string;
}

function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) {
        return toLow;
    }
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
    const id = useId();
    const cleanId = id.replace(/:/g, "");
    const instanceId = `shadowoverlay-${cleanId}`;
    return instanceId;
};

export function EtheralShadow({
    sizing = 'fill',
    color,
    animation,
    noise,
    style,
    className,
    title = ""
}: ShadowOverlayProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1 });
    const shouldReduceMotion = useReducedMotion();
    
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const id = useInstanceId();
    const animationEnabled = animation && animation.scale > 0;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Pause animation when the tab is hidden — saves ~3-5% CPU on laptops.
    useEffect(() => {
        const onVisibility = () => {
            const handle = hueRotateAnimation.current;
            if (!handle) return;
            if (document.hidden) handle.pause();
            else handle.play();
        };
        document.addEventListener('visibilitychange', onVisibility);
        return () => document.removeEventListener('visibilitychange', onVisibility);
    }, []);

    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled && isInView && !shouldReduceMotion) {
            if (hueRotateAnimation.current) {
                hueRotateAnimation.current.stop();
            }
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration / 25,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 0,
                ease: "linear",
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute("values", String(value));
                    }
                }
            });

            return () => {
                if (hueRotateAnimation.current) {
                    hueRotateAnimation.current.stop();
                }
            };
        } else {
            if (hueRotateAnimation.current) {
                hueRotateAnimation.current.stop();
            }
        }
    }, [animationEnabled, animationDuration, hueRotateMotionValue, isInView, shouldReduceMotion]);

    // Dynamic color based on theme
    const resolvedColor = color || (mounted && theme === 'light' ? 'rgba(34, 211, 238, 0.2)' : 'rgba(5, 5, 20, 0.95)');

    return (
        <div
            ref={containerRef}
            className={cn("w-full h-full min-h-screen", className)}
            style={{
                overflow: "hidden",
                position: "relative",
                ...style
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: -displacementScale,
                    filter: animationEnabled ? `url(#${id}) blur(4px)` : "none",
                    willChange: animationEnabled && isInView && !shouldReduceMotion ? "filter, transform" : "auto",
                    transform: "translateZ(0)",
                }}
            >
                {animationEnabled && (
                    <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }}>
                        <defs>
                            <filter id={id} colorInterpolationFilters="sRGB">
                                <feTurbulence
                                    result="undulation"
                                    numOctaves="2"
                                    baseFrequency={`${mapRange(animation.scale, 0, 100, 0.0005, 0.0002)},${mapRange(animation.scale, 0, 100, 0.002, 0.001)}`}
                                    seed="0"
                                    type="turbulence"
                                />
                                <feColorMatrix
                                    ref={feColorMatrixRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="180"
                                />
                                <feColorMatrix
                                    in="dist"
                                    result="circulation"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={displacementScale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={displacementScale}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>
                )}
                <div
                    style={{
                        backgroundColor: resolvedColor,
                        maskImage: `url('/textures/mask.png')`,
                        maskSize: sizing === "stretch" ? "100% 100%" : "cover",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                        width: "100%",
                        height: "100%",
                        transition: "background-color 1s ease-in-out",
                        transform: "translateZ(0)",
                    }}
                />
            </div>

            {title && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        zIndex: 10
                    }}
                >
                    <h1 className="md:text-7xl text-6xl lg:text-9xl font-bold text-center text-foreground relative z-20 tracking-tighter">
                        {title}
                    </h1>
                </div>
            )}

            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url("/textures/noise.png")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: "repeat",
                        opacity: theme === 'light' ? noise.opacity / 4 : noise.opacity / 2,
                        pointerEvents: "none",
                        transition: "opacity 1s ease-in-out"
                    }}
                />
            )}
        </div>
    );
}
