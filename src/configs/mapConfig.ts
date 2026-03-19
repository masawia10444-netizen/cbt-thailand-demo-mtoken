export const MAP_CONFIG = {
    VERSION: "4.15",
    KEY: "GOxQQtdmC5KMtuUxe(KnbpBxyLXlWIRuJU1e(Wz0nfHiBIeRipI)oKCFHvA)4d9asslulelApKSbw8i(CuGkqb0=====2",
    GET_PERMISSION_URL: "https://api.nostramap.com/Service/V2/Map/GetPermission",
    SERVER_URL: [
        "https://basemap-l.nostramap.com/arcgis/rest/services", //NOSTRAWEBSERVER_LO
        "https://basemap-e.nostramap.com/arcgis/rest/services", //NOSTRAWEBSERVER_EN
    ],
    EXPIRES: 1000 * 60 * 12,
    MAP_LAYER_URL: {
        BASEMAP_TILE_LO: "https://basemap-l.nostramap.com/arcgis/rest/services/StreetMapHD/MapServer",
        BASEMAP_TILE_EN: "https://basemap-e.nostramap.com/arcgis/rest/services/StreetMapHDEn/MapServer",
    }
}
