<h1 align="center">Welcome to Fahid utils-collection 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/utils-collection" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/utils-collection.svg">
  </a>
  <a href="https://github.com/fahid-mahmood/utils-collection#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/fahid-mahmood/utils-collection/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/fahid-mahmood/utils-collection/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/fahid-mahmood/utils-collection" />
  </a>
</p>

> Introducing 'utils-collection', a comprehensive utility package to enhance your development experience. This package includes a collection of functions and utilities that have been tested and refined over the years through various personal projects. The package includes a variety of utility functions, such as cryptographic, debugging, location, number, SQL, string and time utilities, designed to streamline your development process. Whether you're building a new project or looking to optimize an existing one, 'utils-collection' is a valuable tool that will save you time and effort. Share with the community and be more productive.

### 🏠 [Homepage](https://github.com/fahid-mahmood/utils-collection#readme)

## Install

```sh
npm install utils-collection
```

## Usage

```sh
const { isSet } = require("utils-collection");
```

## Utils

<details open>
<summary><b>common_utils.js</b> (<i>Click to expand</i>)</summary>

### [.isEmpty(str)](utils/common_utils.js#L17)
Checks if a given variable is empty. Empty values include {} , [], "", null, undefined, " ", "0000-00-00 00:00:00"

**Params**

* `str` **{string | object | array | number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is empty, false otherwise. 

**Examples**
```js
isEmpty({}) // => true
isEmpty(["item1", "item2"]) // => false
isEmpty(" ") // => true
```

### [.isNotEmpty(str)](utils/common_utils.js#L37)
Checks if a given variable is not empty. Empty values include {} , [], "", null, undefined, " ", "0000-00-00 00:00:00"

**Params**

* `str` **{string | object | number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is not empty, false otherwise. 

**Examples**
```js
isNotEmpty({}) // => false
isNotEmpty(["item1", "item2"]) // => true
isNotEmpty(" ") // => false
```


### [.isEmptyIncludingZero(str)](utils/common_utils.js#L53)
Checks if a given variable is empty or equals to zero.

**Params**

* `str` **{string | object | array | number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is empty or equals to zero, false otherwise.

**Examples**
```js
isEmptyIncludingZero({}) // => true
isEmptyIncludingZero(["item1", "item2"]) // => false
isEmptyIncludingZero(0) // => true
```


### [.isSet(variable)](utils/common_utils.js#L70)
Checks if a given variable is set (not undefined or null).

**Params**

* `variable` **{any}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is set, false otherwise.

**Examples**
```js
isSet(null) // => false
isSet("Hello") // => true
isSet(0) // => true
```


### [.isNotSet(variable)](utils/common_utils.js#L90)
Checks if a given variable is not set (undefined or null).

**Params**

* `variable` **{any}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is not set, false otherwise.

**Examples**
```js
isNotSet(null) // => true
isNotSet("Hello") // => false
isNotSet(0) // => false
```

### [.isJsonObj(obj)](utils/common_utils.js#L106)
Checks if a given variable is a json object.

**Params**

* `obj` **{object}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is a json object, false otherwise.

**Examples**
```js
isJsonObj({name: "John", age: 30, city: "New York"}) // => true
isJsonObj([1,2,3]) // => true
isJsonObj("Hello World") // => false
```

### [.isJsonStr(str)](utils/common_utils.js#L128)
Checks if a given string is a valid JSON string.

**Params**

* `str` **{string}**: The string to be checked.

**Returns**

* `{boolean}`: Returns true if the input string is a valid JSON string, false otherwise.

**Examples**
```js
isJsonStr('{"name": "John", "age": 30, "city": "New York"}') // => true
isJsonStr('Hello World') // => false
```

### [.formatErrorString(errorStr)](utils/common_utils.js#L152)
Formats an error string to be returned.

**Params**

* `errorStr` **{string | object | array}**: The error string to be formatted.

**Returns**

* `{string}`: Returns a formatted error string.

**Examples**
```js
formatErrorString(["Error 1", "Error 2"]) // => "["Error 1", "Error 2"]"
formatErrorString("Error") // => "Error"
formatErrorString(null) // => "Empty Error"
```
</details>

<details close>
<summary><b>location_utils.js</b> (<i>Click to expand</i>)</summary>

### [.isLatitude(num)](utils/location_utils.js#L15)

Checks if the given variable is a valid latitude, which is a number between -90 and 90

**Params**

* `num` **{number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is a valid latitude, false otherwise.

**Examples**
```js
isLatitude(91) // => false
isLatitude(-91) // => false
isLatitude(50) // => true
```

### [.isLongitude(num)](utils/location_utils.js#L29)

Checks if the given variable is a valid longitude, which is a number between -180 and 180

**Params**

* `num` **{number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is a valid longitude, false otherwise.

**Examples**
```js
isLongitude(181) // => false
isLongitude(-181) // => false
isLongitude(50) // => true
```

### [.bearingBetweenLocations(startCoord, destCoord)](utils/location_utils.js#L42)

Computes the bearing (direction) between two geographic coordinates.

**Params**

* `startCoord` **{object}**: An object containing the latitude and longitude of the start location.
* `destCoord` **{object}**: An object containing the latitude and longitude of the destination location.

**Returns**

* `{number}`: Returns the bearing between the two locations in degrees.

**Examples**
```js
bearingBetweenLocations(
  {latitude: 37.788022, longitude: -122.399797},
  {latitude: 38.788022, longitude: -123.399797}) 
// => 337.09
```
</details>

<details close>
<summary><b>crypto_utils.js</b> (<i>Click to expand</i>)</summary>

### [.encrypt(text)](utils/crypto_utils.js#L22)

Encrypts a given plain text using AES-256-CTR encryption algorithm and a sha256 hashed password.

**Params**

* `text` **{string}**: The plain text to be encrypted.

**Returns**

* `{string}`: Returns the encrypted text in hexadecimal format.

**Examples**
```js
encrypt("my secret text")
// => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
```

### [.decrypt(text)](utils/crypto_utils.js#L46)
Decrypts a given encrypted text using AES-256-CTR encryption algorithm and a sha256 hashed password.

**Params**
* `text` **{string}**: The text to be decrypted in hexadecimal format.

**Returns**
* `{string}`: The decrypted text in utf8 format.

**Examples**
```js
decrypt("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
// => "my secret text"
```

### [.encryptRequest(text)](utils/crypto_utils.js#L73)
Encrypts a given request text by adding a uuid and timestamp to the plain text before encrypting it.

**Params**

* `text` **{string}**: The request plain text to be encrypted.

**Returns**

* `{string}`: Returns the encrypted request text in hexadecimal format.

**Examples**
```js
encryptRequest("my secret request text")
// => "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
```

### [.decryptRequest(text, allowedTime)](utils/crypto_utils.js#L89)
Decrypts a given request text and verifies if the request is not older than allowed time.

**Params**

* `text` **{string}**: The encrypted request text in hexadecimal format.
* `allowedTime` **{number}**: The allowed time in seconds for the request to be valid. Default is 180 seconds.

**Returns**

* `{string}`: Returns the decrypted request plain text if the request is valid else an empty string.

**Examples**
```js
decryptRequest("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
// => "my secret request text"
```

### [.verifyAndDecodeToken(req, returnError)](utils/crypto_utils.js#L132)
Verifies the authenticity of a JWT token and decodes it if valid.

**Params**

* `req` **{object}**: The request object.
* `returnError` **{boolean}**: A boolean flag to indicate if the error should be returned. Default is false.

**Returns**

* `{object}`: Returns the decoded JWT token if the token is valid else an error object.

**Examples**
```js
verifyAndDecodeToken(req, true).then(decoded => {
    console.log(decoded); // decoded JWT payload
})
.catch(err => {
    console.log(err); // error message
});
```
</details>

<details close>
<summary><b>number_utils.js</b> (<i>Click to expand</i>)</summary>

### [.getRandomInt(min, max)](utils/number_utils.js#L21)
Generates a random integer within a given range.

**Params**

* ` min` **{number}**: The minimum value of the range.
* `max` **{number}**: The maximum value of the range.

**Returns**

* `{number}`: Returns a random integer within the specified range.

**Examples**
```js
getRandomInt(5, 10) // => 7
```
### [.validateAndFormatInternationalNumber(msisdn)](utils/number_utils.js#L38)
Validates and formats an international phone number.

**Params**
* `msisdn` **{string}**: The phone number to be validated and formatted.

**Returns**

* `{string}`: Returns the formatted phone number in E.164 format, or null if the input is invalid.

**Examples**
```js
validateAndFormatInternationalNumber("+1234567890") // => "+1234567890"
validateAndFormatInternationalNumber("1234567890") // => "+1234567890"
```
### [.cleanCallNo(msisdn)](utils/number_utils.js#L65)
Cleans a phone number by removing white spaces and leading zeroes.

**Params**
* `msisdn` **{string}**: The phone number to be cleaned.

**Returns**

* `{string}`: Returns the cleaned phone number.

**Examples**
```js
cleanCallNo("+123 456 7890") // => "1234567890"
cleanCallNo("001234567890") // => "1234567890"
```
### [.roundTo(value, decimal)](utils/number_utils.js#L89)
Rounds a floating point number to a specified number of decimal places.

**Params**
* `value` **{number | string}**: value The number to be rounded.
* `decimal` **{number}**: The number of decimal places to round to. Default is 2.

**Returns**

* `{number}`: Returns the rounded number.

**Examples**
```js
roundTo(274.1212321) // => 274.12
roundTo(274) // => 274
```
### [.isNumeric(num)](utils/number_utils.js#L109)
Checks if a given variable is a numeric value.

**Params**

* `num` **{number}**:  The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is numeric, false otherwise.

**Examples**
```js
isNumeric("123") // => true
isNumeric("abc") // => false
```
### [.getDiscountedPrice(amount, discountPercentage, doRoundOff)](utils/number_utils.js#L125)
Calculates the discounted price of an amount based on a given discount percentage.

**Params**
* `amount` **{number}**: The original price.
* `discountPercentage` **{number}**: The discount percentage as a decimal.
* `doRoundOff` **{{boolean}**: If true, rounds off the discounted price to the nearest whole number. Default is false.

**Returns**

* `{number}`: Returns the discounted price.

**Examples**
```js
getDiscountedPrice(100, 5) // => 95
```
### [.getChargingPrice(amount, chargingFee, doRoundOff)](utils/number_utils.js#L143)
Calculates the price after charging a fee on an amount based on a given fee percentage.

**Params**

* `amount` **{number}**: The original price.
* `chargingFee` **{number}**: The charging fee percentage as a decimal.
* `doRoundOff` **{boolean}**: If true, rounds off the charging price to the nearest whole number. Default is false.

**Returns**

* `{number}`: Returns the price after charging a fee.

**Examples**
```js
getChargingPrice(100, 5) // => 105
```
### [.parseNumber(num)](utils/number_utils.js#L160)
Parses a given variable as a number.

**Params**

* `num` **{number | string}**:  The variable to be parsed as a number.

**Returns**

* `{number}`: Returns the parsed number. If the input is not a number, returns 0.

**Examples**
```js
parseNumber("123") // => 123
parseNumber("abc") // => 0
```
### [.isPositiveInteger(n)](utils/number_utils.js#L175)
Checks if a given variable is a positive integer.

**Params**

* `n` **{number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is a positive integer, false otherwise.

**Examples**
```js
isPositiveInteger(5) // => true
isPositiveInteger(-5) // => false
```

### [.validateCorrectFormat(msisdn, format_name, isSimNo)](utils/number_utils.js#L199)
Formats a given phone number to a specified format and returns the formatted number.

**Params**

* `msisdn` **{string}**: The phone number to be formatted.
* `format_name` **{string}**: The format to return the phone number in. Options are RETURN_WITH_923, RETURN_WITH_3XX, RETURN_WITH_03X. Default is RETURN_WITH_03X.
* `isSimNo` **{boolean}**: If true, only validates mobile phone numbers (not landline numbers). Default is false.

**Returns**

* `{string}`: Returns the formatted phone number.

**Examples**
```js
validateCorrectFormat("+923317767454", RETURN_WITH_923) // => "03317767454"
validateCorrectFormat("+a92923317767454", RETURN_WITH_923) // => ""
validateCorrectFormat("+337767454", RETURN_WITH_923) // => ""
validateCorrectFormat("92923317767454", RETURN_WITH_923) // => "03317767454"
validateCorrectFormat("92303777 4715", RETURN_WITH_923) // => "03037774715"
```

### [.getOperatorName(msisdn)](utils/number_utils.js#L242)
Returns the name of the operator for the given phone number.

**Params**

* `msisdn` **{string}**: The phone number to get the operator name for.

**Returns**

* `{string}`: Returns the name of the operator.

**Examples**
```js
getOperatorName("923317767454") // => "jazz"
```
</details>

<details close>
<summary><b>sql_utils.js</b> (<i>Click to expand</i>)</summary>

### [.sqlMatchPattern(str, matchOnlyOne)](utils/sql_utils.js#L18)
This function takes a string as input and returns a string with words separated by + or empty string.
The returned string is used to match all words no matter their position in the input string.

**Params**

* `str` **{string}**: The input string to be processed.
* `matchOnlyOne` **{boolean}**: A flag to control whether to add + before each word or not

**Returns**

* `{string}`: Returns processed string or empty string if input is empty

**Examples**
```js
sqlMatchPattern("Ichhra Lahore Pakistan") // => '+Ichhra* +Lahore* +Pakistan*'
sqlMatchPattern("Ichhra Lahore Pakistan", true) // => 'Ichhra* Lahore*Pakistan*'
```


### [.sqlLocatePattern(str, columnNames)](utils/sql_utils.js#L45)
This function takes a string as input and returns a string with words separated by LOCATE('word', columnNames) or empty string.
The returned string is used to match all words no matter their position in the input string.

**Params**

* `str` **{string}**: The input string to be processed.
* `columnNames` **{string[]}**: An array of column names used to match words in

**Returns**

* `{string}`: Returns processed string or empty string if input is empty

**Examples**
```js
sqlLocatePattern("chowk lahore", ["address", "keywords"]) 
// => "(LOCATE('chowk', CONCAT(address," ",keywords)) AND LOCATE('lahore', CONCAT(address," ",keywords)))"
```
</details>

<details close>
<summary><b>string_utils.js</b> (<i>Click to expand</i>)</summary>

### [.pad(num, totalLength)](utils/string_utils.js#L20)
Pads a number with leading zeros to a given total length.

**Params**

* `num` **{number}**: The number to be padded.
* `totalLength` **{number}**: The desired total length of the padded number. Default is 2.

**Returns**

* `{string}`: Returns the padded number as a string.

**Examples**
```js
pad(3, 4) // => "0003"
pad(123, 2) // => "123"
pad(-5, 3) // => "-005"
```

### [.prefix(date = "")](utils/string_utils.js#L35)
Adds ordinal suffixes to a given date.

**Params**

* `date` **{string}**: The date to add ordinal suffixes to.

**Returns**

* `{string}`: Returns the date with ordinal suffixes added.

**Examples**
```js
prefix(1) // => "1st"
prefix(22) // => "22nd"
```


### [.sanitizeString(str)](utils/string_utils.js#L62)
 Sanitizes a given string by removing any non-alphanumeric characters and leading/trailing whitespaces.

**Params**

* `str` **{string}**: The string to be sanitized.

**Returns**

* `{string}`: Returns the sanitized string.

**Examples**
```js
sanitizeString("!Hello, World?@") // => "Hello, World"
sanitizeString(" Test ") // => "Test"
sanitizeString("1234567890") // => "1234567890"
```
### [.stringToCleanHtml(str)](utils/string_utils.js#L79)
Converts a given string to clean HTML by removing newline characters and replacing all double quotes with single quotes.

**Params**

* `str` **{string}**: The string to be converted to clean HTML.

**Returns**

* `{string}`: Returns the clean HTML string.

**Examples**
```js
stringToCleanHtml("<p>\nHello, World!\n</p>") // => "<p>Hello, World!</p>"
stringToCleanHtml(`<a href="example.com">Link</a>`) // => "<a href='example.com'>Link</a>"
stringToCleanHtml("<h1>This is a heading</h1>") // => "<h1>This is a heading</h1>"
```


### [.appendFakeUuid(id)](utils/string_utils.js#L98)
Appends a fake UUID to a given id.

**Params**

* `id` **{string}**: The id to be appended with a fake UUID.

**Returns**

* `{string}`: Returns the id with a fake UUID appended.

**Examples**
```js
appendFakeUuid("abc123") // => "11111111-2222-3333-4444-abc123"
appendFakeUuid("def456") // => "11111111-2222-3333-4444-def456"
appendFakeUuid("ghi789") // => "11111111-2222-3333-4444-ghi789"
```


### [.parseFakeUuid(id, appType)](utils/string_utils.js#L115)
Parses a given id to remove the fake UUID and returns the original id.

**Params**

* `id` **{string}**: The id to be parsed.
* `appType` **{string}**: The type of app the id belongs to.

**Returns**

* `{string}`: Returns the original id after removing the fake UUID.

**Examples**
```js
parseFakeUuid("11111111-2222-3333-4444-abc123", "employee_app") // => "abc123"
parseFakeUuid("11111111-2222-3333-4444-def456", "employee_app") // => "def456"
parseFakeUuid("11111111-2222-3333-4444-ghi789", "employee_app") // => "ghi789"
```


### [.trimAllFieldsInObjectAndChildren(obj)](utils/string_utils.js#L139)
Trims all fields in an object and its children.

**Params**

* `obj` **{object}**: The object to be trimmed.

**Returns**

* `{object}`: Returns the object with all fields trimmed.

**Examples**
```js
var obj = {
field1: " value1 ",
field2: " value2 ",
field3: " value3 "
}
trimAllFieldsInObjectAndChildren(obj) // => {field1: "value1", field2: "value2", field3: "value3"}
```


### [.replaceAll(str, mapObj)](utils/string_utils.js#L160)
Replaces all occurrences of key strings from a given map object in a given string with their corresponding values.

**Params**

* `str` **{string}**: The string to perform the replacements on.
* `mapObj` **{object}**: The map object containing the key strings and their corresponding values.

**Returns**

* `{string}`: Returns the string with all replacements made.

**Examples**
```js
var str = "I have a cat, a dog, and a goat.";
var mapObj = {
cat:"dog",
dog:"goat",
goat:"cat"
};
replaceAll(str, mapObj) // => "I have a dog, a goat, and a cat."
```

### [.beautifyEnum(str)](utils/string_utils.js#L184)
Beautifies a given enum string by replacing underscores and dashes with spaces and capitalizing the first letter of each word.

**Params**

* `str` **{string}**: The enum string to be beautified.

**Returns**

* `{string}`: Returns the beautified enum string.

**Examples**
```js
beautifyEnum("beautiful_enum") // => "Beautiful Enum"
beautifyEnum("BEAUTIFUL_ENUM") // => "Beautiful Enum"
beautifyEnum("beautiful-enum") // => "Beautiful Enum"
```


### [.escapeRegex(string)](utils/string_utils.js#L202)
Replaces special characters in a string with their escaped versions.

**Params**

* `string` **{string}**: The string to be modified.

**Returns**

* `{string}`: Returns the modified string.

**Examples**
```js
escapeRegex("Hello, world!") // => "Hello\, world\!"
escapeRegex("$100") // => "\$100"
escapeRegex("[abc]") // => "\[abc\]"
```

### [.getUniqueSerialNo()](utils/string_utils.js#L215)
Generates a unique serial number based on the current time and a random number.

**Returns**

* `{string}`: Returns the unique serial number in the format "current time in milliseconds.random number".

**Examples**
```js
getUniqueSerialNo() // => "1609336966111.1234"
```


### [.pluralize(count, noun, suffix)](utils/string_utils.js#L233)
Pluralizes a noun based on a given count.

**Params**

* `count` **{number}**: The number to base the pluralization on.
* `noun` **{string}**: The noun to be pluralized.
* `suffix="s"` **{string}**: The suffix to be added for pluralization.

**Returns**

* `{string}`: Returns the pluralized noun in the format "count noun[suffix]".

**Examples**
```js
pluralize(1, "dog") // => "1 dog"
pluralize(2, "dog") // => "2 dogs"
pluralize(3, "box", "es") // => "3 boxes"
```

### [.removeLastDotOrComma(str, removeWhiteSpaces)](utils/string_utils.js#L250)
Removes the last dot or comma from a string.

**Params**

* `str` **{string}**: The string to be modified.
* `removeWhiteSpaces=true` **{boolean}**: Flag indicating whether to remove all whitespaces from the string.

**Returns**

* `{string}`: Returns the modified string with the last dot or comma removed.

**Examples**
```js
removeLastDotOrComma("Hello, world.") // => "Hello, world"
removeLastDotOrComma("Hello, world,") // => "Hello, world"
removeLastDotOrComma("Hello, world .") // => "Hello, world"
```


### [.removeDuplicates(arr)](utils/string_utils.js#L274)
Removes duplicate items from an array.
This method is efficient and fast as it uses a single for loop and an object, rather than using nested loops or additional data structures like other methods.

**Params**

* `arr` **{array}**: The array to be modified.

**Returns**

* `{array}`: Returns the modified array with duplicate items removed.

**Examples**
```js
removeDuplicates([1, 2, 3, 2, 4, 1]) // => [1, 2, 3, 4]
removeDuplicates(["apple", "banana", "apple", "orange"]) // => ["apple", "banana", "orange"]
removeDuplicates([1, "1", 2, "2"]) // => [1, "1", 2, "2"]
```


### [.removeTrailingZeros(value)](utils/string_utils.js#L299)
Removes trailing zeroes from a number or string representation of a number.

**Params**

* `value` **{string | number}**: The number or string representation of a number to be modified.

**Returns**

* `{string}`: Returns the modified number or string representation of a number with trailing zeroes removed.

**Examples**
```js
removeTrailingZeros(12.300) // => "12.3"
removeTrailingZeros("100.000") // => "100"
removeTrailingZeros(6.0) // => "6"
```


### [.generatePassword(length)](utils/string_utils.js#L324)
Generates a random password with a specified length.

**Params**

* `length` **{number}**: The desired length of the password.

**Returns**

* `{string}`: Returns the generated password.

**Examples**
```js
generatePassword(8) // => "A1b2C3d4"
generatePassword(12) // => "aBcDeFgHiJkL"
generatePassword(16) // => "A1B2C3D4E5F6G7H8"
```


### [.generatePlusPostFix(length)](utils/string_utils.js#L341)
Generates a random string with a specified length, using a custom set of characters.

**Params**

* `length` **{number}**: The desired length of the generated string.

**Returns**

* `{string}`: Returns the generated string.

**Examples**
```js
generatePlusPostFix(8) // => "5FMPVX7R"
generateCustomString("abc123", 4) // => "1b2c"
generateCustomString("!@#$%^", 6) // => "%^@!#"
```

### [.generateCustomString(characters, length)](utils/string_utils.js#L346)
   

### [.sleep(ms)](utils/string_utils.js#L366)
Pauses the execution of the program for a specified amount of time in milliseconds.

**Params**

* `ms` **{number}**: The number of milliseconds to sleep.

**Returns**

* `{Promise}`: Returns a promise that resolves after the specified amount of time has passed.

**Examples**
```js
await sleep(1000);
console.log("I'm awake!"); // => "I'm awake!" (displays after 1 second)
```


### [.isIterable(obj)](utils/string_utils.js#L384)
Checks if a given variable is iterable.

**Params**

* `obj` **{string | object | array | number}**: The variable to be checked.

**Returns**

* `{boolean}`: Returns true if the input variable is iterable, false otherwise.

**Examples**
```js
isIterable([1, 2, 3]) // => true
isIterable("Hello, world!") // => true
isIterable({"name": "John Doe"}) // => false
```
</details>

<details close>
<summary><b>time_utils.js</b> (<i>Click to expand</i>)</summary

### [.getDifferenceInDays(startDate, endDate)](utils/time_utils.js#L17)
Calculates the difference in days between two given dates.

* `startDate` **{string}**: The start date in "YYYY-MM-DD" format
* `endDate` **{string}**: The end date in "YYYY-MM-DD" format

**Returns**

* `{number} The difference in days between the two given dates

**Examples**
```js
getDifferenceInDays("2020-01-01", "2020-01-31") // => 31
```


### [.getRange(startDate, endDate, type, format)](utils/time_utils.js#L37)
Generates a range of dates between two given dates.

* `startDate` **{string}**: The start date of the range in the format "YYYY-MM-DD".
* `endDate` **{string}**: The end date of the range in the format "YYYY-MM-DD".
* `type` **{string}**: The unit of time to be used for the range (e.g. "days", "months", "years").
* `format` **{string}**: The format of the generated dates (e.g. "YYYY-MM-DD").

**Returns**

* `{array}`: Returns an array of dates within the given range, with duplicates removed.

**Examples**
```js
getRange("2022-01-01", "2022-01-31", "days", "YYYY-MM-DD") // => ["2022-01-01", "2022-01-02", "2022-01-03", ..., "2022-01-31"]
getRange("2022-01-01", "2022-12-31", "months", "MMM YYYY") // => ["Jan 2022", "Feb 2022", "Mar 2022", ..., "Dec 2022"]
getRange("2022-01-01", "2025-01-01", "years", "YYYY") // => ["2022", "2023", "2024", "2025"]
```


### [.getCurrent12HourTimeStamp()](utils/time_utils.js#L55)
The current time stamp in hh:mm:ss AM/PM DD/MM/YYYY format.

**Returns**

* `{string}`: Current time stamp in hh:mm:ss AM/PM DD/MM/YYYY format

**Examples**
```js
getCurrent12HourTimeStamp() // => "01:50:53 PM 25/08/2020"
```


### [.getTimeStamp(datetime)](utils/time_utils.js#L67)
Returns the given date time in "YYYY-MM-DD HH:mm:ss" format.

* `datetime` **{string}**: The date time to be formatted.

**Returns**

* `{string}`: The given date time in "YYYY-MM-DD HH:mm:ss" format

**Examples**
```js
getTimeStamp("2020-08-25 13:52:36") // => "2020-08-25 13:52:36"
```


### [.getCurrentTimeStamp()](utils/time_utils.js#L78)
Returns the current time stamp in "YYYY-MM-DD HH:mm:ss" format.
 
**Returns**

* `{string}`: Current time stamp in "YYYY-MM-DD HH:mm:ss" format

**Examples**
```js
getCurrentTimeStamp() // => "2020-08-25 13:52:36"
```


### [.getCurrentTimeStampISO()](utils/time_utils.js#L89)
Returns the current time stamp in ISO Date format. It is used to save ISO Date in Mongo Db e.g ISODate("2020-09-25T17:42:41.000Z")

**Returns**

* `{Date}`: Current time stamp in ISO Date format

**Examples**
```js
getCurrentTimeStampISO() // => ISODate("2020-09-25T17:42:41.000Z")
```


### [.getCurrentTimeStampWithMs()](utils/time_utils.js#L102)
Returns the current timestamp with milliseconds.

**Returns**

* `{string}`: Returns the current timestamp in the format of "YYYY-MM-DDTHH:mm:ss.SSSZ"

**Examples**
```js
getCurrentTimeStampWithMs() // => "2020-08-18T15:25:06.250Z"
```

### [.utcToLocal(timestamp)](utils/time_utils.js#L118)
Converts the given UTC timestamp to the local time.

**Params**

* `timestamp` **{string}**: A UTC timestamp in the format of "YYYY-MM-DDTHH:mm:ss.SSSZ"

**Returns**

* `{string}`: Returns the local time in the format of "YYYY-MM-DD HH:mm:ss"

**Examples**
```js
utcToLocal("2020-08-18T15:25:06.250Z") // => "2020-08-18 20:25:06"
utcToLocal("2022-07-01T23:59:59.999Z") // => "2022-07-02 04:59:59"
utcToLocal("2021-12-31T00:00:00.000Z") // => "2022-01-01 05:00:00"
```


### [.getDaysInMonth(month, year)](utils/time_utils.js#L135)
Returns the number of days in a given month and year.

**Params**

* `month` **{number}**: The month for which the number of days is to be returned.
* `year` **{number}**: The year for which the number of days is to be returned.

**Returns**

* `{number}`: Returns the number of days in the given month and year.

**Examples**
```js
getDaysInMonth(2, 2020) // => 29
getDaysInMonth(4, 2022) // => 30
getDaysInMonth(1, 2021) // => 31
```


### [.getDayName(day, month, year)](utils/time_utils.js#L153)
Returns the name of the day for a given date.

**Params**

* `day` **{number}**: The day of the date.
* `month` **{number}**: The month of the date.
* `year` **{number}**: The year of the date.

**Returns**

* `{string}`: Returns the name of the day for the given date.

**Examples**
```js
getDayName(1, 1, 2022) // => "Sunday"
getDayName(15, 6, 2022) // => "Wednesday"
getDayName(31, 12, 2022) // => "Saturday"
```


### [.getTimeDifference(firstTimestamp, secondTimestamp)](utils/time_utils.js#L171)
Returns the time difference between two timestamps in the format of "HH:mm:ss"

**Params**

* `firstTimestamp` **{string}**: The first timestamp in the format of "YYYY-MM-DD HH:mm:ss"
* `secondTimestamp` **{string}**: The second timestamp in the format of "YYYY-YY-MM-DD HH:mm:ss"
 *

**Returns**

* `{string}`: Returns the time difference between the two timestamps in the format of "HH:mm:ss"

**Examples**
```js
getTimeDifference("2022-05-01 10:00:00", "2022-05-01 12:00:00") // => "02:00:00"
getTimeDifference("2022-05-01 12:00:00", "2022-05-01 10:00:00") // => "02:00:00"
getTimeDifference("2022-05-01 00:00:00", "2022-05-01 23:59:59") // => "23:59:59"
```


### [.formatStayedSince(momentFirstDate, momentSecondDate, minify)](utils/time_utils.js#L191)
Returns the time duration between two moments in a human-readable format.

@since 1.0.1
@category Utils
* `momentFirstDate` **{moment}**: The first moment object.
* `momentSecondDate` **{moment}**: The second moment object.
* `minify` **{boolean}**: If true, the output will be in a shortened format (e.g. "1y 2mo 3d 4h 5m 6s" instead of "1 years 2 months 3 days 4 hours 5 minutes 6 seconds").

**Returns**

* `{string}`: Returns the time duration between the two moments in a human-readable format.

**Examples**
```js
formatStayedSince(moment("2022-05-01"), moment("2022-06-01")) // => "1 month"
formatStayedSince(moment("2022-05-01"), moment("2022-05-01"), true) // => "0s"
formatStayedSince(moment("2022-05-01"), moment("2022-09-01"), true) // => "4mo"
formatStayedSince(moment("2022-12-01"), "2022-05-01", true) // => 1mo 19d 1h 3m 50s
```



### [.isMonthlyTableRotating()](utils/time_utils.js#L233)
Date 01->12:00 TO 12:05 is Table rotation time although table rotated in seconds but when call is going on from last month we need to check in previous table.
Checks if the current date and time is the monthly table rotation time.

**Returns**

* `{boolean}`: Returns true if the current date and time is the monthly table rotation time (1st day of the month, 00:00 to 00:05), false otherwise.

**Examples**
```js
isMonthlyTableRotating() // (1st day of the month, 00:00 to 00:05) => true
isMonthlyTableRotating() // any other time=> false
```


### [.parseDateTime(datetime)](utils/time_utils.js#L257)
Parses the given date and time into a moment object.

**Params**

* `datetime` **{string|number|moment}**: The date and time to be parsed.

**Returns**

* `{moment}`: Returns the parsed date and time as a moment object.

**Examples**
```js
parseDateTime("DEC.1630480520623") // => moment object of the date and time "1630480520623"
parseDateTime("1627762295.5722384") // => moment object of the date and time "1627762295.5722384"
parseDateTime("2021-05-11") // => moment object of the date and time "2021-05-11"
e.g when called from getMonthlyTable
DEC.1630480520623 To cdr_logs
1627762295.5722384 To cdr_logs_2021_08
nullnull To cdr_logs
2021-05-11 To cdr_logs_2021_05
```

### [.isOldMonthCdr(cdrId)](utils/time_utils.js#L290)
Checks if the given CDR ID belongs to an old month.

**Params**

* `cdrId` **{string}**: The CDR ID to be checked.

**Returns**

* `{boolean}`: Returns true if the given CDR ID belongs to an old month, false otherwise.

**Examples**
```js
isOldMonthCdr("DEC.1630480520623") // => true
isOldMonthCdr("1627762295.5722384") // => false
isOldMonthCdr("2021-05-11") // => true
```


### [.getMonthlyTable(table, date)](utils/time_utils.js#L311)
Returns the name of the monthly table for the given date.

**Params**

* `table` **{string}**: The base table name.
* `date` **{string|number|moment}**: The date for which the table name is to be returned.

**Returns**

* `{string}`: Returns the name of the monthly table for the given date.

**Examples**
```js
getMonthlyTable("cdr_logs", "DEC.1630480520623") // => "cdr_logs_2021_09"
getMonthlyTable("cdr_logs", "1627762295.5722384") // => "cdr_logs"
getMonthlyTable("cdr_logs", "2021-05-11") // => "cdr_logs_2021_05"
```
## Author

👤 **Fahid Mahmood**

* Github: [@fahid-mahmood](https://github.com/fahid-mahmood)
* LinkedIn: [@fahid-mahmood](https://linkedin.com/in/fahid-mahmood)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/fahid-mahmood/utils-collection/issues). You can also take a look at the [contributing guide](https://github.com/fahid-mahmood/utils-collection/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Fahid Mahmood](https://github.com/fahid-mahmood).<br />
This project is [ISC](https://github.com/fahid-mahmood/utils-collection/blob/master/LICENSE) licensed.
