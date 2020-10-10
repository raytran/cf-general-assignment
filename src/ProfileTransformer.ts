/**
 * An HTML Element transformer to write profile information
 * div -> removes display:none
 * img -> sets image src
 * h1 -> sets inner content to name
 * title -> set to name
 */
export class ProfileTransformer implements ElementHandlerOptionals{
    private readonly name: string
    private readonly imgUrl: string

    constructor(name: string, imgUrl: string) {
        this.name = name
        this.imgUrl = imgUrl
    }

    element(element: Element) {
        if (element.tagName == 'div') {
            // Remove display:none from style
            let elementStyle = element.getAttribute('style')
            if (elementStyle) {
                element.setAttribute('style', elementStyle.replace('display: none', ''))
            }
        } else if (element.tagName == 'img') {
            element.setAttribute('src', this.imgUrl)
        } else if (element.tagName == 'h1') {
            element.setInnerContent(this.name)
        } else if (element.tagName == 'title'){
            element.setInnerContent(this.name)
        }
    }
}