import  {getWorksInit,getFiltersInit} from "./modules/gallery.js";

/**
 * Initializes the application by fetching and rendering works and filters.
 * Calls getWorksInit to display works in the gallery and getFiltersInit to set up filter buttons.
 *
 * @async
 * @function init
 * @returns {Promise<void>} Resolves when initialization is complete.
 */
async function init() {
    getWorksInit('works', '.gallery');
    getFiltersInit('categories', '.filter-btn-container')
}


init()