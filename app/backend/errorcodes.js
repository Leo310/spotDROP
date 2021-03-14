'use strict';

// https://dev.mysql.com/doc/mysql-errors/8.0/en/server-error-reference.html all error codes

module.exports = {
    success: "Success",
    duplicateEntry: "Dublicate Entry",
    notFound: "Couldnt find matching entry",
    usernameInvalid: "Username is Invalid",
    usernameAlreadyExists: "Username already Exists",
    emailInvalid: "Email is invalid",
    emailAlreadyExists: "Email already Exists",
    invalidPassword: "Password is invalid",
    noSpotImage: "No spot with this id or image saved on server",
    titleInvalid: "Spot title is invalid",
    descriptionInvalid: "Spot description is invalid",
    categoryInvalid: "Spot category is invalid",
    imageInvalid: "Spot image can either be true or false",
    noImageSelected: "You didnt select an image",
    streetInvalid: "Spot street is invalid",
    housenumberInvalid: "Spot housenumber is invalid",
    zipInvalid: "Spot zip is invalid",
    cityInvalid: "Spot city is invalid",
    notLogedIn: "You are not loged in",
    notFound: "Not Found",
    notCreatorOfSpot: "You are not the creator of this spot",
    categoryNotExist: "This category doesnt exist",
    spotCountInvalid: "The requested count is invalid"
}