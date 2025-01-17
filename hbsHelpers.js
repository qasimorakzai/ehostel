const moment = require('moment');

module.exports = {
    // Helper to check if two values are equal
    eq: function (a, b) {
        return a == b;
    },

    // Custom helper for ifEquals logic
    ifEquals: function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    },

    // Format date using moment.js
    formatDate: function (date, format = 'YYYY-MM-DD') {
        if (!date) return ''; // Handle empty or null dates
        
        // Ensure format is a string
        if (typeof format !== 'string') {
            format = 'YYYY-MM-DD'; // Default format
        }
        
        // Return formatted date
        return moment(date).format(format);
    },

    // Add two numbers
    add: function (a, b) {
        return a + b;
    },

    // Calculate total booking cost (sum of security and monthly rent)
    calculateTotalBookingCost: function (bookings) {
        let total = 0;
        for (let i = 0; i < bookings.length; i++) {
            total += bookings[i].security + bookings[i].monthlyRent;
        }
        return total;
    },

    // Calculate total service cost
    calculateTotalServiceCost: function (services) {
        let total = 0;
        for (let i = 0; i < services.length; i++) {
            total += services[i].servicePrice;
        }
        return total;
    },

    // Custom helper for checking if an element is in an array
    ifInArray: function (element, array, options) {
        return (array.indexOf(element) > -1) ? options.fn(this) : options.inverse(this);
    },

    // Helper to check if a value is greater than a given number
    isGreaterThan: function (a, b, options) {
        return (a > b) ? options.fn(this) : options.inverse(this);
    },

    // Helper to calculate percentage
    calculatePercentage: function (part, total) {
        if (total === 0) return 0;
        return ((part / total) * 100).toFixed(2); // returns a percentage with 2 decimal places
    },

    // Format currency with optional currency symbol
    formatCurrency: function (value, symbol = '₹') {
        return `${symbol}${parseFloat(value).toFixed(2)}`; // formats the value as a currency with 2 decimal places
    }
};
