/**
 * An HTML Element Transformer to append links into an element
 */
interface LinkItem {
    name: string; url: string
}
interface Links extends Array<LinkItem>{}

export class LinksTransformer implements ElementHandlerOptionals{
    private readonly links: Links

    constructor(links: Links) {
        this.links = links
    }

    element(element: Element) {
        // An incoming element, such as `div`
        for (let item of this.links){
            element.append('<a href ="' + item.url + '">' + item.name + '</a>', {html:true})
        }
    }
}