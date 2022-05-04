// 'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var couponSchema = Schema( {
    company: String,
    coupon: String,
    discount: String,
    expiration: String,
} );

module.exports = mongoose.model( 'Coupon', couponSchema );