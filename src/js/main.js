require('../css/main.scss');

import rockPaperScissors from './module';
import domUtilities from './domUtilities';
// I created a separate class for dom interaction - separation of concerns
const utilities = new domUtilities();
//associate instance to window object to make it available to onclick events since webpack by default wrap in private scope
window.gameInstance = new rockPaperScissors(utilities);
