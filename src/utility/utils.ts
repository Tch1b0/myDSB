import { Animation, createAnimation } from "@ionic/vue";

export enum LoadingStates {
    Done,
    Loading,
    Error,
}

export function appearAnimation(element: Element, delay: number): Animation {
    return createAnimation()
        .addElement(element)
        .duration(250)
        .delay(delay)
        .easing("ease-in-out")
        .fromTo("transform", "translateY(-20px)", "translateY(0px)")
        .fromTo("opacity", "0", "100%");
}
