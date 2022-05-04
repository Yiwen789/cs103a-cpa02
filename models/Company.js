// 'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

var companySchema = Schema( {
    company: String,
    location: String,
    country: String,
});

module.exports = mongoose.model( 'Company', companySchema);