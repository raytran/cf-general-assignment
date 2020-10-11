import {LinksTransformer} from "./LinksTransformer"
import {ProfileTransformer} from "./ProfileTransformer";
import {SocialTransformer} from "./SocialTransformer";
import {StyleTransformer} from "./StyleTransformer";
// @ts-ignore
import FacebookIcon from 'simple-icons/icons/facebook'
// @ts-ignore
import InstagramIcon from 'simple-icons/icons/instagram'

export async function handleRequest(request: Request): Promise<Response> {
    if (request.method == "POST") {
        return handlePOST(request)
    } else {
        return handleGET(request)
    }
}

async function handleGET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const {pathname, search, hash} = url
    const links = [
        {"name": "My Github", "url": "https://github.com/raytran"},
        {"name": "My Coolest Project", "url": "https://protochess.com/"},
        {"name": "My Linkedin", "url": "https://www.linkedin.com/in/raymond-tran-b1214319a/"},
        {
            "name": "My Resume",
            "url": "https://drive.google.com/file/d/1X71DEcPdhJVFTW4-8svZAlQeZ70iro1g/view?usp=sharing"
        }
    ]
    if (pathname == "/links") {
        const json = JSON.stringify(links, null, 2)
        return new Response(json, {
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        })
    } else {
        const socialLinks = [
            {'url': 'https://www.facebook.com/raymond.tran.3158/', 'svg': FacebookIcon.svg},
            {'url': 'https://www.instagram.com/rayt.ran/', 'svg': InstagramIcon.svg}
        ]
        const profileTransformer = new ProfileTransformer('Raymond Tran',
            "https://i.ibb.co/R0rLMjC/82362770-2553287828275507-6220719610916765696-o.jpg")
        const rewriter = new HTMLRewriter()
            .on("div#links", new LinksTransformer(links))
            .on('#profile', profileTransformer)
            .on('#avatar', profileTransformer)
            .on('#name', profileTransformer)
            .on("title", profileTransformer)
            .on('#social', new SocialTransformer(socialLinks))
            .on('body', new StyleTransformer('background-color: #E8ADAA'))
        const randPage = await fetch("https://static-links-page.signalnerve.workers.dev")
        return rewriter.transform(randPage)
    }
}

async function handlePOST(request: Request): Promise<Response> {
    return new Response('There is nothing for you here :(')
}