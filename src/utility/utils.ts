import { Animation, createAnimation } from "@ionic/vue";

/**
 * Different loading states
 */
export enum LoadingStates {
    /**
     * Nothing loading/loading process done
     */
    Done,

    /**
     * Currently something is loaded
     */
    Loading,

    /**
     * Something went wrong when loading something
     */
    Error,
}

/**
 * Create a new appear-animation
 * @param element The element that is getting animated
 * @param delay the delay after which the animation should start
 * @returns a new animation object
 */
export function appearAnimation(element: Element, delay: number): Animation {
    return createAnimation()
        .addElement(element)
        .duration(250)
        .delay(delay)
        .easing("ease-in-out")
        .fromTo("transform", "translateY(-20px)", "translateY(0px)")
        .fromTo("opacity", "0", "100%");
}

/**
 * Turn the dark mode on or off
 * @param turnOn Wether dark mode should turned on(true) or off(false)
 */
export function toggleDarkMode(turnOn: any) {
    document.body.toggleAttribute("dark", turnOn);
}
