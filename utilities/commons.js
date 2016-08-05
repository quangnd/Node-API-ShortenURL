module.exports = {
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    buildUrl: function (protocol, host, urlNumber) {
        return protocol + '://' + host + '/' + urlNumber;
    },

    isUrlValid: function (userInput) {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null) {
            return false;
        }
        return true;
    }
};
