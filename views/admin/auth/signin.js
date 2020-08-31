const layout = require('../layout');
const { getErrorMsg } = require('../../helpers');

module.exports = ({Error}) => {
    return layout( {content : `
        <div>
            <form method = "POST">
                <input name = "email" placeholder = "Email">
                ${getErrorMsg(Error, 'email')}
                <input name = "password" placeholder = "password">
                ${getErrorMsg(Error, 'password')}
                <button>Sign Up</button>
            </form>
        </div>
    `});
}