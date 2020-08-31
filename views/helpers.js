module.exports = {
    getErrorMsg (errors, prop) {
        try {
            return errors.mapped()[prop].msg;
        } catch (error) {
            return '';
        }
    }
};