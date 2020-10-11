/**
 * An HTML Element transformer to write social information
 * removes display:none and adds social links as children
 */
interface SocialLinkItem {
    // svg is svg element as a string
    url: string;
    svg: string
}

interface SocialLinks extends Array<SocialLinkItem> {
}

export class SocialTransformer implements ElementHandlerOptionals {
    private readonly links: SocialLinks

    constructor(links: SocialLinks) {
        this.links = links;
    }

    element(element: Element) {
        let elementStyle = element.getAttribute('style')
        if (elementStyle) {
            element.setAttribute('style', elementStyle.replace('display: none', ''))
        }
        for (let link of this.links) {
            element.append("<a href='" + link.url + "'>"
                + link.svg
                + "</a>", {'html': true})
        }
    }
}
