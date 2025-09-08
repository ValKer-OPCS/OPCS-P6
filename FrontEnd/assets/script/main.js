import { galleryInit } from "./modules/gallery.js";
import { smoothScrollOnLoad } from "./modules/utils.js";



/**
 * Initializes the application by fetching and rendering works and filters.
 * Calls getWorksInit to display works in the gallery and getFiltersInit to set up filter buttons.
 *
 * @async
 * @function init
 * @returns {Promise<void>} Resolves when initialization is complete.
 */
async function init() {
    galleryInit()
    smoothScrollOnLoad()
    
}


init()

