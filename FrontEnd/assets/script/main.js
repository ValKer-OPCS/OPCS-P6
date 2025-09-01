import  {getWorksInit} from "./modules/getWorks.js";
import  {getFiltersInit} from "./modules/getFilters.js";


/**
 * Initializes the application by fetching and displaying works.
 * @async
 * @function init
 * @returns {Promise<void>}
 */
async function init() {
    getWorksInit('works', '.gallery');
    getFiltersInit('categories', '.filter-btn-container')
}


init()