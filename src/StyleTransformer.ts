/**
 * An HTML Element transformer to write element style attributes
 */
export class StyleTransformer implements ElementHandlerOptionals{
    private readonly style: string
    constructor(style: string) {
        this.style = style
    }

    element(element: Element) {
        element.setAttribute('style', this.style)
    }
}
