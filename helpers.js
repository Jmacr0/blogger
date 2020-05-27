const register = function (Handlebars) {
    const helpers = {
        toHtml: function (options) {
            const html = document.createElement('p');
            html.innerHTML = options.fn(this);
            return 'hello';
        },
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (const prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null); 