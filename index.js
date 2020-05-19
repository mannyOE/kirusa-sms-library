const Request = require('request-promise')
const Phone_Number = require('awesome-phonenumber')
class Kirusa {
  constructor(
    kirusa_api_key,
    kirusa_account_id,
    kirusa_sender_number,
    country_phone_code,
    mask = 'Nester'
  ) {
    if (!kirusa_api_key) {
      throw Error('The API key is required')
    }
    if (!kirusa_account_id) {
      throw Error('The account id is required')
    }
    if (!kirusa_sender_number) {
      throw Error('The sender number is required')
    }
    this.API_KEY = kirusa_api_key
    this.ACCOUNT_ID = kirusa_account_id
    this.NUMBER = kirusa_sender_number
    this.PHONE_CODE = country_phone_code
    this.mask = mask
  }
}

Kirusa.prototype.format_numbers = function (phone_numbers = []) {
  if (typeof phone_numbers === 'string') {
    phone_numbers = [phone_numbers]
  }
  if (!Array.isArray(phone_numbers)) {
    throw Error('Unknow type provided')
  }
  var valid = [],
    invalid = []
  for (let item of phone_numbers) {
    let pn = new Phone_Number(item)
    if (pn.isValid()) {
      valid.push(pn.getNumber('e164'))
    } else {
      invalid.push(item)
    }
  }
  return { valid, invalid }
}

Kirusa.prototype.send_single = async function (message, phone_number) {
  if (!message || typeof message !== 'string') {
    throw Error('Message is required and must be a string')
  }
  if (!phone_number || typeof phone_number !== 'string') {
    throw Error('The phone number is required and must be a string')
  }
  var format = this.format_numbers(phone_number)
  if (format.valid.length === 0) {
    throw Error('Invalid phone number provided')
  }
  try {
    var options = {
      uri: `https://konnect.kirusa.com/api/v1/Accounts/${this.ACCOUNT_ID}/Messages`,
      body: {
        id: 'A10579090909090',
        to: format.valid,
        body: message,
        sender_mask: this.mask,
        from: this.NUMBER,
      },
      headers: {
        Authorization: this.API_KEY,
        'Content-Type': 'application/json',
      },
      json: true, // Automatically parses the JSON string in the response
    }

    var response = await Request.post(options)
    return response
  } catch (error) {
    throw Error(error)
  }
}

Kirusa.prototype.send_multiple = function (message, phone_numbers) {
  if (!message || typeof message !== 'string') {
    throw Error('Message is required and must be a string')
  }
  if (!phone_numbers || !Array.isArray(phone_numbers)) {
    throw Error('The phone number list is required and must be an array')
  }
  var format = this.format_numbers(phone_number)
  if (format.valid.length === 0) {
    throw Error('Invalid phone numbers provided')
  }
  try {
     var options = {
          uri: `https://konnect.kirusa.com/api/v1/Accounts/${this.ACCOUNT_ID}/Messages`,
          body: {
            to: format.valid,
            body: message,
            sender_mask: this.mask,
            from: this.NUMBER,
            id: this.ACCOUNT_ID,
          },
          headers: {
            Authorization: this.API_KEY,
            'Content-Type': 'application/json',
          },
          json: true, // Automatically parses the JSON string in the response
        }
      
           var response = await Request.post(options)
           return {
                response: response.data,
                invalid_phone_numbers: format.invalid,
              }
  } catch (error) {
       throw Error(err)
       
  }
   
}

module.exports = Kirusa;