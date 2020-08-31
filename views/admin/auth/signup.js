const layout = require('../layout');
const { getErrorMsg } = require('../../helpers');

module.exports = ( { req, Error }) => {
    return layout( {content : `
        <div>
            Your id is: ${req.session.userId}
            <form method = "POST">
                <input name = "email" placeholder = "Email">
                ${getErrorMsg(Error, 'email')}
                <input name = "password" placeholder = "password">
                ${getErrorMsg(Error, 'password')}
                <input name = "confirmation" placeholder = "confirm password">
                ${getErrorMsg(Error, 'confirmation')}
                <button>Sign Up</button>
            </form>
        </div>
    `});
}