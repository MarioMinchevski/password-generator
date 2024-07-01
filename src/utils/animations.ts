declare const gsap: any

const timelineOne = gsap.timeline({ defaults: { duration: 1.5, ease: "power2.out" } })

export const initialAnimation = () => {
    timelineOne
        .from('.password-generator__controls', { y: "-350%", ease: "power2.out", stagger: 0.5 })
        .from('.password-generator__box', { duration: 1, y: "-425%" }, "-=0.5")
        .from('.main__title', { duration: 1, y: "-830%" }, "-=0.5")
}

export const typewriterEffect = (el: HTMLElement, text: string, i = 0) => {
    if (i >= text.length) {
        return
    }

    el.innerHTML = text.substring(0, i + 1)

    setTimeout(() => typewriterEffect(el, text, i + 1), 100)
}

