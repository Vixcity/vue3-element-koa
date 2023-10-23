/*
 Navicat Premium Data Transfer

 Source Server         : vue3+elementplus+koa2
 Source Server Type    : MongoDB
 Source Server Version : 70002
 Source Host           : localhost:27017
 Source Schema         : manage

 Target Server Type    : MongoDB
 Target Server Version : 70002
 File Encoding         : 65001

 Date: 23/10/2023 16:40:07
*/


// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("65362ede481800001d0004c3"),
    userName: "admin",
    userPwd: "admin"
} ]);
