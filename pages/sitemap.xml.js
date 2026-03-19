import React from 'react'
import { fetchGet } from '../src/utilities/request'
import { apiConfig } from '../src/configs/webAPIConfig'

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_LINK

const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${`${EXTERNAL_DATA_URL}`}</loc>
            <changefreq>daily</changefreq>	
            <priority>1</priority>	
        </url>
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/reviewTravel/`}</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>	
        </url>
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/community/`}</loc>
            <changefreq>daily</changefreq>	
            <priority>0.8</priority>	
        </url>
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/attraction/`}</loc>
            <changefreq>daily</changefreq>	
            <priority>0.8</priority>	
        </url>
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/recommendedRoute/`}</loc>
            <changefreq>daily</changefreq>	
            <priority>0.8</priority>	
        </url>
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/festival/`}</loc>
            <changefreq>daily</changefreq>	
            <priority>0.8</priority>	
        </url>
        <url>
            <loc>${`${EXTERNAL_DATA_URL}/accommodation/`}</loc>
            <changefreq>daily</changefreq>	
            <priority>0.8</priority>	
        </url>

        ${posts
            .map((item) => {
                if (item.menu === 'reviewtravel') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/reviewTravel/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else if (item.menu === 'community') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/community/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else if (item.menu === 'attraction') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/attraction/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else if (item.menu === 'relattraction') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/relattraction/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else if (item.menu === 'trip') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/recommendedRoute/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else if (item.menu === 'festival') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/festival/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else if (item.menu === 'accommodation') {
                    return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/accommodation/content/${item.ID}`}</loc>
                        <lastmod>${`${item.updateDate}`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `
                } else {
                }
            })
            .join('')}
    </urlset>
    `

class Sitemap extends React.Component {
    static async getInitialProps({ res }) {
        const req = await fetchGet({ url: apiConfig.sitemap })

        res.setHeader('Content-Type', 'text/xml')
        res.write(createSitemap(req))
        res.end()
    }
}

export default Sitemap
